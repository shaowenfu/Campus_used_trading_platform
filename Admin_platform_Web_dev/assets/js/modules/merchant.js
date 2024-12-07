// 商家管理模块
class MerchantManager {
    constructor() {
        this.currentPage = 1;
        this.pageSize = 10;
        this.total = 0;
        this.searchName = '';
        
        this.init();
    }

    init() {
        // 初始化事件监听
        this.bindEvents();
        // 加载商家列表
        this.loadMerchantList();
    }

    bindEvents() {
        // 搜索按钮点击事件
        document.querySelector('#merchant .search-btn').addEventListener('click', () => {
            this.searchName = document.getElementById('merchantSearch').value;
            this.currentPage = 1;
            this.loadMerchantList();
        });

        // 新增商家按钮点击事件
        document.getElementById('addMerchant').addEventListener('click', () => {
            this.showMerchantModal();
        });

        // 模态框关闭按钮
        document.querySelectorAll('.modal .close, .modal .btn-cancel').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.closest('.modal').style.display = 'none';
            });
        });

        // 商家表单提交
        document.querySelector('#merchantModal .btn-submit').addEventListener('click', () => {
            this.saveMerchant();
        });

        // 密码表单提交
        document.querySelector('#passwordModal .btn-submit').addEventListener('click', () => {
            this.updatePassword();
        });

        // 点击模态框外部关闭
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
    }

    async loadMerchantList() {
        try {
            const result = await API.merchant.getList({
                page: this.currentPage,
                pageSize: this.pageSize,
                name: this.searchName
            });

            if (result.code === 0 && result.data) {
                this.total = result.data.total;
                this.renderMerchantTable(result.data.records);
                this.renderPagination();
            } else {
                throw new Error(result.msg || '获取商家列表失败');
            }
        } catch (error) {
            console.error('加载商家列表失败:', error);
            alert('加载商家列表失败，请重试');
        }
    }

    renderMerchantTable(merchants) {
        const table = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>用户名</th>
                        <th>姓名</th>
                        <th>手机号</th>
                        <th>状态</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    ${merchants.map(merchant => `
                        <tr>
                            <td>${merchant.id}</td>
                            <td>${merchant.username}</td>
                            <td>${merchant.name}</td>
                            <td>${merchant.phone}</td>
                            <td>
                                <span class="status-tag ${merchant.status === 1 ? 'status-active' : 'status-inactive'}">
                                    ${merchant.status === 1 ? '启用' : '禁用'}
                                </span>
                            </td>
                            <td>${merchant.createTime}</td>
                            <td>
                                <button class="action-btn btn-edit" onclick="merchantManager.editMerchant(${merchant.id})">编辑</button>
                                <button class="action-btn ${merchant.status === 1 ? 'btn-delete' : 'btn-edit'}"
                                    onclick="merchantManager.toggleStatus(${merchant.id}, ${merchant.status === 1 ? 0 : 1})">
                                    ${merchant.status === 1 ? '禁用' : '启用'}
                                </button>
                                <button class="action-btn btn-edit" onclick="merchantManager.resetPassword(${merchant.id})">重置密码</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        document.getElementById('merchantTable').innerHTML = table;
    }

    renderPagination() {
        const totalPages = Math.ceil(this.total / this.pageSize);
        let paginationHtml = '';

        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += `
                <button class="${this.currentPage === i ? 'active' : ''}"
                    onclick="merchantManager.goToPage(${i})">
                    ${i}
                </button>
            `;
        }

        document.getElementById('merchantPagination').innerHTML = paginationHtml;
    }

    async toggleStatus(id, status) {
        try {
            const result = await API.merchant.updateStatus(id, status);
            if (result.code === 0) {
                alert(status === 1 ? '商家已启用' : '商家已禁用');
                this.loadMerchantList();
            } else {
                throw new Error(result.msg || '操作失败');
            }
        } catch (error) {
            console.error('更新商家状态失败:', error);
            alert('操作失败，请重试');
        }
    }

    goToPage(page) {
        this.currentPage = page;
        this.loadMerchantList();
    }

    showMerchantModal(id = null) {
        const modal = document.getElementById('merchantModal');
        const form = document.getElementById('merchantForm');
        const title = document.getElementById('merchantModalTitle');
        
        // 重置表单
        form.reset();
        document.getElementById('merchantId').value = '';
        
        if (id) {
            title.textContent = '编辑商家';
            this.loadMerchantData(id);
        } else {
            title.textContent = '新增商家';
        }
        
        modal.style.display = 'block';
    }

    async loadMerchantData(id) {
        try {
            const result = await API.merchant.getById(id);
            if (result.code === 0 && result.data) {
                const merchant = result.data;
                document.getElementById('merchantId').value = merchant.id;
                document.getElementById('username').value = merchant.username;
                document.getElementById('name').value = merchant.name;
                document.getElementById('phone').value = merchant.phone;
                document.getElementById('idNumber').value = merchant.idNumber;
            } else {
                throw new Error(result.msg || '获取商家信息失败');
            }
        } catch (error) {
            console.error('加载商家信息失败:', error);
            alert('加载商家信息失败，请重试');
            this.closeMerchantModal();
        }
    }

    async saveMerchant() {
        const form = document.getElementById('merchantForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = {
            username: document.getElementById('username').value,
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            idNumber: document.getElementById('idNumber').value
        };

        const id = document.getElementById('merchantId').value;
        if (id) {
            formData.id = id;
        }

        try {
            const result = await (id ? API.merchant.edit(formData) : API.merchant.add(formData));
            if (result.code === 0) {
                alert(id ? '编辑成功' : '添加成功');
                this.closeMerchantModal();
                this.loadMerchantList();
            } else {
                throw new Error(result.msg || '操作失败');
            }
        } catch (error) {
            console.error('保存商家失败:', error);
            alert('操作失败，请重试');
        }
    }

    showPasswordModal(id) {
        const modal = document.getElementById('passwordModal');
        document.getElementById('passwordMerchantId').value = id;
        document.getElementById('passwordForm').reset();
        modal.style.display = 'block';
    }

    async updatePassword() {
        const form = document.getElementById('passwordForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const data = {
            empId: document.getElementById('passwordMerchantId').value,
            oldPassword: document.getElementById('oldPassword').value,
            newPassword: document.getElementById('newPassword').value
        };

        try {
            const result = await API.merchant.updatePassword(data);
            if (result.code === 0) {
                alert('密码修改成功');
                this.closePasswordModal();
            } else {
                throw new Error(result.msg || '修改密码失败');
            }
        } catch (error) {
            console.error('修改密码失败:', error);
            alert('修改密码失败，请重试');
        }
    }

    closeMerchantModal() {
        document.getElementById('merchantModal').style.display = 'none';
    }

    closePasswordModal() {
        document.getElementById('passwordModal').style.display = 'none';
    }

    // ... 其他方法实现
}

// 创建商家管理实例
const merchantManager = new MerchantManager(); 