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
    categoryMap: {},
    searchValue: '',
    statusOptions: [
      { text: '全部', value: '' },
      { text: '在售', value: 1 },
      { text: '已下架', value: 0 }
    ],
    statusMap: {
      0: "已下架",
      1: "在售"
    }
  },

  onLoad() {
    this.getCategories()
    this.getGoodsList()
  },

  // 获取商品分类
  async getCategories() {
    if(isDev) {
      this.setData({
        categories: [
          { id: '', name: '全部' },
          ...mockData.goods.categories
        ]
      })
      return
    }

    try {
      console.log('请求分类数据')
      const res = await request({
        url: '/marketer/category',
        method: 'GET'
      })
      
      console.log('分类数据响应:', res)
      
      if(res.code === 1) {
        const categoryMap = {}
        categoryMap[''] = '全部'
        res.data.forEach(category => {
          categoryMap[category.id] = category.name
        })
        
        this.setData({
          categories: [
            { id: '', name: '全部' },
            ...res.data
          ],
          categoryMap: categoryMap
        })
        console.log('设置后的categories:', this.data.categories)
        console.log('设置后的categoryMap:', this.data.categoryMap)
      }
    } catch(e) {
      console.error('获取分类失败', e)
      wx.showToast({
        title: '获取分类失败',
        icon: 'none'
      })
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

      const params = {}
      Object.keys(this.data.queryParams).forEach(key => {
        if (this.data.queryParams[key] !== '' && this.data.queryParams[key] !== null) {
          params[key] = this.data.queryParams[key]
        }
      })
      console.log('发送请求参数:', params)

      const res = await request({
        url: '/marketer/thing/list',
        method: 'GET',
        data: params
      })
      
      if(res.code === 1) {
        // 处理商品数据，确保图片字段存在且有效
        const records = res.data.map(item => ({
          ...item,
          image: (item.image && item.image.startsWith('http')) ? item.image : 'goods_default.png' // 设置默认图片
        }))
        const total = records.length
        
        this.setData({
          goodsList: this.data.queryParams.page === 1 ? records : [...this.data.goodsList, ...records],
          total
        })
        console.log('商品列表数据:', this.data.goodsList)
      }
    } catch(e) {
      console.error('获取商品列表失败:', e)
      wx.showToast({
        title: '获取商品列表失败',
        icon: 'none'
      })
    } finally {
      this.setData({ loading: false })
    }
  },

  // 搜索商品
  onSearch(e) {
    const name = this.data.searchValue.trim()
    console.log('搜索商品名称:', name)
    if (!name && !this.data.queryParams.name) {
      return
    }
    
    this.setData({
      'queryParams.name': name,
      'queryParams.page': 1,
      goodsList: []
    })
    console.log('设置后的查询参数:', this.data.queryParams)
    this.getGoodsList()
  },

  // 搜索框输入
  onSearchInput(e) {
    this.setData({
      searchValue: e.detail.value
    })
    if (!e.detail.value) {
      this.clearSearch()
    }
  },

  // 清空搜索
  clearSearch() {
    this.setData({
      searchValue: '',
      'queryParams.name': '',
      'queryParams.page': 1,
      goodsList: []
    })
    console.log('清空搜索，重置参数:', this.data.queryParams)
    this.getGoodsList()
  },

  // 切换分类
  onCategoryChange(e) {
    const index = e.detail.value
    const category = this.data.categories[index]
    console.log('选择的分类:', category)
    this.setData({
      'queryParams.categoryId': category.id || '',
      'queryParams.page': 1,
      goodsList: []
    })
    console.log('设置后的categoryId:', this.data.queryParams.categoryId)
    this.getGoodsList()
  },

  // 切换状态
  onStatusChange(e) {
    const index = e.detail.value
    const status = this.data.statusOptions[index].value
    this.setData({
      'queryParams.status': status,
      'queryParams.page': 1,
      goodsList: []
    })
    this.getGoodsList()
  },

  // 上下架商品
  async toggleStatus(e) {
    console.log('toggleStatus:', e)
    const { id, status } = e.currentTarget.dataset
    console.log('id:', id)
    console.log('status:', status)
    const newStatus = status === 1 ? 0 : 1
    
    try {
      const res = await request({
        url: `/marketer/thing/status/${newStatus}`,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: `id=${id}`
      })
      
      if(res.code === 1) {
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
    console.log('id:', id)
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