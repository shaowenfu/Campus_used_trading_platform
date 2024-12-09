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
      
      if(res.code === 1) {
        this.setData({
          userInfo: res.data
        })
      }
    } catch(e) {
      console.error('获取商家信息失败', e)
      wx.showToast({
        title: '获取商家信息失败',
        icon: 'none'
      })
    }
  },

  // 修改头像
  async changeAvatar() {
    try {
      const res = await wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sizeType: ['compressed'],
        sourceType: ['album', 'camera']
      })

      const tempFilePath = res.tempFiles[0].tempFilePath
      console.log('临时文件路径:', tempFilePath)
      
      if(isDev) {
        this.setData({
          'userInfo.avatar': tempFilePath
        })
        wx.showToast({ title: '修改成功' })
        return
      }

      try {
        // 使用文件系统管理器保存文件
        const fs = wx.getFileSystemManager()
        const saveRes = await new Promise((resolve, reject) => {
          fs.saveFile({
            tempFilePath: tempFilePath,
            success: (res) => resolve(res),
            fail: (err) => reject(err)
          })
        })
        
        console.log('保存结果:', saveRes)
        
        // 读取图片为base64
        const base64 = await new Promise((resolve, reject) => {
          fs.readFile({
            filePath: saveRes.savedFilePath,
            encoding: 'base64',
            success: (res) => resolve(res.data),
            fail: (err) => reject(err)
          })
        })
        
        // 构造可展示的图片路径
        const imageUrl = `data:image/png;base64,${base64}`

        // 更新头像
        const updateRes = await request({
          url: '/marketer/info/avatar',
          method: 'PUT',
          data: {
            avatar: saveRes.savedFilePath
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        })
        
        if(updateRes.code === 1) {
          this.setData({
            'userInfo.avatar': imageUrl,  // 使用base64预览
            'userInfo.avatarPath': saveRes.savedFilePath  // 存储永久路径
          })
          wx.showToast({ title: '修改成功' })
        } else {
          wx.showToast({
            title: updateRes.msg || '修改失败',
            icon: 'none'
          })
        }
      } catch(err) {
        console.error('保存头像失败:', err)
        wx.showToast({
          title: '保存头像失败',
          icon: 'none'
        })
      }
    } catch(e) {
      console.error('选择头像失败:', e)
      wx.showToast({
        title: '选择头像失败',
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
  async logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: async (res) => {
        if(res.confirm) {
          try {
            const res = await request({
              url: '/marketer/logout',
              method: 'POST'
            })
            
            if(res.code === 1) {
              // 清除本地存储
              wx.clearStorageSync()
              // 跳转到登录页
              wx.reLaunch({
                url: '/pages/login/login'
              })
            }
          } catch(e) {
            console.error('退出登录失败:', e)
            wx.showToast({
              title: '退出登录失败',
              icon: 'none'
            })
          }
        }
      }
    })
  }
})