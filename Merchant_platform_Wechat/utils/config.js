const app = getApp()
export const baseUrl = app.globalData.baseUrl

export const isDev = false; // 开发模式标志

// 示例数据
export const mockData = {
  // 工作台数据
  workspace: {
    // 今日运营数据
    businessData: {
      turnover: 1234.56,        // 营业额
      validOrderCount: 25,      // 有效订单数
      orderCompletionRate: 85.5 // 订单完成率
    },
    
    // 商品总览
    thingOverview: {
      sold: 108,          // 在售商品数
      discontinued: 12    // 已下架商品数
    },
    
    // 订单管理数据
    orderOverview: {
      allOrders: 100,         // 全部订单
      unsolvedOrders: 10,     // 待处理订单
      tradingOrders: 15,      // 进行中订单
      completedOrders: 70,    // 已完成订单
      cancelledOrders: 5      // 已取消订单
    }
  },
  
  // 数据统计
  statistics: {
    // 销量排名top10
    salesTop10: {
      nameList: "iPhone 14,MacBook Pro,iPad Air,AirPods Pro,Apple Watch",
      numberList: "120,85,76,65,50"
    },
    
    // 营业额统计
    turnover: {
      dateList: "2024-03-15,2024-03-16,2024-03-17,2024-03-18,2024-03-19,2024-03-20,2024-03-21",
      turnoverList: "1234.56,1345.67,1456.78,1567.89,1678.90,1789.01,1890.12"
    },
    
    // 订单统计
    orders: {
      dateList: "2024-03-15,2024-03-16,2024-03-17,2024-03-18,2024-03-19,2024-03-20,2024-03-21",
      orderCountList: "25,28,30,27,32,35,38",
      validOrderCountList: "20,25,28,25,30,32,35",
      totalOrderCount: 215,
      validOrderCount: 195,
      orderCompletionRate: 90.7
    }
  },
  
  // 订单详情示例数据
  orderDetail: {
    id: 1,
    number: "20240321001",
    status: 2,
    statusText: "进行中",
    orderTime: "2024-03-21 10:00:00",
    amount: 99.00,
    userName: "张三",
    phone: "13800138000",
    address: "广东省广州市天河区天河路100号",
    remark: "请尽快发货",
    orderDishes: [
      {
        id: 1,
        name: "iPhone 14",
        image: "/images/goods/iphone.png",
        price: 99.00,
        number: 1,
        amount: 99.00
      }
    ]
  },
  
  // 订单列表示例数据
  orderList: {
    total: 2,
    records: [
      {
        id: 1,
        number: "202403210001",
        status: 'pending',
        statusText: "待接单",
        orderTime: "2024-03-21 10:00:00",
        amount: 99.00,
        phone: "13800138000"
      },
      {
        id: 2,
        number: "202403210002",
        status: 'processing',
        statusText: "进行中",
        orderTime: "2024-03-21 11:00:00",
        amount: 199.00,
        phone: "13800138001"
      },
      {
        id: 3,
        number: "202403210003",
        status: 'completed',
        statusText: "已完成",
        orderTime: "2024-03-21 12:00:00",
        amount: 299.00,
        phone: "13800138002"
      }
    ]
  },
  
  // 订单统计示例数据
  orderStatistics: {
    toBeConfirmed: 2,
    confirmed: 3
  },
  
  // 商品相关数据
  goods: {
    // 商品列表数据
    list: {
      total: 3,
      records: [
        {
          id: 1,
          name: "iPhone 14",
          categoryId: 1,
          categoryName: "手机数码",
          price: 5999.00,
          image: "/images/goods/iphone.png",
          description: "Apple iPhone 14 128GB",
          status: 1, // 1-在售 0-下架
          amount: 10,
          updateTime: "2024-03-21 10:00:00"
        },
        {
          id: 2,
          name: "MacBook Pro",
          categoryId: 2,
          categoryName: "电脑办公",
          price: 12999.00,
          image: "/images/goods/macbook.png", 
          description: "Apple MacBook Pro 14寸",
          status: 1,
          amount: 5,
          updateTime: "2024-03-21 11:00:00"
        }
      ]
    },
    // 商品分类
    categories: [
      { id: 1, name: "手机数码" },
      { id: 2, name: "电脑办公" },
      { id: 3, name: "图书音像" },
      { id: 4, name: "服装鞋帽" }
    ],
    // 商品详情
    detail: {
      id: 1,
      name: "iPhone 14",
      categoryId: 1,
      categoryName: "手机数码",
      price: 5999.00,
      image: "/images/goods/iphone.png",
      description: "Apple iPhone 14 128GB",
      status: 1,
      amount: 10,
      updateTime: "2024-03-21 10:00:00"
    }
  },
  
  // 商家信息
  profile: {
    id: 1,
    username: "shop001",
    name: "示例商家",
    phone: "13800138000",
    address: "广东省广州市天河区天河路100号",
    description: "专注二手商品交易",
    avatar: "/images/avatar.png",
    createTime: "2024-03-01 10:00:00"
  }
} 