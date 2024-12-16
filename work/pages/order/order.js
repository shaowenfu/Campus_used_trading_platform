Page({
  data: {
    // 初始显示的订单状态
    selectedStatus: 'completed',  // 默认显示已完成的订单
    orderList: [
      { id: '12345', productName: '商品1', quantity: 2, totalPrice: 199.99, status: '已完成' },
      { id: '12346', productName: '商品2', quantity: 1, totalPrice: 99.99, status: '未支付' },
      { id: '12347', productName: '商品3', quantity: 3, totalPrice: 299.99, status: '已支付' },
      { id: '12348', productName: '商品4', quantity: 1, totalPrice: 149.99, status: '待发货' }
    ]
  },

  // 切换订单状态
  switchStatus(e) {
    const status = e.currentTarget.dataset.status;
    this.setData({
      selectedStatus: status
    });
    this.filterOrdersByStatus(status);
  },

  // 根据订单状态筛选订单
  filterOrdersByStatus(status) {
    const allOrders = [
      { id: '12345', productName: '商品1', quantity: 2, totalPrice: 199.99, status: '已完成' },
      { id: '12346', productName: '商品2', quantity: 1, totalPrice: 99.99, status: '未支付' },
      { id: '12347', productName: '商品3', quantity: 3, totalPrice: 299.99, status: '已支付' },
      { id: '12348', productName: '商品4', quantity: 1, totalPrice: 149.99, status: '待发货' }
    ];
    const filteredOrders = allOrders.filter(order => order.status === status);
    this.setData({
      orderList: filteredOrders
    });
  },

  // 查看订单详情
  viewOrderDetails(e) {
    const orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/order-details/order-details?id=${orderId}`
    });
  }
});
