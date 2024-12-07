const app = getApp()

// 封装请求方法
export const request = (options) => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...options,
      url: `${app.globalData.baseUrl}${options.url}`,
      success: (res) => {
          console.log( `发送请求URL:${options.url}`);
          console.log("     这里是回调函数");
        if(res.data.code === 1) {
            console.log("     这里是当res.data.code ===1,请求成功");
            console.log(`"     请求结果：${res.data}"`)
          resolve(res.data)
        } else {
            console.log("     这里是当res.data.code === 0,请求失败");
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