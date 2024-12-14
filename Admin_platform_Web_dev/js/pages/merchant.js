class MerchantManager {
    constructor() {
        this.currentPage = 1;
        this.pageSize = 10;
        this.total = 0;
        this.searchText = '';
        this.editingId = null;
        
        this.init();
    }

    async init() {
        this.bindEvents();
        await this.loadMerchants();
    }

    bindEvents() {
        // 搜索事件
        document.getElementById('searchBtn').addEventListener('click', () => {
            this.searchText = document.getElementById('searchInput').value.trim();
            this.currentPage = 1;
            this.loadMerchants();
        });

        // 添加商户事件
        document.getElementById('addMerchantBtn').addEventListener('click', () => {
            this.showModal();
        });

        // 模态框事件
        document.getElementById('closeModal').addEventListener('click', () => {
            this.hideModal();
        });

        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.hideModal();
        });

        document.getElementById('saveBtn').addEventListener('click', () => {
            this.saveMerchant();
        });

        // 表单提交事件
        document.getElementById('merchantForm').addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }

    async loadMerchants() {
        try {
            const params = {
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                ...(this.searchText ? { name: this.searchText } : {})
            };

            const response = await API.request('/admin/merchant/conditionSearch', {
                method: 'GET',
                params
            });

            if (response.code === 1) {
                this.total = response.data.total;
                this.renderMerchants(response.data.records);
                this.renderPagination();
            }
        } catch (error) {
            console.error('加载商户列表失败:', error);
            this.showError('加载商户列表失败，请重试');
        }
    }

    renderMerchants(merchants) {
        const tbody = document.getElementById('merchantList');
        if (!merchants || merchants.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center">暂无数据</td></tr>';
            return;
        }

        tbody.innerHTML = merchants.map(merchant => `
            <tr>
                <td>${merchant.id}</td>
                <td>${merchant.merchantName}</td>
                <td>${merchant.contactPerson}</td>
                <td>${merchant.contactPhone}</td>
                <td>
                    <span class="status-tag ${merchant.status === 1 ? 'status-normal' : 'status-disabled'}">
                        ${merchant.status === 1 ? '正常' : '禁用'}
                    </span>
                </td>
                <td>${this.formatDate(merchant.createTime)}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="merchantManager.editMerchant(${merchant.id})">编辑</button>
                    <button class="btn ${merchant.status === 1 ? 'btn-danger' : 'btn-success'} btn-sm" 
                            onclick="merchantManager.toggleStatus(${merchant.id}, ${merchant.status})">
                        ${merchant.status === 1 ? '禁用' : '启用'}
                    </button>
                </td>
            </tr>
        `).join('');
    }

    renderPagination() {
        const totalPages = Math.ceil(this.total / this.pageSize);
        const pagination = document.getElementById('pagination');
        
        let html = '';
        
        // 上一页
        html += `<span class="page-item ${this.currentPage === 1 ? 'disabled' : ''}" 
                      onclick="${this.currentPage > 1 ? 'merchantManager.goToPage(' + (this.currentPage - 1) + ')' : ''}">
                    上一页
                </span>`;
        
        // 页码
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
                html += `<span class="page-item ${i === this.currentPage ? 'active' : ''}" 
                              onclick="merchantManager.goToPage(${i})">
                            ${i}
                        </span>`;
            } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
                html += '<span class="page-item">...</span>';
            }
        }
        
        // 下一页
        html += `<span class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}" 
                      onclick="${this.currentPage < totalPages ? 'merchantManager.goToPage(' + (this.currentPage + 1) + ')' : ''}">
                    下一页
                </span>`;
        
        pagination.innerHTML = html;
    }

    async editMerchant(id) {
        try {
            const response = await API.request(`/admin/merchant/detail/${id}`, {
                method: 'GET'
            });

            if (response.code === 1) {
                this.editingId = id;
                this.showModal(response.data);
            }
        } catch (error) {
            console.error('获取商户信息失败:', error);
            this.showError('获取商户信息失败，请重试');
        }
    }

    async toggleStatus(id, currentStatus) {
        try {
            const response = await API.request(`/admin/merchant/updateStatus`, {
                method: 'POST',
                body: JSON.stringify({
                    id,
                    status: currentStatus === 1 ? 0 : 1
                })
            });

            if (response.code === 1) {
                this.showSuccess('状态修改成功');
                await this.loadMerchants();
            }
        } catch (error) {
            console.error('修改状态失败:', error);
            this.showError('修改状态失败，请重试');
        }
    }

    async saveMerchant() {
        const form = document.getElementById('merchantForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            const url = this.editingId ? 
                `/admin/merchant/update` : 
                '/admin/merchant/add';
            
            const response = await API.request(url, {
                method: 'POST',
                body: JSON.stringify({
                    ...data,
                    ...(this.editingId ? { id: this.editingId } : {})
                })
            });

            if (response.code === 1) {
                this.showSuccess(this.editingId ? '修改成功' : '添加成功');
                this.hideModal();
                await this.loadMerchants();
            }
        } catch (error) {
            console.error('保存商户失败:', error);
            this.showError('保存失败，请重试');
        }
    }

    showModal(data = null) {
        const modal = document.getElementById('merchantModal');
        const title = document.getElementById('modalTitle');
        const form = document.getElementById('merchantForm');
        
        title.textContent = data ? '编辑商户' : '添加商户';
        
        if (data) {
            form.merchantName.value = data.merchantName;
            form.contactPerson.value = data.contactPerson;
            form.contactPhone.value = data.contactPhone;
            form.status.value = data.status;
            form.password.value = ''; // 编辑时不显示密码
        } else {
            form.reset();
            form.status.value = '1'; // 默认状态为正常
        }
        
        modal.style.display = 'block';
    }

    hideModal() {
        const modal = document.getElementById('merchantModal');
        modal.style.display = 'none';
        this.editingId = null;
    }

    goToPage(page) {
        this.currentPage = page;
        this.loadMerchants();
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

// 初始化商户管理器
let merchantManager = null;
document.addEventListener('DOMContentLoaded', () => {
    merchantManager = new MerchantManager();
}); 