class CategoryManager {
    constructor() {
        this.currentPage = 1;
        this.pageSize = 10;
        this.total = 0;
        this.searchText = '';
        this.editingId = null;
        this.categories = []; // 添加分类数据缓存
        
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
            const response = await API.request('/admin/category', {
                method: 'GET'
            });
            
            console.log("分类列表响应:", response);
            if (response.code === 1) {
                // 保存所有分类数据
                this.categories = response.data;
                // 直接使用返回的数组数据
                this.total = this.categories.length;
                // 手动进行分页处理
                const start = (this.currentPage - 1) * this.pageSize;
                const end = start + this.pageSize;
                const pageData = this.categories.slice(start, end);
                
                // 如果有搜索文本，进行过滤
                const filteredData = this.searchText ? 
                    pageData.filter(item => 
                        item.name.toLowerCase().includes(this.searchText.toLowerCase())
                    ) : pageData;

                this.renderCategories(filteredData);
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
            tbody.innerHTML = '<tr><td colspan="7" class="text-center">暂无数据</td></tr>';
            return;
        }

        tbody.innerHTML = categories.map(category => `
            <tr>
                <td class="category-sort">${category.sort}</td>
                <td>${category.name}</td>
                <td class="user-id">${category.createUser || '-'}</td>
                <td class="user-id">${category.updateUser || '-'}</td>
                <td>
                    <span class="status-tag ${category.status === 1 ? 'status-normal' : 'status-disabled'}">
                        ${category.status === 1 ? '正常' : '禁用'}
                    </span>
                </td>
                <td>${this.formatDate(category.createTime)}</td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-primary btn-sm" onclick="categoryManager.editCategory(${category.sort})">编辑</button>
                        <button class="btn ${category.status === 1 ? 'btn-danger' : 'btn-success'} btn-sm" 
                                onclick="categoryManager.toggleStatus(${category.sort}, ${category.status})">
                            ${category.status === 1 ? '禁用' : '启用'}
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="categoryManager.deleteCategory(${category.sort})">删除</button>
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

    async editCategory(sort) {
        // 从缓存中查找分类数据
        const category = this.categories.find(item => item.sort === sort);
        if (category) {
            this.editingId = category.id;  // 使用category.id而不是sort
            console.log("设置编辑ID:", this.editingId);
            this.showModal(category);
        } else {
            this.showError('未找到分类信息');
        }
    }

    async toggleStatus(sort, currentStatus) {
        try {
            // 构建新的状态值（1变0，0变1）
            const newStatus = currentStatus === 1 ? 0 : 1;
            
            const response = await API.request(`/admin/category/status/${newStatus}`, {
                method: 'POST',
                params: { id: sort }, // 使用params传递id参数
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.code === 1) {
                this.showSuccess(`分类已${newStatus === 1 ? '启用' : '禁用'}`);
                // 更新本地缓存中的状态
                const category = this.categories.find(item => item.sort === sort);
                if (category) {
                    category.status = newStatus;
                }
                // 重新渲染当前页面的数据
                const start = (this.currentPage - 1) * this.pageSize;
                const end = start + this.pageSize;
                const pageData = this.categories.slice(start, end);
                
                // 如果有搜索文本，进行过滤
                const filteredData = this.searchText ? 
                    pageData.filter(item => 
                        item.name.toLowerCase().includes(this.searchText.toLowerCase())
                    ) : pageData;

                this.renderCategories(filteredData);
            }
        } catch (error) {
            console.error('修改状态失败:', error);
            this.showError('修改状态失败，请重试');
        }
    }

    async deleteCategory(sort) {
        if (!confirm('确定要删除这个分类吗？')) {
            return;
        }

        try {
            // 从缓存中找到对应的分类获取其ID
            const category = this.categories.find(item => item.sort === sort);
            if (!category) {
                this.showError('未找到分类信息');
                return;
            }

            console.log('删除分类，ID:', category.id);
            const response = await API.request(`/admin/category`, {
                method: 'DELETE',
                params: { id: category.id }
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
        
        try {
            if (this.editingId) {
                console.log("编辑分类，ID:", this.editingId);
                // 编辑分类 - 使用PUT请求
                const data = {
                    id: this.editingId,  // 使用保存的分类ID
                    name: formData.get('categoryName'),
                    sort: parseInt(formData.get('sort')) || 0
                };

                console.log('发送编辑分类请求，数据：', data);
                
                const response = await API.request('/admin/category', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.code === 1) {
                    this.showSuccess('修改成功');
                    this.hideModal();
                    await this.loadCategories();
                }
            } else {
                console.log("添加分类");
                // 添加分类 - 使用POST请求
                const data = {
                    name: formData.get('categoryName'),
                    sort: parseInt(formData.get('sort')) || 0
                };
                
                console.log('发送添加分类请求，数据：', data);

                const response = await API.request('/admin/category/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.code === 1) {
                    this.showSuccess('添加成功');
                    this.hideModal();
                    await this.loadCategories();
                }
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
            form.categoryName.value = data.name;
            form.sort.value = data.sort || 0;
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