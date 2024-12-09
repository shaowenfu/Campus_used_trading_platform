import { isDev } from '../../../utils/config'
import { request } from '../../../utils/request'

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

  // 修改密码
  async changePassword() {
    if(!this.validateForm()) return
    if(this.data.submitLoading) return
    
    this.setData({ submitLoading: true })
    
    try {
      const passwordEditDTO = {
        marketerId: wx.getStorageSync('userInfo').id,
        oldPassword: this.data.formData.oldPassword,
        newPassword: this.data.formData.newPassword
      }

      console.log('提交的修改密码数据:', passwordEditDTO)

      const res = await request({
        url: '/marketer/editPassword',
        method: 'PUT',
        data: passwordEditDTO,
        header: {
          'content-type': 'application/json'  // 使用JSON格式
        }
      })
      
      if(res.code === 1) {
        wx.showToast({ title: '修改成功' })
        setTimeout(() => {
          // 修改密码成功后退出登录
          wx.clearStorageSync()
          wx.reLaunch({
            url: '/pages/login/login'
          })
        }, 1500)
      }
    } catch(e) {
      console.error('修改密码失败:', e)
      wx.showToast({
        title: '修改失败',
        icon: 'none'
      })
    } finally {
      this.setData({ submitLoading: false })
    }
  }
}) 