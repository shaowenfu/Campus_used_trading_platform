import { isDev } from '../../../utils/config'

Page({
  data: {
    formData: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    submitLoading: false
  },

  // 输入旧密码
  onOldPasswordInput(e) {
    this.setData({
      'formData.oldPassword': e.detail.value
    })
  },

  // 输入新密码
  onNewPasswordInput(e) {
    this.setData({
      'formData.newPassword': e.detail.value
    })
  },

  // 确认新密码
  onConfirmPasswordInput(e) {
    this.setData({
      'formData.confirmPassword': e.detail.value
    })
  },

  // 表单验证
  validateForm() {
    const { oldPassword, newPassword, confirmPassword } = this.data.formData
    if(!oldPassword) {
      wx.showToast({
        title: '请输入原密码',
        icon: 'none'
      })
      return false
    }
    if(!newPassword) {
      wx.showToast({
        title: '请输入新密码',
        icon: 'none'
      })
      return false
    }
    if(newPassword.length < 6) {
      wx.showToast({
        title: '新密码不能少于6位',
        icon: 'none'
      })
      return false
    }
    if(newPassword !== confirmPassword) {
      wx.showToast({
        title: '两次输入的密码不一致',
        icon: 'none'
      })
      return false
    }
    return true
  },

  // 提交表单
  async submitForm() {
    if(!this.validateForm()) return
    if(this.data.submitLoading) return
    
    this.setData({ submitLoading: true })
    
    try {
      if(isDev) {
        wx.showToast({ title: '修改成功' })
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
        return
      }

      const res = await wx.request({
        url: '/marketer/password',
        method: 'PUT',
        data: {
          oldPassword: this.data.formData.oldPassword,
          newPassword: this.data.formData.newPassword
        }
      })
      
      if(res.data.code === 0) {
        wx.showToast({ title: '修改成功' })
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    } catch(e) {
      wx.showToast({
        title: '修改失败',
        icon: 'none'
      })
    } finally {
      this.setData({ submitLoading: false })
    }
  }
}) 