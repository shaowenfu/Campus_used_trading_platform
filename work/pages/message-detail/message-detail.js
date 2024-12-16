Page({
  data: {
    message: {} // 存放公告详细信息
  },

  onLoad(options) {
    const { id } = options; // 获取传递过来的id
    this.loadMessageDetail(id);
  },

  // 加载公告详细信息
  loadMessageDetail(id) {
    wx.request({
      url: `http://localhost:8081/user/news/list/${id}`, // 获取公告详情的接口
      method: 'GET',
      header: { 'Authorization': wx.getStorageSync('token') },
      success: (res) => {
        if (res.statusCode === 200 && res.data.data) {
          this.setData({ message: res.data.data });
        } else {
          wx.showToast({ title: '加载详情失败', icon: 'none' });
        }
      },
      fail: () => {
        wx.showToast({ title: '网络请求失败', icon: 'none' });
      }
    });
  }
});
