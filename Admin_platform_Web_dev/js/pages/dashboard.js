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

            if (response.code === 0 && response.data) {
                // 更新统计数据显示
                document.getElementById('toBeConfirmed').textContent = response.data.toBeConfirmed || 0;
                document.getElementById('confirmed').textContent = response.data.confirmed || 0;
            }
        } catch (error) {
            console.error('加载统计数据失败:', error);
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

            if (response.code === 0 && response.data) {
                this.renderOrderList(response.data.records);
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
        const orderList = document.getElementById('orderList');
        if (!orders || orders.length === 0) {
            orderList.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">暂无订单数据</td>
                </tr>
            `;
            return;
        }

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
            default: return '未知状态';
        }
    }

    // 格式化日期
    formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    }
} 