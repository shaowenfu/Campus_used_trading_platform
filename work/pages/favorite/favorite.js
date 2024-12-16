Page({
  data: {
    // 模拟的收藏商品列表
    favoriteList: [
      { id: '1', productName: '商品1', price: 99.99, imageUrl: 'https://example.com/product1.jpg' },
      { id: '2', productName: '商品2', price: 199.99, imageUrl: 'https://example.com/product2.jpg' },
      { id: '3', productName: '商品3', price: 149.99, imageUrl: 'https://example.com/product3.jpg' },
      // 这里可以添加更多商品
    ]
  },

  // 查看商品详情
  viewProductDetails(e) {
    const productId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/product-details/product-details?id=${productId}` // 跳转到商品详情页面
    });
  }
});
