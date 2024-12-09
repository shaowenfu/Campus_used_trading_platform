// pages/goods/add/add.js
import { isDev, mockData } from '../../../utils/config'
import { request, uploadFile } from '../../../utils/request'
const app = getApp()

Page({
  data: {
    formData: {
      name: '',
      categoryId: '',
      price: '',
      amount: '',
      description: '',
      image: ''
    },
    categories: [],
    imageUrl: '', // 预览图片
    submitLoading: false
  },

  onLoad() {
    this.getCategories()
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
      console.log('请求分类数据')
      const res = await request({
        url: '/marketer/category',
        method: 'GET'
      })
      
      console.log('分类数据响应:', res)
      
      if(res.code === 1) {
        // 构建分类映射对象
        const categoryMap = {}
        res.data.forEach(category => {
          categoryMap[category.id] = category.name
        })
        
        this.setData({
          categories: res.data,
          categoryMap: categoryMap
        })
        console.log('设置后的categories:', this.data.categories)
        console.log('设置后的categoryMap:', this.data.categoryMap)
      } else {
        wx.showToast({
          title: res.msg || '获取分类失败',
          icon: 'none'
        })
      }
    } catch(e) {
      console.error('获取分类失败', e)
      wx.showToast({
        title: '获取分类失败',
        icon: 'none'
      })
    }
  },

  // 选择分类
  onCategoryChange(e) {
    const index = e.detail.value
    const category = this.data.categories[index]
    console.log('选择的分类:', category)
    this.setData({
      'formData.categoryId': category.id
    })
    console.log('设置后的categoryId:', this.data.formData.categoryId)
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
      const res = await wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sizeType: ['compressed'],
        sourceType: ['album', 'camera']
      })
      
      const tempFilePath = res.tempFiles[0].tempFilePath
      console.log('临时文件路径:', tempFilePath)

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
        
        this.setData({
          imageUrl: imageUrl,  // 使用base64预览
          'formData.image': saveRes.savedFilePath  // 存储永久路径
        })
        
        wx.showToast({
          title: '上传成功'
        })
      } catch(err) {
        console.error('保存图片失败:', err)
        wx.showToast({
          title: '保存图片失败',
          icon: 'none'
        })
      }
    } catch(e) {
      console.error('选择图片失败:', e)
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
        title: '请上传���品图片',
        icon: 'none'
      })
      return false
    }
    return true
  },

  // 返回上一页
  goBack() {
    wx.switchTab({
      url: '/pages/goods/list/list'
    })
  },

  // 提交表单
  async submitForm() {
    if(!this.validateForm()) return
    if(this.data.submitLoading) return
    
    this.setData({ submitLoading: true })
    
    try {
      if(isDev) {
        wx.showToast({ title: '添加成功' })
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/goods/list/list'
          })
        }, 1500)
        return
      }

      // 构造请求数据，确保格式与后端一致
      const thingDTO = {
        name: this.data.formData.name,
        categoryId: Number(this.data.formData.categoryId),
        amount: Number(this.data.formData.amount),
        price: Number(this.data.formData.price),
        image: this.data.formData.image,
        description: this.data.formData.description,
        status: 1,  // 默认上架
        tradeStyle: 1  // 默认自取
      }

      console.log('提交的商品数据:', thingDTO)

      const res = await request({
        url: '/marketer/thing',
        method: 'POST',
        data: thingDTO,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      })
      
      if(res.code === 1) {
        wx.showToast({ title: '添加成功' })
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/goods/list/list'
          })
        }, 1500)
      } else {
        wx.showToast({
          title: res.msg || '添加失败',
          icon: 'none'
        })
      }
    } catch(e) {
      console.error('添加商品失败:', e)
      wx.showToast({
        title: '添加失败',
        icon: 'none'
      })
    } finally {
      this.setData({ submitLoading: false })
    }
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
   * 页面相关事处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})