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

    // 如果是application/x-www-form-urlencoded格式，确保data是字符串
    if (options.header && 
        options.header['content-type'] === 'application/x-www-form-urlencoded') {
      // 如果已经是字符串格式，不需要处理
      if(typeof options.data === 'string') {
        console.log('数据已经是字符串格式:', options.data)
      } else {
        // 如果是对象，转换为表单数据
        const formData = new URLSearchParams()
        for(let key in options.data) {
          if(options.data[key] !== undefined && options.data[key] !== null) {
            formData.append(key, options.data[key])
          }
        }
        options.data = formData.toString()
        console.log('转换后的表单数据:', options.data)
      }
    }

    wx.request({
      ...options,
      url: `${app.globalData.baseUrl}${options.url}`,
      success: (res) => {
        console.log(`发送请求URL:${options.url}`);
        console.log("请求参数:", {
          url: options.url,
          method: options.method,
          data: options.data,
          header: options.header
        });
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

