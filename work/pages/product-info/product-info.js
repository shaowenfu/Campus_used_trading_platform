Page({
  data: {
    categories: [],           // 分类列表
    products: [],             // 商品列表
    cart: [],                 // 购物车数据
    cartTotalCount: 0,        // 购物车总件数
    cartTotalPrice: 0,        // 购物车总金额
    selectedCategoryId: null, // 当前选中的分类ID
    showCart: false           // 是否显示购物车窗口
  },

  onLoad() {
    this.loadCategories();
  },

  // 加载分类数据
  loadCategories() {
    wx.request({
      url: 'http://localhost:8081/user/category/list',
      method: 'GET',
      header: { 'Authorization': wx.getStorageSync('token') },
      success: (res) => {
        if (res.statusCode === 200 && Array.isArray(res.data.data)) {
          const categories = res.data.data;
          console.log(categories);
          this.setData({
            categories,
            selectedCategoryId: categories[0]?.id || null
          });
          if (categories.length > 0) {
            console.log("start");
            this.loadCategoryProducts(categories[0].id, () => {
              this.loadCart();
            });
          }
        }
      }
    });
  },

  // 加载指定分类的商品
  loadCategoryProducts(categoryId, callback) {
    wx.request({
      url: 'http://localhost:8081/user/thing/list',
      method: 'GET',
      header: { 'Authorization': wx.getStorageSync('token') },
      data: { categoryId },
      success: (res) => {
        if (res.statusCode === 200 && Array.isArray(res.data.data)) {
          const products = res.data.data.map(item => ({
            ...item,
            quantity: 0 // 初始数量
          }));
          // 更新商品列表中的 quantity
          const updatedProducts = products.map(product => {
            const cartItem = this.data.cart.find(item => item.name.trim() === product.name.trim()); // 查找购物车中对应商品
            return {
              ...product,
              quantity: cartItem ? cartItem.amount : 0 // 同步购物车数量，若不存在则为 0
            };
          });
          this.setData({ products:  updatedProducts});
          if (typeof callback === "function") {
            callback();
          }
        }else {
          console.error('加载商品失败:', res);
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
      }
    });
  },

  // 增加商品数量
  increaseQuantity(e) {
    const productId = e.currentTarget.dataset.id;
    const product = this.data.products.find(item => item.id === productId);

    if (product.quantity >= product.amount) {
      wx.showToast({ title: '库存不足', icon: 'none' });
      return;
    }

    wx.request({
      url: 'http://localhost:8081/user/shoppingCart/add',
      method: 'POST',
      header: {
        'Authorization': wx.getStorageSync('token'),
        'Content-Type': 'application/json'
      },
      data: { thingId: productId },
      success: (res) => {
        if (res.statusCode === 200 && res.data.code === 1) {
          // 更新本地数据
          this.updateLocalCart(product, 1);
        }
      }
    });
  },

  // 减少商品数量
  decreaseQuantity(e) {
    const productId = e.currentTarget.dataset.id;
    const product = this.data.products.find(item => item.id === productId);

    if (product.quantity <= 0) {
      wx.showToast({ title: '商品数量不能小于0', icon: 'none' });
      return;
    }

    wx.request({
      url: `http://localhost:8081/user/shoppingCart/remove/${productId}`,
      method: 'DELETE',
      header: { 'Authorization': wx.getStorageSync('token') },
      success: (res) => {
        if (res.statusCode === 200 && res.data.code === 1) {
          this.updateLocalCart(product, -1);
        }
      }
    });
  },

  // 本地更新购物车数据（增/减）
  updateLocalCart(product, change) {
    let cart = [...this.data.cart];
    const existingProduct = cart.find(item => item.id === product.id);

    // 修改本地购物车数据
    if (existingProduct) {
      existingProduct.quantity += change;
      if (existingProduct.quantity <= 0) {
        cart = cart.filter(item => item.id !== product.id);
      }
    } else if (change > 0) {
      cart.push({ ...product, quantity: 1 });
    }

    // 更新商品列表中的数量
    const products = this.data.products.map(p => {
      if (p.id === product.id) p.quantity += change;
      return p;
    });

    // 重新计算总件数和总价格
    const cartTotalCount = cart.reduce((total, item) => total + item.quantity, 0) || 0;
    const cartTotalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0) || 0;

    this.setData({
      cart,
      products,
      cartTotalCount,
      cartTotalPrice
    });
  },

  // 加载购物车数据
  loadCart() {
    wx.request({
      url: 'http://localhost:8081/user/shoppingCart/list',
      method: 'GET',
      header: { 'Authorization': wx.getStorageSync('token') },
      success: (res) => {
        if (res.statusCode === 200 && Array.isArray(res.data.data)) {
          const cart = res.data.data;
          console.log(cart);
          console.log(this.data.products);
          // 更新商品列表中的 quantity
          const updatedProducts = this.data.products.map(product => {
            const cartItem = cart.find(item => item.name.trim() === product.name.trim()); // 查找购物车中对应商品
            return {
              ...product,
              quantity: cartItem ? cartItem.amount : 0 // 同步购物车数量，若不存在则为 0
            };
          });
          // 计算总件数和总价格
          console.log(updatedProducts);
          const cartTotalCount = cart.reduce((total, item) => total + item.amount, 0) || 0;
          const cartTotalPrice = cart.reduce((total, item) => total + item.price * item.amount, 0) || 0;
          this.setData({
            cart,
            cartTotalCount,
            cartTotalPrice,
            products: updatedProducts
          });
          
        }
      }
    });
  },

  // 清空购物车
  clearCart() {
    wx.request({
      url: 'http://localhost:8081/user/shoppingCart/clean',
      method: 'DELETE',
      header: { 'Authorization': wx.getStorageSync('token') },
      success: (res) => {
        if (res.statusCode === 200 && res.data.code === 1) {
          this.setData({
            cart: [],
            cartTotalCount: 0,
            cartTotalPrice: 0
          });
          wx.showToast({ title: '购物车已清空', icon: 'success' });
        }
      }
    });
  },


  // 处理分类点击事件
  onCategorySelect(e) {
    const categoryId = e.currentTarget.dataset.id; // 获取传递的分类ID
    console.log("选中的分类ID:", categoryId);

    // 更新选中的分类ID
    this.setData({
      selectedCategoryId: categoryId
    });

    // 加载选中分类的商品信息
    this.loadCategoryProducts(categoryId);
  },


  // 显示/隐藏购物车窗口
  toggleCart() {
    if (!this.data.showCart) this.loadCart();
    this.setData({ showCart: !this.data.showCart });
  }
});