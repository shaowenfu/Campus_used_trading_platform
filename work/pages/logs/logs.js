// logs.js
const util = require('../../utils/util.js')

/*
Page({
  data: {
    logs: []
  },
  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log
        }
      })
    })
  }
})
*/

Page({
  data: {
    username: '', // 存储用户名
    password: ''  // 存储密码
  },

  // 监听用户名输入
  onUsernameInput(event) {
    this.setData({
      username: event.detail.value
    });
  },

  // 监听密码输入
  onPasswordInput(event) {
    this.setData({
      password: event.detail.value
    });
  },

  // 登录按钮点击事件
  onLogin() {
    const { username, password } = this.data;

    // 模拟登录验证逻辑
    if (username === 'admin' && password === '123456') {
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000
      });

      // 跳转到主页面
      wx.redirectTo({
        url: '/pages/profile/profile', // 跳转目标页面路径
      });
    } else {
      wx.showToast({
        title: '用户名或密码错误',
        icon: 'error',
        duration: 2000
      });
    }
  }
});
