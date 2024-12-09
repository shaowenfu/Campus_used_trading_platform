const app = getApp()

import { request } from '../../../utils/request'

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
  async submitForm() {
    if(!this.validateForm()) return
    
    try {
      const marketerDTO = {
        id: wx.getStorageSync('userInfo').id,
        username: this.data.formData.username,
        name: this.data.formData.name,
        phone: this.data.formData.phone,
        idNumber: this.data.formData.idNumber
      }

      console.log('提交的商家信息:', marketerDTO)

      const res = await request({
        url: '/marketer',
        method: 'PUT',
        data: marketerDTO,
        header: {
          'content-type': 'application/json'  // 使用JSON格式
        }
      })
      
      if(res.code === 1) {
        wx.showToast({ title: '修改成功' })
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      }
    } catch(e) {
      console.error('修改商家信息失败:', e)
      wx.showToast({
        title: '修改失败',
        icon: 'none'
      })
    }
  }
}) 