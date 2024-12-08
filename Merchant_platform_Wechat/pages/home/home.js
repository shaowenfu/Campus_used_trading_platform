import { isDev, mockData } from '../../utils/config'
import { request } from '../../utils/request'

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
      if (isDev) {
        this.setData({
          businessData: mockData.workspace.businessData
        })
        return
      }

      const res = await request({
        url: '/marketer/workspace/businessData',
        method: 'GET'
      })

      console.log('完整的响应数据:', res);
      
      if (res.code === 1) {
        this.setData({
          businessData: {
            turnover: res.data.turnover,
            validOrderCount: res.data.validOrderCount,
            orderCompletionRate: res.data.orderCompletionRate
          }
        })
      }
      
      console.log('设置后的businessData:', this.data.businessData)
    } catch (e) {
      console.error('获取运营数据失败', e)
    }
  },

  // 获取商品总览
  async getDishOverview() {
    try {
      if (isDev) {
        this.setData({
          dishOverview: mockData.workspace.dishOverview
        })
        return
      }

      const res = await request({
        url: '/marketer/workspace/overviewThings',
        method: 'GET'
      })

      if (res.data.code === 1) {
        this.setData({
          dishOverview: res.data.data
        })
      }
    } catch (e) {
      console.error('获取商品总览失败', e)
    }
  },

  // 获取订单总览

  async getOrderOverview() {
    try {
      if (isDev) {
        this.setData({
          orderOverview: mockData.workspace.orderOverview
        })
        return
      }

      const res = await request({
        url: '/marketer/workspace/overviewOrders',
        method: 'GET'
      })

      //打印完整的响应数据
      console.log('完整的响应数据:', res);

      if (res.code === 1) {
        this.setData({
          orderOverview: {
            tradingOrders: res.data.tradingOrders,
            unsolvedOrders: res.data.unsolvedOrders,
            completedOrders: res.data.completedOrders,
            cancelledOrders: res.data.cancelledOrders,
            allOrders: res.data.allOrders
          }
        })
      }
      console.log('设置后的orderOverview:', this.data.orderOverview)
    } catch (e) {
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
    switch (type) {
      case 'order':
        wx.switchTab({
          url: '/pages/order/list/list'
        })
        break
      case 'goods':
        wx.switchTab({
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