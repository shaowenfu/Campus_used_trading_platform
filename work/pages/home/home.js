const userLogin = (params) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://localhost:8081/user/user/login', // 替换为实际后端地址
      method: 'POST',
      data: params,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data); // 假设返回的数据在 res.data 中
        } else {
          reject(res.data);
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};

Page({
  data: {
    searchQuery: '',  // 保存用户输入的搜索内容
    searchResults: [],  // 保存搜索结果
    isLoggedIn: false,   // 用户登录状态
    isLoading: false,     // 加载状态
    isError: false,       // 错误状态
    userInfo: {},         // 用户信息
    token: '',            // 假设这是用户的登录令牌
  },

  onLoad() {
    this.showLoginPrompt(); // 页面加载时显示登录提示
  },

  // 显示温馨提示
  showLoginPrompt() {
    const _this = this;
    wx.showModal({
      title: '温馨提示',
      content: '授权微信登录后才能使用完整功能，是否授权？',
      showCancel: true,
      confirmText: '立即授权',
      success(res) {
        if (res.confirm) {
          console.log('用户选择了授权');
          _this.handleLoginTap(); // 点击确认后调用登录逻辑
        } else {
          console.log('用户取消了授权');
          wx.showToast({
            title: '授权取消，部分功能可能受限',
            icon: 'none',
          });
        }
      },
    });
  },

  // 登录逻辑
  handleLoginTap() {
    console.log('用户点击授权登录');
    var _this = this;

    // 获取用户信息并登录
    wx.getUserProfile({
      desc: '用于登录和使用完整功能',
      success: function (userInfo) {
        console.log('用户信息获取成功:', userInfo);
        _this.setBaseUserInfo(userInfo.userInfo);

      // 存储用户信息到本地缓存
      wx.setStorageSync('userInfo', {
        avatarUrl: userInfo.userInfo.avatarUrl,
        nickName: userInfo.userInfo.nickName
      });


      // 设置用户信息到页面数据
      _this.setBaseUserInfo(userInfo.userInfo);

        // 获取登录 jsCode
        wx.login({
          success: function (loginRes) {
            console.log('登录结果:', loginRes);
            if (loginRes.errMsg === 'login:ok') {
              var jsCode = loginRes.code;
              console.log('获取到 jsCode:', jsCode);

              var params = {
                code: jsCode,
                avatar: userInfo.userInfo.avatarUrl,
                name: userInfo.userInfo.nickName,
                sex: userInfo.userInfo.gender,
              };

              console.log('登录请求参数:', params);
              userLogin(params)
                .then(function (response) {
                  console.log('登录响应结果:', response);
                  if (response.code === 1) {
                    const token = response.data.token; // 获取后端返回的 token
                    wx.setStorageSync('token', response.data.token); // 保存 token 到本地存储
                    _this.setToken(response.data.token);
                    console.log('Token:', wx.getStorageSync('token'));

                    wx.showToast({
                      title: '登录成功',
                      icon: 'success',
                    });
                  } else {
                    wx.showToast({
                      title: '登录失败，请重试',
                      icon: 'none',
                    });
                  }
                })
                .catch(function (err) {
                  console.error('网络错误:', err);
                  wx.showToast({
                    title: '网络错误，请稍后再试',
                    icon: 'none',
                  });
                });
            } else {
              console.error('登录失败:', loginRes);
            }
          },
          fail: function (err) {
            console.error('wx.login 调用失败:', err);
            wx.showToast({
              title: '登录失败，请稍后再试',
              icon: 'none',
            });
          },
        });
      },
      fail: function (err) {
        console.error('用户拒绝授权:', err);
        wx.showToast({
          title: '未授权，无法登录',
          icon: 'none',
        });
      },
    });
  },

  // 设置用户信息
  setBaseUserInfo(userInfo) {
    this.setData({
      userInfo: userInfo
    });
  },

  // 设置登录 token
  setToken(token) {
    this.setData({
      token: token,
      isLoggedIn: true, // 更新登录状态
    });
  },
});