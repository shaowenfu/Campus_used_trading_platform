// API 接口封装
const API = {
    baseUrl: 'http://localhost:8080',
    isDev: true, // 开发模式标志

    // 获取 mock 数据的通用方法
    async getMockData(module, params = {}) {
        await mockDelay();
        const data = MOCK_DATA[module];
        if (!data) return null;

        // 如果有分页参数，进行分页处理
        if (params.page && params.pageSize) {
            const start = (params.page - 1) * params.pageSize;
            const end = start + params.pageSize;
            return {
                code: 0,
                data: {
                    total: data.total,
                    records: data.records.slice(start, end)
                },
                msg: '获取成功'
            };
        }
        return { code: 0, data, msg: '获取成功' };
    },

    // 获取请求头
    getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        };
    },

    // 登录接口
    login: async (username, password) => {
        if (API.isDev) {
            await mockDelay();
            return {
                code: 0,
                data: {
                    id: 1,
                    name: '测试管理员',
                    token: 'mock-token',
                    userName: username
                },
                msg: '登录成功'
            };
        }

        try {
            const response = await fetch(`${API.baseUrl}/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            return await response.json();
        } catch (error) {
            console.error('登录请求失败:', error);
            throw error;
        }
    },

    // 退出登录
    logout: async () => {
        try {
            const response = await fetch(`${API.baseUrl}/admin/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            return await response.json();
        } catch (error) {
            console.error('退出登录失败:', error);
            throw error;
        }
    },

    // 获取统计数据
    getStatistics: async () => {
        if (API.isDev) {
            await mockDelay();
            return {
                code: 0,
                data: MOCK_DATA.statistics,
                msg: '获取成功'
            };
        }
        try {
            const response = await fetch(`${API.baseUrl}/admin/statistics`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            return await response.json();
        } catch (error) {
            console.error('获取统计数据失败:', error);
            throw error;
        }
    },

    // 商家管理相关接口
    merchant: {
        // 商家分页查询
        getList: async (params) => {
            if (API.isDev) {
                return API.getMockData('merchant', params);
            }
            try {
                const query = new URLSearchParams({
                    page: params.page || 1,
                    pageSize: params.pageSize || 10,
                    name: params.name || ''
                }).toString();
                
                const response = await fetch(`${API.baseUrl}/admin/marketer/page?${query}`, {
                    headers: API.getHeaders()
                });
                return await response.json();
            } catch (error) {
                console.error('获取商家列表失败:', error);
                throw error;
            }
        },

        // 新增商家
        add: async (data) => {
            try {
                const response = await fetch(`${API.baseUrl}/admin/marketer`, {
                    method: 'POST',
                    headers: API.getHeaders(),
                    body: JSON.stringify(data)
                });
                return await response.json();
            } catch (error) {
                console.error('新增商家失败:', error);
                throw error;
            }
        },

        // 编辑商家信息
        edit: async (data) => {
            try {
                const response = await fetch(`${API.baseUrl}/admin/marketer`, {
                    method: 'PUT',
                    headers: API.getHeaders(),
                    body: JSON.stringify(data)
                });
                return await response.json();
            } catch (error) {
                console.error('编辑商家失败:', error);
                throw error;
            }
        },

        // 修改商家状态
        updateStatus: async (id, status) => {
            try {
                const response = await fetch(`${API.baseUrl}/admin/marketer/status/${status}?id=${id}`, {
                    method: 'POST',
                    headers: API.getHeaders()
                });
                return await response.json();
            } catch (error) {
                console.error('更新商家状态失败:', error);
                throw error;
            }
        },

        // 根据ID获取商家信息
        getById: async (id) => {
            try {
                const response = await fetch(`${API.baseUrl}/admin/marketer/${id}`, {
                    headers: API.getHeaders()
                });
                return await response.json();
            } catch (error) {
                console.error('获取商家信息失败:', error);
                throw error;
            }
        },

        // 修改密码
        updatePassword: async (data) => {
            try {
                const response = await fetch(`${API.baseUrl}/admin/marketer/editPassword`, {
                    method: 'PUT',
                    headers: API.getHeaders(),
                    body: JSON.stringify(data)
                });
                return await response.json();
            } catch (error) {
                console.error('修改密码失败:', error);
                throw error;
            }
        }
    },

    // 分类管理相关接口
    category: {
        // 分类分页查询
        getList: async (params) => {
            if (API.isDev) {
                return API.getMockData('category', params);
            }
            try {
                const query = new URLSearchParams({
                    page: params.page || 1,
                    pageSize: params.pageSize || 10,
                    name: params.name || ''
                }).toString();
                
                const response = await fetch(`${API.baseUrl}/admin/category/page?${query}`, {
                    headers: API.getHeaders()
                });
                return await response.json();
            } catch (error) {
                console.error('获取分类列表失败:', error);
                throw error;
            }
        },

        // 新增分类
        add: async (data) => {
            try {
                const response = await fetch(`${API.baseUrl}/admin/category`, {
                    method: 'POST',
                    headers: API.getHeaders(),
                    body: JSON.stringify(data)
                });
                return await response.json();
            } catch (error) {
                console.error('新增分类失败:', error);
                throw error;
            }
        },

        // 修改分类
        edit: async (data) => {
            try {
                const response = await fetch(`${API.baseUrl}/admin/category`, {
                    method: 'PUT',
                    headers: API.getHeaders(),
                    body: JSON.stringify(data)
                });
                return await response.json();
            } catch (error) {
                console.error('修改分类失败:', error);
                throw error;
            }
        },

        // 删除分类
        delete: async (id) => {
            try {
                const response = await fetch(`${API.baseUrl}/admin/category?id=${id}`, {
                    method: 'DELETE',
                    headers: API.getHeaders()
                });
                return await response.json();
            } catch (error) {
                console.error('删除分类失败:', error);
                throw error;
            }
        },

        // 修改分类状态
        updateStatus: async (id, status) => {
            try {
                const response = await fetch(`${API.baseUrl}/admin/category/status/${status}?id=${id}`, {
                    method: 'POST',
                    headers: API.getHeaders()
                });
                return await response.json();
            } catch (error) {
                console.error('更新分类状态失败:', error);
                throw error;
            }
        }
    },

    // 商品管理相关接口
    thing: {
        // 商品分页查询
        getList: async (params) => {
            if (API.isDev) {
                return API.getMockData('thing', params);
            }
            try {
                const query = new URLSearchParams({
                    page: params.page || 1,
                    pageSize: params.pageSize || 10,
                    name: params.name || '',
                    categoryId: params.categoryId || '',
                    status: params.status || ''
                }).toString();
                
                const response = await fetch(`${API.baseUrl}/admin/thing/page?${query}`, {
                    headers: API.getHeaders()
                });
                return await response.json();
            } catch (error) {
                console.error('获取商品列表失败:', error);
                throw error;
            }
        },

        // 根据分类获取商品列表
        getListByCategory: async (categoryId) => {
            try {
                const response = await fetch(`${API.baseUrl}/admin/thing/list?categoryId=${categoryId}`, {
                    headers: API.getHeaders()
                });
                return await response.json();
            } catch (error) {
                console.error('获取分类商品列表失败:', error);
                throw error;
            }
        },

        // 获取商品详情
        getById: async (id) => {
            try {
                const response = await fetch(`${API.baseUrl}/admin/thing/${id}`, {
                    headers: API.getHeaders()
                });
                return await response.json();
            } catch (error) {
                console.error('获取商品详情失败:', error);
                throw error;
            }
        },

        // 修改商品状态
        updateStatus: async (id, status) => {
            try {
                const response = await fetch(`${API.baseUrl}/admin/thing/status/${status}?id=${id}`, {
                    method: 'POST',
                    headers: API.getHeaders()
                });
                return await response.json();
            } catch (error) {
                console.error('更新商品状态失败:', error);
                throw error;
            }
        }
    },

    // 订单管理相关接口
    order: {
        // 订单条件搜索
        search: async (params) => {
            if (API.isDev) {
                return API.getMockData('order', params);
            }
            try {
                const query = new URLSearchParams({
                    page: params.page || 1,
                    pageSize: params.pageSize || 10,
                    number: params.number || '',
                    phone: params.phone || '',
                    beginTime: params.beginTime || '',
                    endTime: params.endTime || '',
                    status: params.status || ''
                }).toString();
                
                const response = await fetch(`${API.baseUrl}/admin/order/conditionSearch?${query}`, {
                    headers: API.getHeaders()
                });
                return await response.json();
            } catch (error) {
                console.error('搜索订单失败:', error);
                throw error;
            }
        },

        // 获取订单详情
        getDetails: async (id) => {
            try {
                const response = await fetch(`${API.baseUrl}/admin/order/details/${id}`, {
                    headers: API.getHeaders()
                });
                return await response.json();
            } catch (error) {
                console.error('获取订单详情失败:', error);
                throw error;
            }
        },

        // 取消订单
        cancel: async (data) => {
            try {
                const response = await fetch(`${API.baseUrl}/admin/order/cancel`, {
                    method: 'PUT',
                    headers: API.getHeaders(),
                    body: JSON.stringify(data)
                });
                return await response.json();
            } catch (error) {
                console.error('取消订单失败:', error);
                throw error;
            }
        },

        // 获取订单统计数据
        getStatistics: async () => {
            if (API.isDev) {
                await mockDelay();
                return {
                    code: 0,
                    data: MOCK_DATA.statistics.orderCount,
                    msg: '获取成功'
                };
            }
            try {
                const response = await fetch(`${API.baseUrl}/admin/order/statistics`, {
                    headers: API.getHeaders()
                });
                return await response.json();
            } catch (error) {
                console.error('获取订单统计失败:', error);
                throw error;
            }
        }
    },

    // 新闻管理相关接口
    news: {
        // 新增新闻
        add: async (data) => {
            try {
                const response = await fetch(`${API.baseUrl}/marketer/news`, {
                    method: 'POST',
                    headers: API.getHeaders(),
                    body: JSON.stringify(data)
                });
                return await response.json();
            } catch (error) {
                console.error('新增新闻失败:', error);
                throw error;
            }
        },

        // 修改新闻
        edit: async (data) => {
            try {
                const response = await fetch(`${API.baseUrl}/marketer/news`, {
                    method: 'PUT',
                    headers: API.getHeaders(),
                    body: JSON.stringify(data)
                });
                return await response.json();
            } catch (error) {
                console.error('修改新闻失败:', error);
                throw error;
            }
        },

        // 删除新闻
        delete: async (ids) => {
            try {
                const response = await fetch(`${API.baseUrl}/marketer/news?ids=${ids}`, {
                    method: 'DELETE',
                    headers: API.getHeaders()
                });
                return await response.json();
            } catch (error) {
                console.error('删除新闻失败:', error);
                throw error;
            }
        },

        // 获取新闻详情
        getById: async (id) => {
            try {
                const response = await fetch(`${API.baseUrl}/marketer/news/${id}`, {
                    headers: API.getHeaders()
                });
                return await response.json();
            } catch (error) {
                console.error('获取新闻详情失败:', error);
                throw error;
            }
        },

        // 修改新闻状态
        updateStatus: async (id, status) => {
            try {
                const response = await fetch(`${API.baseUrl}/admin/news/status/${status}?id=${id}`, {
                    method: 'POST',
                    headers: API.getHeaders()
                });
                return await response.json();
            } catch (error) {
                console.error('更新新闻状态失败:', error);
                throw error;
            }
        }
    }
}; 