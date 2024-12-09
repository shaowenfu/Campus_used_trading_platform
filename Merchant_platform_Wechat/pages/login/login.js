import { request } from '../../utils/request'

const app = getApp()

Page({
  data: {
    username: '',
    password: '',
    isPasswordVisible: false,
    isAgreeProtocol: false,
    isDev: false  // 开发模式标志
  },

  // 输入用户名
  onUsernameInput(e) {
    this.setData({
      username: e.detail.value
    })
  },

  // 输入密码
  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 切换密码显示/隐藏
  togglePasswordVisibility() {
    this.setData({
      isPasswordVisible: !this.data.isPasswordVisible
    })
  },

  // 切换协议勾选
  toggleProtocol() {
    this.setData({
      isAgreeProtocol: !this.data.isAgreeProtocol
    })
  },

  // 登录
  async login() {
    // 开发模式下直接跳转
    if(this.data.isDev) {
      wx.setStorageSync('token', 'dev_token')
      wx.setStorageSync('userInfo', {
        id: 1,
        username: 'dev_user',
        name: '开发测试账号'
      })
      
      wx.reLaunch({
        url: '/pages/home/home'
      })
      return
    }

    // 以下是正式登录逻辑
    const {username, password, isAgreeProtocol} = this.data
    
    if(!username.trim()) {
      wx.showToast({
        title: '请输入手机号/用户名',
        icon: 'none'
      })
      return
    }

    if(!password.trim()) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return
    }

    if(!isAgreeProtocol) {
      wx.showToast({
        title: '请先同意使用协议',
        icon: 'none'
      })
      return
    }

    try {
      const res = await request({
        url: '/marketer/login',
        method: 'POST',
        data: {
          username,
          password
       }
      })

      // 存储基本信息
      wx.setStorageSync('token', res.data.token)
      wx.setStorageSync('userInfo', res.data)
      
      // 分别存储用户详细信息
      wx.setStorageSync('userId', res.data.id)
      wx.setStorageSync('userName', res.data.userName)
      wx.setStorageSync('name', res.data.name)

      //分别打印解析出的所有信息
      console.log(`userId: ${res.data.id}`);
      console.log(`userName: ${res.data.userName}`);
      console.log(`name: ${res.data.name}`);
      console.log(`token: ${res.data.token}`);  
      
      wx.showToast({
        title: '登录成功'
      })
      
      wx.reLaunch({
        url: '/pages/home/home'
      })
    } catch(e) {
      wx.showToast({
        title: '登录失败',
        icon: 'none'
      })
    }
  },

  // 第三方登录处理
  async thirdPartyLogin(e) {
    // 开发模式下直接跳转
    if(this.data.isDev) {
      wx.setStorageSync('token', 'dev_token')
      wx.setStorageSync('userInfo', {
        id: 1,
        username: 'dev_user',
        name: '开发测试账号'
      })
      
      wx.reLaunch({
        url: '/pages/home/home'
      })
      return
    }

    // 以下是正式第三方登录逻辑
    const loginType = e.currentTarget.dataset.type
    
    try {
      const {code} = await wx.login()
      
      const userInfoRes = await wx.getUserProfile({
        desc: '用于完善用户资料'
      })
      
      const res = await request({
        url: '/marketer/login',
        method: 'POST',
        data: {
          code,
          loginType,
          userInfo: userInfoRes.userInfo
        }
      })

      wx.setStorageSync('token', res.data.token)
      wx.setStorageSync('userInfo', res.data)
      
      wx.showToast({
        title: '登录成功'
      })
      
      wx.reLaunch({
        url: '/pages/home/home'
      })
    } catch(e) {
      if(e.errMsg.includes('getUserProfile:fail')) {
        wx.showToast({
          title: '需要授权才能继续',
          icon: 'none'
        })
        return
      }
      
      wx.showToast({
        title: '登录失败',
        icon: 'none'
      })
    }
  }
})
