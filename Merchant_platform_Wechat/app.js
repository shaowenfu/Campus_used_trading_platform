// app.js
App({
  globalData: {
    baseUrl: 'http://localhost:8081', // 开发环境
    // baseUrl: 'https://api.example.com', // 生产环境
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 可以在这里根据环境动态设置baseUrl
    if(process.env.NODE_ENV === 'production') {
      this.globalData.baseUrl = 'https://api.example.com'
    }
  }
})
