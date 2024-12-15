class Dashboard {
    constructor() {
        this.init();
    }

    async init() {
        try {
            // 加载统计数据
            await this.loadStatistics();
            // 加载最新订单
            await this.loadLatestOrders();
            // 加载商品和商户统计
            await this.loadProductAndMerchantStatistics();
        } catch (error) {
            console.error('初始化控制台失败:', error);
        }
    }

    // 加载统计数据
    async loadStatistics() {
        try {
            // 调用订单统计接口
            const response = await API.request('/admin/order/statistics', {
                method: 'GET'
            });

            if (response.code === 1 && response.data) {
                // 更新统计数据显示
                document.getElementById('toBeConfirmed').textContent = response.data.toBeConfirmed || 0;
                document.getElementById('confirmed').textContent = response.data.confirmed || 0;
            }
        } catch (error) {
            console.error('加载统计数据失败:', error);
        }
    }

    // 加载商品和商户统计数据
    async loadProductAndMerchantStatistics() {
        try {
            // 获取商品总数
            const productResponse = await API.request('/admin/thing/list', {
                method: 'GET'
            });

            if (productResponse.code === 1 && Array.isArray(productResponse.data)) {
                document.getElementById('totalProducts').textContent = productResponse.data.length;
            }

            // 获取商户总数
            const merchantResponse = await API.request('/admin/marketer/page', {
                method: 'GET',
                params: {
                    page: 2,
                    pageSize: 1
                }
            });

            if (merchantResponse.code === 1 && merchantResponse.data) {
                document.getElementById('totalMerchants').textContent = merchantResponse.data.total || 0;
            }
        } catch (error) {
            console.error('加载商品和商户统计数据失败:', error);
        }
    }

    // 加载最新订单
    async loadLatestOrders() {
        try {
            // 调用订单查询接口
            const response = await API.request('/admin/order/conditionSearch', {
                method: 'GET',
                params: {
                    page: 1,
                    pageSize: 5
                }
            });
            console.log("response.data.records:", response.data.records);
            if (response.code === 1 && response.data) {
                this.renderOrderList(response.data.records);
                console.log("加载订单列表成功:", this.renderOrderList);
            }
        } catch (error) {
            console.error('加载订单列表失败:', error);
            document.getElementById('orderList').innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">加载失败，请刷新重试</td>
                </tr>
            `;
        }
    }

    // 渲染订单列表
    renderOrderList(orders) {
        console.log("orders:", orders);
        const orderList = document.getElementById('orderList');
        if (!orders || orders.length === 0) {
            console.log("orders.length === 0");
            orderList.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">��无订单数据</td>
                </tr>
            `;
            return;
        }
        console.log("orders.length > 0");
        try {
            orderList.innerHTML = orders.map(order => `
                <tr>
                    <td>${order.number}</td>
                    <td>${order.orderThings}</td>
                    <td>￥${order.amount.toFixed(2)}</td>
                    <td>
                        <span class="status-tag ${this.getStatusClass(order.status)}">
                            ${this.getStatusText(order.status)}
                        </span>
                    </td>
                    <td>${this.formatDate(order.orderTime)}</td>
                </tr>
            `).join('');
        } catch (error) {
            console.error('渲染订单列表失败:', error);
        }
    }

    // 获取订单状态样式类
    getStatusClass(status) {
        switch (status) {
            case 1: return 'status-pending';
            case 2: return 'status-confirmed';
            case 3: return 'status-cancelled';
            default: return '';
        }
    }

    // 获取订单状态文本
    getStatusText(status) {
        switch (status) {
            case 1: return '待确认';
            case 2: return '已确认';
            case 3: return '已取消';
            case 4: return '已发货';
            case 5: return '已收货';
            case 6: return '已评价';
            case 7: return '已退款';
            case 8: return '已删除';
            default: return '状态未知';
        }
    }

    // 格式化日期
    formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    }
} 