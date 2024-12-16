Page({
  data: {
    productId: '',
    reviews: [],
    newReview: '' // 新评价内容
  },

  onLoad(options) {
    const productId = options.productId;
    this.setData({ productId });

    // 模拟请求商品评价数据
    this.fetchReviews(productId);
  },

  fetchReviews(productId) {
    // 替换为实际的请求接口
    const mockReviews = [
      { id: 'r1', userName: '用户A', content: '非常好用' },
      { id: 'r2', userName: '用户B', content: '质量不错' },
      { id: 'r3', userName: '用户C', content: '价格很实惠' },
      { id: 'r4', userName: '用户D', content: '物流很快' },
      { id: 'r5', userName: '用户E', content: '售后服务很好' },
    ];

    setTimeout(() => {
      this.setData({
        reviews: mockReviews
      });
    }, 500);
  },

  // 更新输入框中的内容
  onInputChange(e) {
    this.setData({
      newReview: e.detail.value
    });
  },

  // 提交评价
  submitReview() {
    const { newReview, reviews } = this.data;

    if (!newReview.trim()) {
      wx.showToast({
        title: '评价不能为空',
        icon: 'none'
      });
      return;
    }

    // 模拟提交评价到服务器
    const newReviewItem = {
      id: `r${reviews.length + 1}`, // 新的唯一ID
      userName: '用户F', // 假设是当前登录用户
      content: newReview
    };

    // 更新评价列表
    this.setData({
      reviews: [newReviewItem, ...reviews], // 新评价显示在最前面
      newReview: '' // 清空输入框
    });

    // 模拟显示成功消息
    wx.showToast({
      title: '评价成功',
      icon: 'success'
    });
  }
});
