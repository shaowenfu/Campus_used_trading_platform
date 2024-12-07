const app = getApp()

Page({
  data: {
    formData: {
      name: '',
      phone: '',
      address: '',
      description: ''
    },
    submitLoading: false
  },

  onLoad() {
    // 获取缓存中的用户信息
    const userInfo = wx.getStorageSync('userInfo') || {}
    if(userInfo) {
      const { name, phone, address, description } = userInfo
      this.setData({
        formData: { name, phone, address, description }
      })
    }
  },

  // 输入商家名称
  onNameInput(e) {
    this.setData({
      'formData.name': e.detail.value
    })
  },

  // 输入手机号
  onPhoneInput(e) {
    this.setData({
      'formData.phone': e.detail.value
    })
  },

  // 输入地址
  onAddressInput(e) {
    this.setData({
      'formData.address': e.detail.value
    })
  },

  // 输入描述
  onDescInput(e) {
    this.setData({
      'formData.description': e.detail.value
    })
  },

  // 表单验证
  validateForm() {
    const { name, phone } = this.data.formData
    if(!name.trim()) {
      wx.showToast({
        title: '请输入商家名称',
        icon: 'none'
      })
      return false
    }
    if(!phone.trim()) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return false
    }
    if(!/^1\d{10}$/.test(phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return false
    }
    return true
  },

  // 提交表单
  submitForm() {
    if(!this.validateForm()) return
    if(this.data.submitLoading) return
    
    this.setData({ submitLoading: true })
    
    wx.request({
      url: `${app.globalData.baseUrl}/marketer/info`,
      method: 'PUT',
      data: this.data.formData,
      success: (res) => {
        if(res.data.code === 0) {
          // 更新缓存
          const userInfo = wx.getStorageSync('userInfo') || {}
          wx.setStorageSync('userInfo', {
            ...userInfo,
            ...this.data.formData
          })
          
          wx.showToast({ title: '修改成功' })
          setTimeout(() => {
            wx.navigateBack()
          }, 1500)
        } else {
          wx.showToast({
            title: res.data.msg || '修改失败',
            icon: 'none'
          })
        }
      },
      fail: () => {
        wx.showToast({
          title: '修改失败',
          icon: 'none'
        })
      },
      complete: () => {
        this.setData({ submitLoading: false })
      }
    })
  }
}) 