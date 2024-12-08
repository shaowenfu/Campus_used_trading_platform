// pages/profile/profile.js
import { isDev, mockData } from '../../../utils/config'
import { request } from '../../../utils/request'

Page({
  data: {
    userInfo: null,
    menuList: [
      {
        icon: '/images/icon-info.png',
        text: '基本信息',
        url: '/pages/profile_page/info/info'
      },
      {
        icon: '/images/icon-security.png',
        text: '账号安全',
        url: '/pages/profile_page/secu/secu'
      },
      {
        icon: '/images/icon-about.png',
        text: '关于我们',
        url: '/pages/profile_page/about/about'
      }
    ]
  },

  onShow() {
    this.getUserInfo()
  },

  // 获取商家信息
  async getUserInfo() {
    try {
      if(isDev) {
        this.setData({
          userInfo: mockData.profile
        })
        return
      }

      const res = await request({
        url: '/marketer/info',
        method: 'GET'
      })
      
      if(res.data.code === 0) {
        this.setData({
          userInfo: res.data.data
        })
      }
    } catch(e) {
      console.error('获取商家信息失败', e)
    }
  },

  // 修改头像
  async changeAvatar() {
    try {
      const res = await wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera']
      })

      const tempFilePath = res.tempFilePaths[0]
      
      if(isDev) {
        this.setData({
          'userInfo.avatar': tempFilePath
        })
        wx.showToast({ title: '修改成功' })
        return
      }

      const uploadRes = await wx.uploadFile({
        url: '/marketer/file/upload',
        filePath: tempFilePath,
        name: 'file'
      })

      const data = JSON.parse(uploadRes.data)
      if(data.code === 0) {
        // 更新头像
        const updateRes = await wx.request({
          url: '/marketer/info/avatar',
          method: 'PUT',
          data: {
            avatar: data.data.url
          }
        })

        if(updateRes.data.code === 0) {
          this.setData({
            'userInfo.avatar': data.data.url
          })
          wx.showToast({ title: '修改成功' })
        }
      }
    } catch(e) {
      wx.showToast({
        title: '修改失败',
        icon: 'none'
      })
    }
  },

  // 跳转到菜单页面
  goToMenu(e) {
    const url = e.currentTarget.dataset.url
    wx.navigateTo({ url })
  },

  // 退出登录
  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if(res.confirm) {
          // 清除本地存储
          wx.clearStorageSync()
          // 跳转到登录页
          wx.reLaunch({
            url: '/pages/login/login'
          })
        }
      }
    })
  }
})