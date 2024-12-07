// 订单管理模块
class OrderManager {
    constructor() {
        this.currentPage = 1;
        this.pageSize = 10;
        this.total = 0;
        this.searchParams = {
            number: '',
            phone: '',
            beginTime: '',
            endTime: '',
            status: ''
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.initStatusOptions();
        this.loadOrderList();
        this.loadOrderStatistics();
    }

    bindEvents() {
        // 搜索按钮点击事件
        document.querySelector('#order .search-btn').addEventListener('click', () => {
            this.searchParams = {
                number: document.getElementById('orderSearch').value,
                phone: document.getElementById('orderSearch').value, // 同一个输入框支持订单号和手机号搜索
                beginTime: document.getElementById('startDate').value,
                endTime: document.getElementById('endDate').value,
                status: document.getElementById('orderStatus').value
            };
            this.currentPage = 1;
            this.loadOrderList();
        });

        // 日期选择联动
        document.getElementById('startDate').addEventListener('change', (e) => {
            document.getElementById('endDate').min = e.target.value;
        });
        document.getElementById('endDate').addEventListener('change', (e) => {
            document.getElementById('startDate').max = e.target.value;
        });
    }

    initStatusOptions() {
        const statusOptions = [
            { value: '', text: '全部状态' },
            { value: '1', text: '待付款' },
            { value: '2', text: '待发货' },
            { value: '3', text: '已发货' },
            { value: '4', text: '已完成' },
            { value: '5', text: '已取消' }
        ];

        const options = statusOptions.map(status => 
            `<option value="${status.value}">${status.text}</option>`
        ).join('');
        document.getElementById('orderStatus').innerHTML = options;
    }

    async loadOrderList() {
        try {
            const result = await API.order.search({
                page: this.currentPage,
                pageSize: this.pageSize,
                ...this.searchParams
            });

            if (result.code === 0 && result.data) {
                this.total = result.data.total;
                this.renderOrderTable(result.data.records);
                this.renderPagination();
            } else {
                throw new Error(result.msg || '获取订单列表失败');
            }
        } catch (error) {
            console.error('加载订单列表失败:', error);
            alert('加载订单列表失败，请重试');
        }
    }

    async loadOrderStatistics() {
        try {
            const result = await API.order.getStatistics();
            if (result.code === 0 && result.data) {
                // 更新概览页的订单统计数据
                const orderStats = document.querySelector('#overview .stat-card:nth-child(3) .number');
                if (orderStats) {
                    orderStats.textContent = result.data.deliveryInProgress || 0;
                }
            }
        } catch (error) {
            console.error('加载订单统计失败:', error);
        }
    }

    renderOrderTable(orders) {
        const table = `
            <table>
                <thead>
                    <tr>
                        <th>订单号</th>
                        <th>下单时间</th>
                        <th>用户信息</th>
                        <th>订单金额</th>
                        <th>订单状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    ${orders.map(order => `
                        <tr>
                            <td>${order.number}</td>
                            <td>${order.orderTime}</td>
                            <td>
                                <div>${order.consignee}</div>
                                <div>${order.phone}</div>
                            </td>
                            <td class="price">￥${order.amount}</td>
                            <td>
                                <span class="status-tag ${this.getStatusClass(order.status)}">
                                    ${this.getStatusText(order.status)}
                                </span>
                            </td>
                            <td>
                                <button class="action-btn btn-edit" 
                                    onclick="orderManager.showOrderDetails('${order.id}')">
                                    查看详情
                                </button>
                                ${order.status !== 5 ? `
                                    <button class="action-btn btn-delete" 
                                        onclick="orderManager.showCancelModal('${order.id}')">
                                        取消订单
                                    </button>
                                ` : ''}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        document.getElementById('orderTable').innerHTML = table;
    }

    getStatusClass(status) {
        const statusClasses = {
            1: 'status-pending',
            2: 'status-pending',
            3: 'status-active',
            4: 'status-active',
            5: 'status-inactive'
        };
        return statusClasses[status] || 'status-pending';
    }

    getStatusText(status) {
        const statusTexts = {
            1: '待付款',
            2: '待发货',
            3: '已发货',
            4: '已完成',
            5: '已取消'
        };
        return statusTexts[status] || '未知状态';
    }

    async showOrderDetails(id) {
        try {
            const result = await API.order.getDetails(id);
            if (result.code === 0 && result.data) {
                this.renderOrderDetailsModal(result.data);
            } else {
                throw new Error(result.msg || '获取订单详情失败');
            }
        } catch (error) {
            console.error('加载订单详情失败:', error);
            alert('加载订单详情失败，请重试');
        }
    }

    renderOrderDetailsModal(order) {
        // 这里需要在 dashboard.html 中添加订单详情模态框
        const modal = document.getElementById('orderDetailsModal');
        modal.querySelector('.modal-body').innerHTML = `
            <div class="order-details">
                <h4>订单信息</h4>
                <div class="info-group">
                    <p><span>订单号：</span>${order.number}</p>
                    <p><span>下单时间：</span>${order.orderTime}</p>
                    <p><span>订单状态：</span>${this.getStatusText(order.status)}</p>
                    <p><span>订单金额：</span>￥${order.amount}</p>
                </div>
                
                <h4>收货信息</h4>
                <div class="info-group">
                    <p><span>收货人：</span>${order.consignee}</p>
                    <p><span>联系电话：</span>${order.phone}</p>
                    <p><span>收货地址：</span>${order.address}</p>
                </div>

                <h4>商品信息</h4>
                <div class="order-items">
                    ${order.orderDetailList.map(item => `
                        <div class="order-item">
                            <img src="${item.image}" alt="${item.name}" class="product-image">
                            <div class="item-info">
                                <div class="item-name">${item.name}</div>
                                <div class="item-price">￥${item.amount}</div>
                                <div class="item-quantity">x${item.number}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        modal.style.display = 'block';
    }

    renderPagination() {
        const totalPages = Math.ceil(this.total / this.pageSize);
        let paginationHtml = '';

        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += `
                <button class="${this.currentPage === i ? 'active' : ''}"
                    onclick="orderManager.goToPage(${i})">
                    ${i}
                </button>
            `;
        }

        document.getElementById('orderPagination').innerHTML = paginationHtml;
    }

    goToPage(page) {
        this.currentPage = page;
        this.loadOrderList();
    }

    showCancelModal(orderId) {
        const modal = document.getElementById('orderCancelModal');
        document.getElementById('cancelOrderId').value = orderId;
        modal.style.display = 'block';
    }

    async cancelOrder() {
        const orderId = document.getElementById('cancelOrderId').value;
        const reason = document.getElementById('cancelReason').value;

        if (!reason.trim()) {
            alert('请输入取消原因');
            return;
        }

        try {
            const result = await API.order.cancel({
                id: orderId,
                cancelReason: reason
            });

            if (result.code === 0) {
                alert('订单已取消');
                this.closeCancelModal();
                this.loadOrderList();
                this.loadOrderStatistics();
            } else {
                throw new Error(result.msg || '取消订单失败');
            }
        } catch (error) {
            console.error('取消订单失败:', error);
            alert('取消订单失败，请重试');
        }
    }

    closeCancelModal() {
        document.getElementById('orderCancelModal').style.display = 'none';
        document.getElementById('cancelReason').value = '';
    }
}

// 创建订单管理实例
const orderManager = new OrderManager(); 