// 新闻管理模块
class NewsManager {
    constructor() {
        this.currentPage = 1;
        this.pageSize = 10;
        this.total = 0;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadNewsList();
    }

    bindEvents() {
        // 新增新闻按钮点击事件
        document.getElementById('addNews').addEventListener('click', () => {
            this.showNewsModal();
        });

        // 模态框关闭按钮
        document.querySelectorAll('#newsModal .close, #newsModal .btn-cancel').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeNewsModal();
            });
        });

        // 新闻表单提交
        document.querySelector('#newsModal .btn-submit').addEventListener('click', () => {
            this.saveNews();
        });
    }

    async loadNewsList() {
        try {
            const result = await API.news.getList({
                page: this.currentPage,
                pageSize: this.pageSize
            });

            if (result.code === 1 && result.data) {
                this.total = result.data.total;
                this.renderNewsTable(result.data.records);
                this.renderPagination();
            } else {
                throw new Error(result.msg || '获取新闻列表失败');
            }
        } catch (error) {
            console.error('加载新闻列表失败:', error);
            alert('加载新闻列表失败，请重试');
        }
    }

    renderNewsTable(newsList) {
        const table = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>内容</th>
                        <th>排序</th>
                        <th>状态</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    ${newsList.map(news => `
                        <tr>
                            <td>${news.id}</td>
                            <td>${news.detail}</td>
                            <td>${news.sort}</td>
                            <td>
                                <span class="status-tag ${news.status === 1 ? 'status-active' : 'status-inactive'}">
                                    ${news.status === 1 ? '启用' : '禁用'}
                                </span>
                            </td>
                            <td>${news.createTime}</td>
                            <td>
                                <button class="action-btn btn-edit" onclick="newsManager.editNews(${news.id})">
                                    编辑
                                </button>
                                <button class="action-btn ${news.status === 1 ? 'btn-delete' : 'btn-edit'}"
                                    onclick="newsManager.toggleStatus(${news.id}, ${news.status === 1 ? 0 : 1})">
                                    ${news.status === 1 ? '禁用' : '启用'}
                                </button>
                                <button class="action-btn btn-delete" onclick="newsManager.deleteNews(${news.id})">
                                    删除
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        document.getElementById('newsTable').innerHTML = table;
    }

    renderPagination() {
        const totalPages = Math.ceil(this.total / this.pageSize);
        let paginationHtml = '';

        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += `
                <button class="${this.currentPage === i ? 'active' : ''}"
                    onclick="newsManager.goToPage(${i})">
                    ${i}
                </button>
            `;
        }

        document.getElementById('newsPagination').innerHTML = paginationHtml;
    }

    showNewsModal(id = null) {
        const modal = document.getElementById('newsModal');
        const form = document.getElementById('newsForm');
        const title = document.getElementById('newsModalTitle');
        
        form.reset();
        document.getElementById('newsId').value = '';
        
        if (id) {
            title.textContent = '编辑新闻';
            this.loadNewsData(id);
        } else {
            title.textContent = '发布新闻';
        }
        
        modal.style.display = 'block';
    }

    async loadNewsData(id) {
        try {
            const result = await API.news.getById(id);
            if (result.code === 1 && result.data) {
                const news = result.data;
                document.getElementById('newsId').value = news.id;
                document.getElementById('newsDetail').value = news.detail;
                document.getElementById('newsSort').value = news.sort;
            } else {
                throw new Error(result.msg || '获取新闻信息失败');
            }
        } catch (error) {
            console.error('加载新闻信息失败:', error);
            alert('加载新闻信息失败，请重试');
            this.closeNewsModal();
        }
    }

    async saveNews() {
        const form = document.getElementById('newsForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = {
            detail: document.getElementById('newsDetail').value,
            sort: document.getElementById('newsSort').value
        };

        const id = document.getElementById('newsId').value;
        if (id) {
            formData.id = id;
        }

        try {
            const result = await (id ? API.news.edit(formData) : API.news.add(formData));
            if (result.code === 1) {
                alert(id ? '编辑成功' : '发布成功');
                this.closeNewsModal();
                this.loadNewsList();
            } else {
                throw new Error(result.msg || '操作失败');
            }
        } catch (error) {
            console.error('保存新闻失败:', error);
            alert('操作失败，请重试');
        }
    }

    async toggleStatus(id, status) {
        try {
            const result = await API.news.updateStatus(id, status);
            if (result.code === 1) {
                alert(status === 1 ? '新闻已启用' : '新闻已禁用');
                this.loadNewsList();
            } else {
                throw new Error(result.msg || '操作失败');
            }
        } catch (error) {
            console.error('更新新闻状态失败:', error);
            alert('操作失败，请重试');
        }
    }

    async deleteNews(id) {
        if (!confirm('确定要删除这条新闻吗？')) {
            return;
        }

        try {
            const result = await API.news.delete(id);
            if (result.code === 1) {
                alert('删除成功');
                this.loadNewsList();
            } else {
                throw new Error(result.msg || '删除失败');
            }
        } catch (error) {
            console.error('删除新闻失败:', error);
            alert('删除失败，请重试');
        }
    }

    closeNewsModal() {
        document.getElementById('newsModal').style.display = 'none';
    }

    goToPage(page) {
        this.currentPage = page;
        this.loadNewsList();
    }
}

// 创建新闻管理实例
const newsManager = new NewsManager(); 