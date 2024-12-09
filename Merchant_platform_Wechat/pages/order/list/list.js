// pages/order/list/list.js
import { isDev, mockData } from '../../../utils/config'
import { request } from '../../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    orderStatistics: {},
    queryParams: {
      page: 1,
      pageSize: 10,
      status: '', // 订单状态
      number: '', // 订单号
      phone: '',  // 手机号
      beginTime: '',
      endTime: ''
    },
    total: 0,
    loading: false,
    statusOptions: [
        { text: '全部', value: '' },
        { text: '待接单', value: 2 },
        { text: '进行中', value: 3 },
        { text: '已完成', value: 4 },
        { text: '已取消', value: 5 }
      ],      
    searchValue: ''  // 搜索框的值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(options.status) {
      this.setData({
        'queryParams.status': options.status
      })
    }
    this.getOrderStatistics()
    this.getOrderList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.setData({
      'queryParams.page': 1,
      orderList: []
    })
    this.getOrderList()
    this.getOrderStatistics()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if(this.data.orderList.length >= this.data.total) return
    this.setData({
      'queryParams.page': this.data.queryParams.page + 1
    })
    this.getOrderList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 获取订单统计数据
  async getOrderStatistics() {
    try {
      if(isDev) {
        this.setData({
          orderStatistics: mockData.orderStatistics
        })
        return
      }

      const res = await request({
        url: '/marketer/order/statistics',
        method: 'GET'
      })

      console.log('统计数据完整响应:', res)

      if(res.code === 1) {
        this.setData({
          orderStatistics: {
            confirmed: res.data.confirmed,
            toBeConfirmed: res.data.toBeConfirmed,
          }
        })
      }
      console.log('设置后的orderStatistics:', this.data.orderStatistics)
    } catch(e) {
      console.error('获取订单统计失败', e)
    }
  },

  // 获取订单列表
  async getOrderList() {
    if(this.data.loading) return
    
    this.setData({ loading: true })
    
    try {
      if(isDev) {
        const { records, total } = mockData.orderList
        this.setData({
          orderList: this.data.queryParams.page === 1 ? records : [...this.data.orderList, ...records],
          total
        })
        return
      }

      const res = await request({
        url: '/marketer/order/conditionSearch',
        method: 'GET',
        data: this.data.queryParams
      })

      console.log('订单列表完整响应:', res)
      
      if(res.code === 1) {
        const { records, total } = res.data
        this.setData({
          orderList: this.data.queryParams.page === 1 ? records : [...this.data.orderList, ...records],
          total
        })
        console.log('设置后的orderList:', this.data.orderList)
      }
    } catch(e) {
      console.error('获取订单列表失败', e)
    } finally {
      this.setData({ loading: false })
    }
  },

  // 切换订单状态
  onStatusChange(e) {
    console.log('e.currentTarget.dataset.value:', e.currentTarget.dataset.value)
    this.setData({
      'queryParams.status': e.currentTarget.dataset.value,
      'queryParams.page': 1,
      orderList: []
    })
    this.getOrderList()
  },

  // 搜索
  onSearch() {
    const value = this.data.searchValue.trim()
    
    if(!value) {
      // 清空搜索条件
      this.setData({
        'queryParams.phone': '',
        'queryParams.number': '',
        'queryParams.page': 1,
        orderList: []
      })
      this.getOrderList()
      return
    }
    
    // 判断是订单号还是手机号
    if(/^\d{11}$/.test(value)) {
      this.setData({
        'queryParams.phone': value,
        'queryParams.number': '',
        'queryParams.page': 1,
        orderList: []
      })
    } else {
      this.setData({
        'queryParams.number': value,
        'queryParams.phone': '',
        'queryParams.page': 1,
        orderList: []
      })
    }
    
    wx.showLoading({
      title: '搜索中...'
    })
    
    this.getOrderList()
      .finally(() => {
        wx.hideLoading()
      })
  },

  // 接单
  async confirmOrder(e) {
    const orderId = e.currentTarget.dataset.id
    try {
      const res = await request({
        url: '/marketer/order/confirm',
        method: 'PUT',
        data: { id: orderId }
      })
      
      if(res.code === 1) {
        wx.showToast({ title: '接单成功' })
        this.getOrderList()
        this.getOrderStatistics()
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
  async completeOrder(e) {
    const orderId = e.currentTarget.dataset.id
    try {
      const res = await request({
        url: `/marketer/order/complete/${orderId}`,
        method: 'PUT'
      })
      
      if(res.code === 1) {
        wx.showToast({ title: '订单已完成' })
        this.getOrderList()
        this.getOrderStatistics()
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
  async cancelOrder(e) {
    const orderId = e.currentTarget.dataset.id
    
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
          id: orderId,
          cancelReason
        }
      })
      
      if(res.code === 1) {
        wx.showToast({ title: '单已取消' })
        this.getOrderList()
        this.getOrderStatistics()
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

  // 查看订单详情
  goToDetail(e) {
    const orderId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/order/detail/detail?id=${orderId}`
    })
  }
})