class OrderManager {
    constructor() {
        this.currentPage = 1;
        this.pageSize = 10;
        this.total = 0;
        this.searchText = '';
        this.statusFilter = '';
        this.currentOrder = null;
        
        this.init();
    }

    async init() {
        this.bindEvents();
        await this.loadOrders();
    }

    bindEvents() {
        // 搜索事件
        document.getElementById('searchBtn').addEventListener('click', () => {
            this.searchText = document.getElementById('searchInput').value.trim();
            this.currentPage = 1;
            this.loadOrders();
        });

        // 状态筛选事件
        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.statusFilter = e.target.value;
            this.currentPage = 1;
            this.loadOrders();
        });

        // 模态框事件
        document.getElementById('closeModal').addEventListener('click', () => {
            this.hideModal();
        });
    }

    async loadOrders() {
        try {
            const params = {
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                ...(this.searchText ? { orderNo: this.searchText } : {}),
                ...(this.statusFilter ? { status: this.statusFilter } : {})
            };

            const response = await API.request('/admin/order/conditionSearch', {
                method: 'GET',
                params
            });

            if (response.code === 1) {
                this.total = response.data.total;
                this.renderOrders(response.data.records);
                this.renderPagination();
            }
        } catch (error) {
            console.error('加载订单列表失败:', error);
            this.showError('加载订单列表失败，请重试');
        }
    }

    renderOrders(orders) {
        const tbody = document.getElementById('orderList');
        if (!orders || orders.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center">暂无数据</td></tr>';
            return;
        }

        tbody.innerHTML = orders.map(order => `
            <tr>
                <td>${order.orderNo}</td>
                <td>${order.merchantName}</td>
                <td class="amount">￥${order.amount.toFixed(2)}</td>
                <td>
                    <span class="status-tag ${this.getStatusClass(order.status)}">
                        ${this.getStatusText(order.status)}
                    </span>
                </td>
                <td>${this.formatDate(order.createTime)}</td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-primary btn-sm" onclick="orderManager.viewOrder('${order.orderNo}')">查看</button>
                        ${this.renderActionButton(order)}
                    </div>
                </td>
            </tr>
        `).join('');
    }

    renderActionButton(order) {
        switch (order.status) {
            case 1: // 待确认
                return `
                    <button class="btn btn-success btn-sm" onclick="orderManager.confirmOrder('${order.orderNo}')">确认</button>
                    <button class="btn btn-danger btn-sm" onclick="orderManager.cancelOrder('${order.orderNo}')">取消</button>
                `;
            case 2: // 已确认
                return `<button class="btn btn-success btn-sm" onclick="orderManager.completeOrder('${order.orderNo}')">完成</button>`;
            default:
                return '';
        }
    }

    async viewOrder(orderNo) {
        try {
            const response = await API.request(`/admin/order/detail/${orderNo}`, {
                method: 'GET'
            });

            if (response.code === 1) {
                this.currentOrder = response.data;
                this.showOrderDetail(response.data);
            }
        } catch (error) {
            console.error('获取订单详情失败:', error);
            this.showError('获取订单详情失败，请重试');
        }
    }

    showOrderDetail(order) {
        // 填充基本信息
        document.getElementById('orderNo').textContent = order.orderNo;
        document.getElementById('merchantName').textContent = order.merchantName;
        document.getElementById('amount').textContent = `￥${order.amount.toFixed(2)}`;
        document.getElementById('status').textContent = this.getStatusText(order.status);
        document.getElementById('createTime').textContent = this.formatDate(order.createTime);

        // 填充商品列表
        const productList = document.getElementById('productList');
        productList.innerHTML = order.products.map(product => `
            <tr>
                <td>${product.productName}</td>
                <td>￥${product.price.toFixed(2)}</td>
                <td>${product.quantity}</td>
                <td>￥${(product.price * product.quantity).toFixed(2)}</td>
            </tr>
        `).join('');

        // 渲染底部按钮
        const modalFooter = document.getElementById('modalFooter');
        modalFooter.innerHTML = `
            <button class="btn btn-default" onclick="orderManager.hideModal()">关闭</button>
            ${this.renderActionButton(order)}
        `;

        // 显示模态框
        document.getElementById('orderModal').style.display = 'block';
    }

    async confirmOrder(orderNo) {
        if (!confirm('确定要确认这个订单吗？')) return;
        await this.updateOrderStatus(orderNo, 2);
    }

    async completeOrder(orderNo) {
        if (!confirm('确定要完成这个订单吗？')) return;
        await this.updateOrderStatus(orderNo, 3);
    }

    async cancelOrder(orderNo) {
        if (!confirm('确定要取消这个订单吗？')) return;
        await this.updateOrderStatus(orderNo, 4);
    }

    async updateOrderStatus(orderNo, status) {
        try {
            const response = await API.request('/admin/order/updateStatus', {
                method: 'POST',
                body: JSON.stringify({
                    orderNo,
                    status
                })
            });

            if (response.code === 1) {
                this.showSuccess('订单状态更新成功');
                this.hideModal();
                await this.loadOrders();
            }
        } catch (error) {
            console.error('更新订���状态失败:', error);
            this.showError('更新订单状态失败，请重试');
        }
    }

    getStatusText(status) {
        const statusMap = {
            1: '待确认',
            2: '已确认',
            3: '已完成',
            4: '已取消'
        };
        return statusMap[status] || '未知状态';
    }

    getStatusClass(status) {
        const classMap = {
            1: 'status-pending',
            2: 'status-confirmed',
            3: 'status-completed',
            4: 'status-cancelled'
        };
        return classMap[status] || '';
    }

    hideModal() {
        document.getElementById('orderModal').style.display = 'none';
        this.currentOrder = null;
    }

    renderPagination() {
        const totalPages = Math.ceil(this.total / this.pageSize);
        const pagination = document.getElementById('pagination');
        
        let html = '';
        
        // 上一页
        html += `<span class="page-item ${this.currentPage === 1 ? 'disabled' : ''}" 
                      onclick="${this.currentPage > 1 ? 'orderManager.goToPage(' + (this.currentPage - 1) + ')' : ''}">
                    上一页
                </span>`;
        
        // 页码
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
                html += `<span class="page-item ${i === this.currentPage ? 'active' : ''}" 
                              onclick="orderManager.goToPage(${i})">
                            ${i}
                        </span>`;
            } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
                html += '<span class="page-item">...</span>';
            }
        }
        
        // 下一页
        html += `<span class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}" 
                      onclick="${this.currentPage < totalPages ? 'orderManager.goToPage(' + (this.currentPage + 1) + ')' : ''}">
                    下一页
                </span>`;
        
        pagination.innerHTML = html;
    }

    goToPage(page) {
        this.currentPage = page;
        this.loadOrders();
    }

    formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    }

    showSuccess(message) {
        // TODO: 实现成功提示
        alert(message);
    }

    showError(message) {
        // TODO: 实现错误提示
        alert(message);
    }
}

// 初始化订单管理器
let orderManager = null;
document.addEventListener('DOMContentLoaded', () => {
    orderManager = new OrderManager();
}); 