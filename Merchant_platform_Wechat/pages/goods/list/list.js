// pages/goods/list/list.js
import { isDev, mockData } from '../../../utils/config'
import { request } from '../../../utils/request'
Page({
  data: {
    goodsList: [],
    queryParams: {
      page: 1,
      pageSize: 10,
      name: '',
      categoryId: '',
      status: ''
    },
    total: 0,
    loading: false,
    categories: [],
    statusOptions: [
      { text: '全部', value: '' },
      { text: '在售', value: '1' },
      { text: '已下架', value: '0' }
    ]
  },

  onLoad() {
    this.getCategories()
    this.getGoodsList()
  },

  // 获取商品分类
  async getCategories() {
    try {
      if(isDev) {
        this.setData({
          categories: mockData.goods.categories
        })
        return
      }

      const res = await request({
        url: '/marketer/category/list',
        method: 'GET'
      })
      
      if(res.data.code === 0) {
        this.setData({
          categories: res.data.data
        })
      }
    } catch(e) {
      console.error('获取分类失败', e)
    }
  },

  // 获取商品列表
  async getGoodsList() {
    if(this.data.loading) return
    this.setData({ loading: true })
    
    try {
      if(isDev) {
        const { records, total } = mockData.goods.list
        this.setData({
          goodsList: this.data.queryParams.page === 1 ? records : [...this.data.goodsList, ...records],
          total
        })
        return
      }

      const res = await request({
        url: '/marketer/thing/page',
        method: 'GET',
        data: this.data.queryParams
      })
      
      if(res.data.code === 0) {
        const { records, total } = res.data.data
        this.setData({
          goodsList: this.data.queryParams.page === 1 ? records : [...this.data.goodsList, ...records],
          total
        })
      }
    } catch(e) {
      console.error('获取商品列表失败', e)
    } finally {
      this.setData({ loading: false })
    }
  },

  // 搜索商品
  onSearch(e) {
    const name = e.detail.value.trim()
    this.setData({
      'queryParams.name': name,
      'queryParams.page': 1,
      goodsList: []
    })
    this.getGoodsList()
  },

  // 切换分类
  onCategoryChange(e) {
    this.setData({
      'queryParams.categoryId': e.detail.value,
      'queryParams.page': 1,
      goodsList: []
    })
    this.getGoodsList()
  },

  // 切换状态
  onStatusChange(e) {
    this.setData({
      'queryParams.status': e.detail.value,
      'queryParams.page': 1,
      goodsList: []
    })
    this.getGoodsList()
  },

  // 上下架商品
  async toggleStatus(e) {
    const { id, status } = e.currentTarget.dataset
    const newStatus = status === 1 ? 0 : 1
    
    try {
      const res = await request({
        url: `/marketer/thing/status/${id}/${newStatus}`,
        method: 'PUT'
      })
      
      if(res.data.code === 0) {
        wx.showToast({
          title: newStatus === 1 ? '上架成功' : '下架成功'
        })
        this.getGoodsList()
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

  // 编辑商品
  goToEdit(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/goods/edit/edit?id=${id}`
    })
  },

  // 新增商品
  goToAdd() {
    wx.navigateTo({
      url: '/pages/goods/add/add'
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      'queryParams.page': 1,
      goodsList: []
    })
    this.getGoodsList()
    wx.stopPullDownRefresh()
  },

  // 上拉加载
  onReachBottom() {
    if(this.data.goodsList.length >= this.data.total) return
    this.setData({
      'queryParams.page': this.data.queryParams.page + 1
    })
    this.getGoodsList()
  }
})