Page({
  data: {
    userInfo: {}
  },

  onLoad() {
        // 获取存储的用户信息
        const userInfo = wx.getStorageSync('userInfo');
        if (userInfo) {
          this.setData({
            userInfo: userInfo
          });
        }
  },

  // 页面跳转
  onNavigate(e) {
    const page = e.currentTarget.dataset.page; // 获取要跳转的页面路径
    wx.navigateTo({
      url: `/pages/${page}/${page}`, // 跳转到目标页面
      fail() {
        console.error("页面跳转失败，请检查路径！");
      }
    });
  },

// 切换登录，退出登录
logout: function() {
  wx.showModal({
    title: '确认退出登录',
    content: '您确定要退出登录吗?',
    success(res) {
      if (res.confirm) {
        // 退出登录逻辑（可以清除用户信息）
        wx.clearStorageSync();  // 清除缓存
        wx.redirectTo({
          url: '/pages/logs/logs', // 跳转到登录页面
        });
      }
    }
  });
}
});
