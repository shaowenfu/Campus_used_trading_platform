// pages/order/detail/detail.js
import { isDev, mockData } from '../../../utils/config'
import { request } from '../../../utils/request'

Page({
  data: {
    orderId: null,
    orderDetail: null,
    loading: false
  },

  onLoad(options) {
    this.setData({
      orderId: options.id
    })
    this.getOrderDetail()
  },

  // 获取订单详情
  async getOrderDetail() {
    if(this.data.loading) return
    this.setData({ loading: true })
    
    try {
      if(isDev) {
        // 开发模式使用示例数据
        this.setData({
          orderDetail: mockData.orderDetail
        })
        return
      }

      const res = await request({
        url: `/marketer/order/details/${this.data.orderId}`,
        method: 'GET'
      })
      
      if(res.data.code === 0) {
        this.setData({
          orderDetail: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    } catch(e) {
      wx.showToast({
        title: '获取订单详情失败',
        icon: 'none'
      })
    } finally {
      this.setData({ loading: false })
    }
  },

  // 接单
  async confirmOrder() {
    try {
      const res = await request({
        url: '/marketer/order/confirm',
        method: 'PUT',
        data: { id: this.data.orderId }
      })
      
      if(res.data.code === 0) {
        wx.showToast({ title: '接单成功' })
        this.getOrderDetail()
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    } catch(e) {
      wx.showToast({
        title: '操作失败',
        icon: 'none'
      })
    }
  },

  // 完成订单
  async completeOrder() {
    try {
      const res = await request({
        url: `/marketer/order/complete/${this.data.orderId}`,
        method: 'PUT'
      })
      
      if(res.data.code === 0) {
        wx.showToast({ title: '订单已完成' })
        this.getOrderDetail()
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    } catch(e) {
      wx.showToast({
        title: '操作失败',
        icon: 'none'
      })
    }
  },

  // 取消订单
  async cancelOrder() {
    const { value: cancelReason } = await wx.showModal({
      title: '取消订单',
      editable: true,
      placeholderText: '请输入取消原因'
    })
    
    if(!cancelReason) return
    
    try {
      const res = await request({
        url: '/marketer/order/cancel',
        method: 'PUT',
        data: {
          id: this.data.orderId,
          cancelReason
        }
      })
      
      if(res.data.code === 0) {
        wx.showToast({ title: '订单已取消' })
        this.getOrderDetail()
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    } catch(e) {
      wx.showToast({
        title: '操作失败',
        icon: 'none'
      })
    }
  },

  // 拨打电话
  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.orderDetail.phone
    })
  },

  goToList() {
    wx.navigateBack({
      delta: 1
    })
  }
})