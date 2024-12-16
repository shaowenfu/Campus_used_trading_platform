Page({
  data: {
    isEdit: false,  // 是否是编辑模式
    address: {
      id: null,  // 地址id
      consignee: '',
      sex: '',   
      phone: '',
      area: '',
      dormitoriesId: '', // 宿舍ID
      unitNumber: '',    // 单元号
      doorCode: '',      // 门牌号
      isDefault: 0       // 默认地址标识
    },
    genderOptions: ['男', '女']  // 性别选项
  },

  // 页面加载时初始化
  onLoad(options) {
    if (options.id) {
      this.setData({
        isEdit: true,
        address: { id: options.id }
      });
      this.loadAddressData(options.id); // 获取地址数据
    }
  },

  // 获取地址数据（编辑模式）
  loadAddressData(id) {
    wx.request({
      url: `http://localhost:8081/user/addressBook/${id}`,
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      success: (res) => {
        if (res.statusCode === 200 && res.data && res.data.data) {
          this.setData({
            address: res.data.data
          });
        } else {
          wx.showToast({
            title: '获取地址信息失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('获取地址失败:', err);
        wx.showToast({
          title: '请求失败，请检查网络',
          icon: 'none'
        });
      }
    });
  },

  // 性别选择处理
  onSexChange(e) {
    const selectedIndex = e.detail.value;
    const selectedSex = this.data.genderOptions[selectedIndex];
    this.setData({
      'address.sex': selectedSex
    });
  },

  // 默认地址切换
  onDefaultChange(e) {
    this.setData({
      'address.isDefault': e.detail.value ? 1 : 0
    });
  },

  // 提交表单
  submitForm(e) {
    const formData = e.detail.value;

    // 将表单数据映射为后端标准字段名
    const addressData = {
      id: this.data.isEdit ? this.data.address.id : undefined, // 只有编辑时传入id
      consignee: formData.consignee,      // 收货人姓名
      sex: this.data.address.sex,         // 性别
      phone: formData.phone,              // 电话
      area: formData.area,                // 所在园区
      dormitoriesId: formData.dormitoriesId, // 宿舍ID
      unitNumber: formData.unitNumber,    // 单元号
      doorCode: formData.doorCode,        // 门牌号
      isDefault: formData.isDefault ? 1 : 0 // 是否默认地址
    };

    console.log("提交的数据:", addressData);

    // 必填字段检查
    const requiredFields = ['consignee', 'sex', 'phone', 'area', 'dormitoriesId', 'unitNumber', 'doorCode'];
    const missingFields = requiredFields.filter(field => !addressData[field]);
    console.log(missingFields);
    if (missingFields.length > 0) {
      wx.showToast({
        title: `请填写完整信息：${missingFields.join(', ')}`,
        icon: 'none'
      });
      return;
    }

    // 确定请求方式和URL
    const requestUrl = 'http://localhost:8081/user/addressBook';
    const requestMethod = this.data.isEdit ? 'PUT' : 'POST';

    // 提交地址请求
    wx.request({
      url: requestUrl,
      method: requestMethod,
      header: {
        'Authorization': wx.getStorageSync('token'),
        'Content-Type': 'application/json'
      },
      data: addressData,
      success: (res) => {
        if (res.statusCode === 200 && res.data.code === 1) {
          wx.showToast({
            title: this.data.isEdit ? '地址更新成功' : '新地址已添加',
            icon: 'success'
          });
          wx.navigateBack({
            delta: 1,
            success: () => {
              const pages = getCurrentPages();
              const previousPage = pages[pages.length - 2];
              if (previousPage && previousPage.loadAddressList) {
                previousPage.loadAddressList();
              }
            }
          });
        } else {
          wx.showToast({
            title: '提交失败，请稍后重试',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('提交地址失败:', err);
        wx.showToast({
          title: '请求失败，请检查网络',
          icon: 'none'
        });
      }
    });
  }
});
