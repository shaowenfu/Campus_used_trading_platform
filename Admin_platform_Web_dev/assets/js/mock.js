// Mock 数据
const MOCK_DATA = {
    // 商家数据
    merchant: {
        total: 25,
        records: Array(10).fill(null).map((_, index) => ({
            id: index + 1,
            username: `merchant${index + 1}`,
            name: `测试商家${index + 1}`,
            phone: `1380000${String(index + 1).padStart(4, '0')}`,
            idNumber: `3301${String(index + 1).padStart(16, '0')}`,
            status: index % 3 ? 1 : 0,
            createTime: '2024-03-21 14:30:00',
            updateTime: '2024-03-21 14:30:00'
        }))
    },

    // 商品数据
    thing: {
        total: 50,
        records: Array(10).fill(null).map((_, index) => ({
            id: index + 1,
            name: `测试商品${index + 1}`,
            categoryId: (index % 5) + 1,
            categoryName: `测试分类${(index % 5) + 1}`,
            price: Math.floor(Math.random() * 1000) + 1,
            image: 'https://via.placeholder.com/200',
            description: `这是测试商品${index + 1}的描述信息`,
            status: index % 2 ? 1 : 0,
            updateTime: '2024-03-21 14:30:00',
            amount: Math.floor(Math.random() * 100)
        }))
    },

    // 订单数据
    order: {
        total: 100,
        records: Array(10).fill(null).map((_, index) => ({
            id: index + 1,
            number: `ORDER${String(index + 1).padStart(8, '0')}`,
            status: (index % 5) + 1,
            userId: index + 1,
            orderTime: '2024-03-21 14:30:00',
            amount: Math.floor(Math.random() * 10000) / 100,
            consignee: `收货人${index + 1}`,
            phone: `1390000${String(index + 1).padStart(4, '0')}`,
            address: `测试地址${index + 1}`,
            orderDetailList: [
                {
                    id: index * 2 + 1,
                    name: `测试商品${index * 2 + 1}`,
                    image: 'https://via.placeholder.com/100',
                    amount: Math.floor(Math.random() * 1000) / 100,
                    number: Math.floor(Math.random() * 5) + 1
                }
            ]
        }))
    },

    // 分类数据
    category: {
        total: 8,
        records: Array(8).fill(null).map((_, index) => ({
            id: index + 1,
            name: `测试分类${index + 1}`,
            sort: index + 1,
            status: index % 2 ? 1 : 0,
            createTime: '2024-03-21 14:30:00',
            updateTime: '2024-03-21 14:30:00'
        }))
    },

    // 新闻数据
    news: {
        total: 20,
        records: Array(10).fill(null).map((_, index) => ({
            id: index + 1,
            detail: `这是测试新闻${index + 1}的内容，包含一些测试信息。`,
            sort: index + 1,
            status: index % 2 ? 1 : 0,
            createTime: '2024-03-21 14:30:00',
            updateTime: '2024-03-21 14:30:00'
        }))
    },

    // 统计数据
    statistics: {
        merchantCount: 25,
        productCount: 50,
        orderCount: {
            deliveryInProgress: 8,
            toBeConfirmed: 5
        },
        newsCount: 20
    }
};

// 模拟延迟
const mockDelay = () => new Promise(resolve => setTimeout(resolve, 500)); 