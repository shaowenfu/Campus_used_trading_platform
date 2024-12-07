// pages/goods/edit/edit.js
import { isDev, mockData } from '../../../utils/config'
import { request } from '../../../utils/request'
Page({
  data: {
    id: null,
    formData: {
      name: '',
      categoryId: '',
      price: '',
      amount: '',
      description: '',
      image: ''
    },
    categories: [],
    imageUrl: '',
    submitLoading: false
  },

  onLoad(options) {
    this.setData({
      id: options.id
    })
    this.getCategories()
    this.getGoodsDetail()
  },

  // 获取商品详情
  async getGoodsDetail() {
    try {
      if(isDev) {
        const detail = mockData.goods.detail
        this.setData({
          formData: detail,
          imageUrl: detail.image
        })
        return
      }

      const res = await request({
        url: `/marketer/thing/${this.data.id}`,
        method: 'GET'
      })
      
      if(res.data.code === 0) {
        const detail = res.data.data
        this.setData({
          formData: detail,
          imageUrl: detail.image
        })
      }
    } catch(e) {
      console.error('获取商品详情失败', e)
    }
  },

  // 获取商品分类
  async getCategories() {
    if(isDev) {
      this.setData({
        categories: mockData.goods.categories
      })
      return
    }

    try {
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

  // 选择分类
  onCategoryChange(e) {
    const index = e.detail.value
    const category = this.data.categories[index]
    this.setData({
      'formData.categoryId': category.id
    })
  },

  // 输入商品名称
  onNameInput(e) {
    this.setData({
      'formData.name': e.detail.value
    })
  },

  // 输入价格
  onPriceInput(e) {
    this.setData({
      'formData.price': e.detail.value
    })
  },

  // 输入库存
  onAmountInput(e) {
    this.setData({
      'formData.amount': e.detail.value
    })
  },

  // 输入描述
  onDescInput(e) {
    this.setData({
      'formData.description': e.detail.value
    })
  },

  // 选择图片
  async chooseImage() {
    try {
      const res = await wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera']
      })

      const tempFilePath = res.tempFilePaths[0]
      
      // 开发模式直接使用临时路径
      if(isDev) {
        this.setData({
          imageUrl: tempFilePath,
          'formData.image': tempFilePath
        })
        return
      }

      // 上传图片
      const uploadRes = await wx.uploadFile({
        url: '/marketer/file/upload',
        filePath: tempFilePath,
        name: 'file'
      })

      const data = JSON.parse(uploadRes.data)
      if(data.code === 0) {
        this.setData({
          imageUrl: data.data.url,
          'formData.image': data.data.url
        })
      } else {
        wx.showToast({
          title: '图片上传失败',
          icon: 'none'
        })
      }
    } catch(e) {
      wx.showToast({
        title: '图片选择失败',
        icon: 'none'
      })
    }
  },

  // 表单验证
  validateForm() {
    const { name, categoryId, price, amount, image } = this.data.formData
    if(!name.trim()) {
      wx.showToast({
        title: '请输入商品名称',
        icon: 'none'
      })
      return false
    }
    if(!categoryId) {
      wx.showToast({
        title: '请选择商品分类',
        icon: 'none'
      })
      return false
    }
    if(!price || isNaN(price) || price <= 0) {
      wx.showToast({
        title: '请输入正确的价格',
        icon: 'none'
      })
      return false
    }
    if(!amount || isNaN(amount) || amount <= 0) {
      wx.showToast({
        title: '请输入正确的库存',
        icon: 'none'
      })
      return false
    }
    if(!image) {
      wx.showToast({
        title: '请上传商品图片',
        icon: 'none'
      })
      return false
    }
    return true
  },

  // 提交表单
  async submitForm() {
    if(!this.validateForm()) return
    if(this.data.submitLoading) return
    
    this.setData({ submitLoading: true })
    
    try {
      if(isDev) {
        wx.showToast({ title: '修改成功' })
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
        return
      }

      const res = await request({
        url: `/marketer/thing/${this.data.id}`,
        method: 'PUT',
        data: this.data.formData
      })
      
      if(res.data.code === 0) {
        wx.showToast({ title: '修改成功' })
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    } catch(e) {
      wx.showToast({
        title: '修改失败',
        icon: 'none'
      })
    } finally {
      this.setData({ submitLoading: false })
    }
  },

  goToList() {
    wx.navigateBack({
      delta: 1
    })
  }
})