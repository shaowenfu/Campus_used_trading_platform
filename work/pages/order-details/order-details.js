Page({
  data: {
    order: {
      id: '12345',
      productName: '商品1',
      quantity: 2,
      totalPrice: 199.99,
      status: '已完成',
      orderTime: '2024-11-10 12:30'
    }
  },

  onLoad(options) {
    const orderId = options.id;
    // 假设从服务器获取订单详情
    // 这里的order信息可以根据orderId查询数据库获取
  },

  cancelOrder() {
    wx.showModal({
      title: '确认取消订单',
      content: '您确认要取消此订单吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '订单已取消',
            icon: 'success',
            duration: 2000
          });
        }
      }
    });
  },

  reorder() {
    wx.showToast({
      title: '已重新下单',
      icon: 'success',
      duration: 2000
    });
  }
});
