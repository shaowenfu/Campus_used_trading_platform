import { isDev, mockData } from '../../../utils/config'
import { request } from '../../../utils/request'

Page({
  data: {
    userInfo: null
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

      const marketerId = wx.getStorageSync('userId')
      if(!marketerId) {
        throw new Error('未找到商家ID')
      }

      const res = await request({
        url: `/marketer/info/${marketerId}`,
        method: 'GET'
      })
      
      if(res.code === 1) {
        this.setData({
          userInfo: res.data
        })
      } else {
        throw new Error(res.msg || '获取商家信息失败')
      }
    } catch(e) {
      console.error('获取商家信息失败', e)
      wx.showToast({
        title: e.message || '获取商家信息失败',
        icon: 'none'
      })
    }
  }
}) 