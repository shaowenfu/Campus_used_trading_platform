Page({
  data: {
    cartItems: [
      { imageUrl: 'https://example.com/product1.jpg', name: '商品1', quantity: 2, price: 99.99 },
      { imageUrl: 'https://example.com/product2.jpg', name: '商品2', quantity: 1, price: 49.99 },
      { imageUrl: 'https://example.com/product3.jpg', name: '商品3', quantity: 3, price: 19.99 }
    ],
    totalPrice: 0
  },

  onLoad() {
    this.calculateTotalPrice(); // 计算总价
  },

  // 计算总价
  calculateTotalPrice() {
    let total = 0;
    this.data.cartItems.forEach(item => {
      total += item.price * item.quantity;
    });
    this.setData({ totalPrice: total.toFixed(2) });
  },

  // 删除购物车商品
  removeItem(e) {
    const index = e.currentTarget.dataset.index;
    let cartItems = this.data.cartItems;
    cartItems.splice(index, 1);
    this.setData({ cartItems });
    this.calculateTotalPrice(); // 更新总价
  },

  // 去结算
  goToCheckout() {
    wx.navigateTo({
      url: '/pages/checkout/checkout' // 假设你有一个结算页面
    });
  },

   
});
