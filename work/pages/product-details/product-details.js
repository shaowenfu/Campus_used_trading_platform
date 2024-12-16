Page({
  data: {
    product: {} // 商品详情数据
  },

  onLoad(options) {
    const productId = options.id; // 获取商品id
    this.loadProductDetails(productId); // 加载商品详情
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


  loadProductDetails(productId) {
    // 这里是模拟从服务器或本地数据库中获取商品详细信息
    const productDetails = {
      id: productId,
      productName: '商品1',
      description: '这是商品1的详细描述，包含更多的商品信息。',
      price: 99.99,
      imageUrl: 'https://example.com/product1.jpg'
    };

    // 更新商品详情数据
    this.setData({
      product: productDetails
    });
  }
});
