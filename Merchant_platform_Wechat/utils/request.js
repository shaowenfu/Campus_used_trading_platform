const app = getApp()

// 封装请求方法
export const request = (options) => {
  return new Promise((resolve, reject) => {
    // 如果不是登录接口，则添加token
    if (!options.url.includes('/marketer/login')) {
      const token = wx.getStorageSync('token')
      options.header = {
        ...options.header,
        'Authorization': token
      }
    }

    wx.request({
      ...options,
      url: `${app.globalData.baseUrl}${options.url}`,
      success: (res) => {
        console.log(`发送请求URL:${options.url}`);
        console.log("请求响应数据:", res.data);
        if(res.data.code === 1) {
          resolve({
            code: res.data.code,
            msg: res.data.msg,
            data: res.data.data || res.data
          })
        } else {
          reject(res.data)
          wx.showToast({
            title: res.data.msg || '请求失败',
            icon: 'none'
          })
        }
      },
      fail: (err) => {
        reject(err)
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      }
    })
  })
}

// 上传文件方法
export const uploadFile = (options) => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      ...options,
      url: `${app.globalData.baseUrl}${options.url}`,
      success: (res) => {
        const data = JSON.parse(res.data)
        if(data.code === 0) {
          resolve(data)
        } else {
          reject(data)
          wx.showToast({
            title: data.msg || '上传失败',
            icon: 'none'
          })
        }
      },
      fail: (err) => {
        reject(err)
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      }
    })
  })
} 