Page({
  data: {
    addressList: []
  },

  onLoad() {
    this.loadAddressList();  // 页面加载时加载地址列表
  },

  onShow() {
    this.loadAddressList();  // 页面显示时自动刷新
  },

  // 加载地址数据
  loadAddressList() {
    wx.request({
      url: 'http://localhost:8081/user/addressBook/list',
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      success: (res) => {
        console.log("加载地址响应:", res);

        if (res.statusCode === 200 && res.data && Array.isArray(res.data.data)) {
          this.setData({
            addressList: res.data.data
          });
        } else {
          wx.showToast({
            title: '加载地址失败，请稍后重试',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('加载地址失败:', err);
        wx.showToast({
          title: '请求失败，请检查网络',
          icon: 'none'
        });
      }
    });
  },

  // 编辑地址（跳转到 address-edit 页面）
  editAddress(e) {
    const id = e.currentTarget.dataset.id;
    console.log("编辑地址ID:", id);

    wx.navigateTo({
      url: `/pages/address-edit/address-edit?id=${id}`
    });
  },

// 删除地址方法
deleteAddress(e) {
  console.log(e);
  const id = e.currentTarget.dataset.id;  // 获取地址ID
  // 提示用户确认删除操作
  wx.showModal({
    title: '确认删除',
    content: '确定要删除该地址吗？',
    success: (res) => {
      if (res.confirm) {
        // 用户点击确认，发送删除请求
        wx.request({
          url:`http://localhost:8081/user/addressBook?id=${id}`,
          method: 'DELETE',
          header: {
            'Authorization': wx.getStorageSync('token'),
            'Content-Type': 'application/json'
          },
          success: (res) => {
            console.log("删除地址响应:", res);

            if (res.statusCode === 200 && res.data.code === 1) {
              wx.showToast({
                title: '地址已删除',
                icon: 'success'
              });

              // 调用加载方法，刷新页面
              this.loadAddressList();
            } else {
              wx.showToast({
                title: '删除失败，请稍后重试',
                icon: 'none'
              });
            }
          },
          fail: (err) => {
            console.error('删除地址失败:', err);
            wx.showToast({
              title: '请求失败，请检查网络',
              icon: 'none'
            });
          }
        });
      }
    }
  });
},

 


  // 添加新地址
  addAddress() {
    wx.navigateTo({
      url: '/pages/address-edit/address-edit'  // 跳转到地址编辑页面
    });
  }
});
