class CategoryManager {
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
        await this.loadCategories();
    }

    bindEvents() {
        // 搜索事件
        document.getElementById('searchBtn').addEventListener('click', () => {
            this.searchText = document.getElementById('searchInput').value.trim();
            this.currentPage = 1;
            this.loadCategories();
        });

        // 添加分类事件
        document.getElementById('addCategoryBtn').addEventListener('click', () => {
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
            this.saveCategory();
        });

        // 表单提交事件
        document.getElementById('categoryForm').addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }

    async loadCategories() {
        try {
            const params = {
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                ...(this.searchText ? { name: this.searchText } : {})
            };

            const response = await API.request('/admin/category/conditionSearch', {
                method: 'GET',
                params
            });

            if (response.code === 1) {
                this.total = response.data.total;
                this.renderCategories(response.data.records);
                this.renderPagination();
            }
        } catch (error) {
            console.error('加载分类列表失败:', error);
            this.showError('加载分类列表失败，请重试');
        }
    }

    renderCategories(categories) {
        const tbody = document.getElementById('categoryList');
        if (!categories || categories.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center">暂无数据</td></tr>';
            return;
        }

        tbody.innerHTML = categories.map(category => `
            <tr>
                <td>${category.id}</td>
                <td>${category.categoryName}</td>
                <td class="sort-column">${category.sort}</td>
                <td>
                    <span class="status-tag ${category.status === 1 ? 'status-normal' : 'status-disabled'}">
                        ${category.status === 1 ? '正常' : '禁用'}
                    </span>
                </td>
                <td>${this.formatDate(category.createTime)}</td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-primary btn-sm" onclick="categoryManager.editCategory(${category.id})">编辑</button>
                        <button class="btn ${category.status === 1 ? 'btn-danger' : 'btn-success'} btn-sm" 
                                onclick="categoryManager.toggleStatus(${category.id}, ${category.status})">
                            ${category.status === 1 ? '禁用' : '启用'}
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="categoryManager.deleteCategory(${category.id})">删除</button>
                    </div>
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
                      onclick="${this.currentPage > 1 ? 'categoryManager.goToPage(' + (this.currentPage - 1) + ')' : ''}">
                    上一页
                </span>`;
        
        // 页码
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
                html += `<span class="page-item ${i === this.currentPage ? 'active' : ''}" 
                              onclick="categoryManager.goToPage(${i})">
                            ${i}
                        </span>`;
            } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
                html += '<span class="page-item">...</span>';
            }
        }
        
        // 下一页
        html += `<span class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}" 
                      onclick="${this.currentPage < totalPages ? 'categoryManager.goToPage(' + (this.currentPage + 1) + ')' : ''}">
                    下一页
                </span>`;
        
        pagination.innerHTML = html;
    }

    async editCategory(id) {
        try {
            const response = await API.request(`/admin/category/detail/${id}`, {
                method: 'GET'
            });

            if (response.code === 1) {
                this.editingId = id;
                this.showModal(response.data);
            }
        } catch (error) {
            console.error('获取分类信息失败:', error);
            this.showError('获取分类信息失败，请重试');
        }
    }

    async toggleStatus(id, currentStatus) {
        try {
            const response = await API.request(`/admin/category/updateStatus`, {
                method: 'POST',
                body: JSON.stringify({
                    id,
                    status: currentStatus === 1 ? 0 : 1
                })
            });

            if (response.code === 1) {
                this.showSuccess('状态修改成功');
                await this.loadCategories();
            }
        } catch (error) {
            console.error('修改状态失败:', error);
            this.showError('修改状态失败，请重试');
        }
    }

    async deleteCategory(id) {
        if (!confirm('确定要删除这个分类吗？')) {
            return;
        }

        try {
            const response = await API.request(`/admin/category/delete/${id}`, {
                method: 'POST'
            });

            if (response.code === 1) {
                this.showSuccess('删除成功');
                await this.loadCategories();
            }
        } catch (error) {
            console.error('删除分类失败:', error);
            this.showError('删除失败，请重试');
        }
    }

    async saveCategory() {
        const form = document.getElementById('categoryForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            const url = this.editingId ? 
                `/admin/category/update` : 
                '/admin/category/add';
            
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
                await this.loadCategories();
            }
        } catch (error) {
            console.error('保存分类失败:', error);
            this.showError('保存失败，请重试');
        }
    }

    showModal(data = null) {
        const modal = document.getElementById('categoryModal');
        const title = document.getElementById('modalTitle');
        const form = document.getElementById('categoryForm');
        
        title.textContent = data ? '编辑分类' : '添加分类';
        
        if (data) {
            form.categoryName.value = data.categoryName;
            form.sort.value = data.sort;
            form.status.value = data.status;
        } else {
            form.reset();
            form.status.value = '1'; // 默认状态为正常
            form.sort.value = '0'; // 默认排序为0
        }
        
        modal.style.display = 'block';
    }

    hideModal() {
        const modal = document.getElementById('categoryModal');
        modal.style.display = 'none';
        this.editingId = null;
    }

    goToPage(page) {
        this.currentPage = page;
        this.loadCategories();
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

// 初始化分类管理器
let categoryManager = null;
document.addEventListener('DOMContentLoaded', () => {
    categoryManager = new CategoryManager();
}); 