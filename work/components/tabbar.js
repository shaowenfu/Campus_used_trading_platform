Component({
  methods: {
    switchTab(e) {
      const page = e.currentTarget.dataset.page; // 获取要跳转的页面路径
      wx.navigateTo({
        url: page,
        fail() {
          console.error("页面跳转失败，请检查路径！");
        }
      });
    }
  }
});
