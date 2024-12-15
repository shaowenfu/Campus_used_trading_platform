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
                page: this.currentPage,
                pageSize: this.pageSize,
                ...(this.searchText ? { name: this.searchText } : {})
            };

            const response = await API.request('/admin/marketer/page', {
                method: 'GET',
                params
            });
            
            console.log("response.data:", response.data);
            console.log("response.data.records:", response.data.records);
            if (response.code === 1 && response.data) {
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
                <td>${merchant.name}</td>
                <td>${merchant.phone || '-'}</td>
                <td>${merchant.idNumber || '-'}</td>
                <td>${this.getAuthorityText(merchant.authority)}</td>
                <td>
                    <span class="status-tag ${merchant.status === 1 ? 'status-normal' : 'status-disabled'}">
                        ${merchant.status === 1 ? '正常' : '禁用'}
                    </span>
                </td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-primary btn-sm" onclick="merchantManager.editMerchant(${merchant.id})">编辑</button>
                        <button class="btn ${merchant.status === 1 ? 'btn-danger' : 'btn-success'} btn-sm" 
                                onclick="merchantManager.toggleStatus(${merchant.id}, ${merchant.status})">
                            ${merchant.status === 1 ? '禁用' : '启用'}
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // 获取权限等级文本
    getAuthorityText(authority) {
        switch (authority) {
            case 1: return '普通商户';
            case 2: return '高级商户';
            case 3: return '特级商户';
            default: return '未知权限';
        }
    }

    async editMerchant(id) {
        try {
            const response = await API.request(`/admin/marketer/${id}`, {
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
            // 构建新的状态值（1变0，0变1）
            const newStatus = currentStatus === 1 ? 0 : 1;
            
            const response = await API.request(`/admin/marketer/status/${newStatus}`, {
                method: 'POST',
                params: { id }, // 使用params传递id参数
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.code === 1) {
                this.showSuccess(`商户已${newStatus === 1 ? '启用' : '禁用'}`);
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
        
        // 构建请求数据
        const data = {
            name: formData.get('merchantName'),
            username: formData.get('username'),
            phone: formData.get('phone'),
            idNumber: formData.get('idNumber'),
            ...(this.editingId ? { id: this.editingId } : {}),
            ...(formData.get('password') ? { password: formData.get('password') } : {})
        };
        
        try {
            if (this.editingId) {
                // 编辑商户 - 使用PUT请求
                const response = await API.request('/admin/marketer', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.code === 1) {
                    this.showSuccess('修改成功');
                    this.hideModal();
                    await this.loadMerchants();
                }
            } else {
                // 添加商户 - 使用POST请求
                const response = await API.request('/admin/marketer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.code === 1) {
                    this.showSuccess('添加成功');
                    this.hideModal();
                    await this.loadMerchants();
                }
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
            form.merchantName.value = data.name;
            form.phone.value = data.phone || '';
            form.idNumber.value = data.idNumber || '';
            form.username.value = data.username || '';
            form.status.value = data.status;
            form.authority.value = data.authority;
            form.password.value = ''; // 编辑时不显示密码
        } else {
            form.reset();
            form.status.value = '1'; // 默认状态为正常
            form.authority.value = '1'; // 默认权限为普通商户
        }
        
        modal.style.display = 'block';
    }

    hideModal() {
        const modal = document.getElementById('merchantModal');
        modal.style.display = 'none';
        this.editingId = null;
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
        alert(message);
    }

    showError(message) {
        alert(message);
    }
}

// 初始化商户管理器
let merchantManager = null;
document.addEventListener('DOMContentLoaded', () => {
    merchantManager = new MerchantManager();
}); 