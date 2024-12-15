class NewsManager {
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
        await this.loadNews();
    }

    bindEvents() {
        // 搜索事件
        document.getElementById('searchBtn').addEventListener('click', () => {
            this.searchText = document.getElementById('searchInput').value.trim();
            this.currentPage = 1;
            this.loadNews();
        });

        // 添加新闻事件
        document.getElementById('addNewsBtn').addEventListener('click', () => {
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
            this.saveNews();
        });

        // 表单提交事件
        document.getElementById('newsForm').addEventListener('submit', (e) => {
            e.preventDefault();
        });

        // 图片上传事件
        document.getElementById('imageFile').addEventListener('change', (e) => {
            this.handleImageUpload(e.target.files[0]);
        });
    }

    async loadNews() {
        try {
            const response = await API.request('/admin/news/page', {
                method: 'GET',
                params: {
                    page: this.currentPage,
                    pageSize: this.pageSize,
                    details: this.searchText,
                    status: ''
                }
            });

            if (response.code === 1) {
                this.total = response.data.total;
                this.renderNews(response.data.records);
                this.renderPagination();
            }
        } catch (error) {
            console.error('加载新闻列表失败:', error);
            this.showError('加载新闻列表失败，请重试');
        }
    }

    renderNews(newsList) {
        const tbody = document.getElementById('newsList');
        if (!newsList || newsList.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center">暂无数据</td></tr>';
            return;
        }

        tbody.innerHTML = newsList.map(news => `
            <tr>
                <td>${news.id}</td>
                <td class="title-column" title="${news.detail}">
                    <img src="${news.image}" alt="新闻图片" class="news-image" style="width:50px;height:50px;object-fit:cover;">
                    ${news.detail}
                </td>
                <td class="summary-column">${news.sort}</td>
                <td>
                    <span class="status-tag ${news.status === 1 ? 'status-published' : 'status-draft'}">
                        ${news.status === 1 ? '已发布' : '草稿'}
                    </span>
                </td>
                <td>${this.formatDate(new Date())}</td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-primary btn-sm" onclick="newsManager.editNews(${news.id})">编辑</button>
                        <button class="btn ${news.status === 1 ? 'btn-warning' : 'btn-success'} btn-sm" 
                                onclick="newsManager.toggleStatus(${news.id}, ${news.status})">
                            ${news.status === 1 ? '撤回' : '发布'}
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="newsManager.deleteNews(${news.id})">删除</button>
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
                      onclick="${this.currentPage > 1 ? 'newsManager.goToPage(' + (this.currentPage - 1) + ')' : ''}">
                    上一页
                </span>`;
        
        // 页码
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
                html += `<span class="page-item ${i === this.currentPage ? 'active' : ''}" 
                              onclick="newsManager.goToPage(${i})">
                            ${i}
                        </span>`;
            } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
                html += '<span class="page-item">...</span>';
            }
        }
        
        // 下一页
        html += `<span class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}" 
                      onclick="${this.currentPage < totalPages ? 'newsManager.goToPage(' + (this.currentPage + 1) + ')' : ''}">
                    下一页
                </span>`;
        
        pagination.innerHTML = html;
    }

    async editNews(id) {
        try {
            const response = await API.request(`/admin/news/list/${id}`, {
                method: 'GET'
            });

            if (response.code === 1) {
                this.editingId = id;
                this.showModal(response.data);
            }
        } catch (error) {
            console.error('编辑新闻信息失败:', error);
            this.showError('编辑新闻信息失败，请重试');
        }
    }

    showModal(data = null) {
        const modal = document.getElementById('newsModal');
        const title = document.getElementById('modalTitle');
        const form = document.getElementById('newsForm');
        const preview = document.getElementById('imagePreview');
        
        title.textContent = data ? '编辑新闻' : '发布新闻';
        
        if (data) {
            form.detail.value = data.detail;
            form.sort.value = data.sort || 0;
            form.status.value = data.status;
            if (data.image) {
                form.image.value = data.image;
                preview.style.backgroundImage = `url(${data.image})`;
            }
        } else {
            form.reset();
            form.status.value = '0'; // 默认状态为草稿
            form.sort.value = '0'; // 默认排序为0
            preview.style.backgroundImage = '';
        }
        
        modal.style.display = 'block';
    }

    async toggleStatus(id, currentStatus) {
        try {
            const response = await API.request(`/admin/news/updateStatus`, {
                method: 'POST',
                body: JSON.stringify({
                    id,
                    status: currentStatus === 1 ? 0 : 1
                })
            });

            if (response.code === 1) {
                this.showSuccess(currentStatus === 1 ? '新闻已撤回' : '新闻已发布');
                await this.loadNews();
            }
        } catch (error) {
            console.error('修改状态失败:', error);
            this.showError('修改状态失败，请重试');
        }
    }

    async deleteNews(id) {
        if (!confirm('确定要删除这条新闻吗？')) {
            return;
        }

        try {
            const response = await API.request(`/admin/news`, {
                method: 'DELETE',
                params: { id }
            });

            if (response.code === 1) {
                this.showSuccess('删除成功');
                await this.loadNews();
            }
        } catch (error) {
            console.error('删除新闻失败:', error);
            this.showError('删除失败，请重试');
        }
    }

    async saveNews() {
        const form = document.getElementById('newsForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            if (this.editingId) {
                // 编辑新闻
                const response = await API.request(`/admin/news/${this.editingId}`, {
                    method: 'PUT',
                    params: {
                        detail: data.detail,
                        id: this.editingId
                    }
                });

                if (response.code === 1) {
                    this.showSuccess('修改成功');
                    this.hideModal();
                    await this.loadNews();
                }
            } else {
                // 添加新闻
                const response = await API.request('/admin/news/save', {
                    method: 'POST',
                    params: {
                        detail: data.detail,
                        image: data.image,
                        sort: parseInt(data.sort) || 0,
                        status: parseInt(data.status)
                    }
                });

                if (response.code === 1) {
                    this.showSuccess('添加成功');
                    this.hideModal();
                    await this.loadNews();
                }
            }
        } catch (error) {
            console.error('保存新闻失败:', error);
            this.showError('保存失败，请重试');
        }
    }

    hideModal() {
        const modal = document.getElementById('newsModal');
        modal.style.display = 'none';
        this.editingId = null;
    }

    goToPage(page) {
        this.currentPage = page;
        this.loadNews();
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

    async handleImageUpload(file) {
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await API.request('/admin/upload/image', {
                method: 'POST',
                body: formData,
                headers: {} // 让浏览器自动设置Content-Type
            });

            if (response.code === 1) {
                document.getElementById('image').value = response.data;
                document.getElementById('imagePreview').style.backgroundImage = `url(${response.data})`;
            }
        } catch (error) {
            console.error('上传图片失败:', error);
            this.showError('上传图片失败，请重试');
        }
    }
}

// 初始化新闻管理器
let newsManager = null;
// 移除这个事件监听，因为现在由 index.js 负责初始化
// document.addEventListener('DOMContentLoaded', () => {
//     newsManager = new NewsManager();
// }); 