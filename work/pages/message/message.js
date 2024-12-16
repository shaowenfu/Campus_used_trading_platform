Page({
  data: {
    messages: [] // 存放公告数据
  },

  onLoad() {
    this.loadMessages(); // 页面加载时获取公告信息
  },

  // 加载公告数据
  loadMessages() {
    wx.request({
      url: 'http://localhost:8081/user/news/list', // 公告接口地址
      method: 'GET',
      header: { 'Authorization': wx.getStorageSync('token') },
      success: (res) => {
        if (res.statusCode === 200 && Array.isArray(res.data.data)) {
          const messages = res.data.data.map(item => ({
            id: item.id,
            detail: item.detail,
            image: item.image
          }));
          this.setData({ messages });
        } else {
          wx.showToast({ title: '加载公告失败', icon: 'none' });
        }
      },
      fail: () => {
        wx.showToast({ title: '网络请求失败', icon: 'none' });
      }
    });
  },

  // 点击公告跳转到详情页面
  onMessageClick(e) {
    const messageId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/message-detail/message-detail?id=${messageId}` // 跳转到详情页并携带id
    });
  }
});
