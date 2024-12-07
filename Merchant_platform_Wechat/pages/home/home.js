import { isDev, mockData } from '../../utils/config'

Page({
  data: {
    businessData: {}, // 运营数据
    dishOverview: {}, // 商品总览
    orderOverview: {} // 订单总览
  },

  onLoad() {
    this.getBusinessData()
    this.getDishOverview()
    this.getOrderOverview()
  },

  // 获取运营数据
  async getBusinessData() {
    try {
      if(isDev) {
        this.setData({
          businessData: mockData.workspace.businessData
        })
        return
      }

      const res = await wx.request({
        url: '/marketer/workspace/businessData',
        method: 'GET'
      })
      
      if(res.data.code === 0) {
        this.setData({
          businessData: res.data.data
        })
      }
    } catch(e) {
      console.error('获取运营数据失败', e)
    }
  },

  // 获取商品总览
  async getDishOverview() {
    try {
      if(isDev) {
        this.setData({
          dishOverview: mockData.workspace.dishOverview
        })
        return
      }

      const res = await wx.request({
        url: '/marketer/workspace/overviewDishes',
        method: 'GET'
      })
      
      if(res.data.code === 0) {
        this.setData({
          dishOverview: res.data.data
        })
      }
    } catch(e) {
      console.error('获取商品总览失败', e)
    }
  },

  // 获取订单总览

  async getOrderOverview() {
    try {
      if(isDev) {
        this.setData({
          orderOverview: mockData.workspace.orderOverview
        })
        return
      }

      const res = await wx.request({
        url: '/marketer/workspace/overviewOrders', 
        method: 'GET'
      })
      
      if(res.data.code === 0) {
        this.setData({
          orderOverview: res.data.data
        })
      }
    } catch(e) {
      console.error('获取订单总览失败', e)
    }
  },

  // 跳转到订单列表
  goToOrders(e) {
    const status = e.currentTarget.dataset.status || ''
    wx.navigateTo({
      url: `/pages/order/list/list?status=${status}`
    })
  },

  // 使用统一的快捷入口处理函数
  onQuickEntryTap(e) {
    const type = e.currentTarget.dataset.type
    switch(type) {
      case 'order':
        wx.navigateTo({
          url: '/pages/order/list/list'
        })
        break
      case 'goods':
        wx.navigateTo({
          url: '/pages/goods/list/list'
        })
        break
      case 'stats':
        wx.navigateTo({
          url: '/pages/statistics/statistics'
        })
        break
    }
  }
}) 