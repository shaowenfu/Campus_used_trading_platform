class CommentManager {
    constructor() {
        this.currentPage = 1;
        this.pageSize = 10;
        this.total = 0;
        this.searchText = '';
        this.statusFilter = '';
        this.currentComment = null;
        
        this.init();
    }

    async init() {
        this.bindEvents();
        await this.loadComments();
    }

    bindEvents() {
        // 搜索事件
        document.getElementById('searchBtn').addEventListener('click', () => {
            this.searchText = document.getElementById('searchInput').value.trim();
            this.currentPage = 1;
            this.loadComments();
        });

        // 状态筛选事件
        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.statusFilter = e.target.value;
            this.currentPage = 1;
            this.loadComments();
        });

        // 模态框事件
        document.getElementById('closeModal').addEventListener('click', () => {
            this.hideModal();
        });
    }

    async loadComments() {
        try {
            const params = {
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                ...(this.searchText ? { productName: this.searchText } : {}),
                ...(this.statusFilter ? { status: this.statusFilter } : {})
            };

            const response = await API.request('/admin/comment/conditionSearch', {
                method: 'GET',
                params
            });

            if (response.code === 1) {
                this.total = response.data.total;
                this.renderComments(response.data.records);
                this.renderPagination();
            }
        } catch (error) {
            console.error('加载评论列表失败:', error);
            this.showError('加载评论列表失败，请重试');
        }
    }

    renderComments(comments) {
        const tbody = document.getElementById('commentList');
        if (!comments || comments.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="text-center">暂无数据</td></tr>';
            return;
        }

        tbody.innerHTML = comments.map(comment => `
            <tr>
                <td>${comment.id}</td>
                <td>${comment.productName}</td>
                <td>
                    <span class="rating">${comment.rating}</span>
                </td>
                <td class="content-column" title="${comment.content}">${comment.content}</td>
                <td>${comment.userName}</td>
                <td>
                    <span class="status-tag ${comment.status === 1 ? 'status-approved' : 'status-pending'}">
                        ${comment.status === 1 ? '已审核' : '待审核'}
                    </span>
                </td>
                <td>${this.formatDate(comment.createTime)}</td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-primary btn-sm" onclick="commentManager.viewComment(${comment.id})">查看</button>
                        ${this.renderActionButton(comment)}
                    </div>
                </td>
            </tr>
        `).join('');
    }

    renderActionButton(comment) {
        if (comment.status === 0) {
            return `
                <button class="btn btn-success btn-sm" onclick="commentManager.approveComment(${comment.id})">通过</button>
                <button class="btn btn-danger btn-sm" onclick="commentManager.rejectComment(${comment.id})">拒绝</button>
            `;
        }
        return '';
    }

    async viewComment(id) {
        try {
            const response = await API.request(`/admin/comment/detail/${id}`, {
                method: 'GET'
            });

            if (response.code === 1) {
                this.currentComment = response.data;
                this.showCommentDetail(response.data);
            }
        } catch (error) {
            console.error('获取评论详情失败:', error);
            this.showError('获取评论详情失败，请重试');
        }
    }

    showCommentDetail(comment) {
        // 填充评论信息
        document.getElementById('productName').textContent = comment.productName;
        document.getElementById('rating').textContent = comment.rating;
        document.getElementById('content').textContent = comment.content;
        document.getElementById('userName').textContent = comment.userName;
        document.getElementById('createTime').textContent = this.formatDate(comment.createTime);
        document.getElementById('status').textContent = comment.status === 1 ? '已审核' : '待审核';

        // 渲染底部按钮
        const modalFooter = document.getElementById('modalFooter');
        modalFooter.innerHTML = `
            <button class="btn btn-default" onclick="commentManager.hideModal()">关闭</button>
            ${this.renderActionButton(comment)}
        `;

        // 显示模态框
        document.getElementById('commentModal').style.display = 'block';
    }

    async approveComment(id) {
        if (!confirm('确定要通过这条评论吗？')) return;
        await this.updateCommentStatus(id, 1);
    }

    async rejectComment(id) {
        if (!confirm('确定要拒绝这条评论吗？')) return;
        await this.updateCommentStatus(id, 2);
    }

    async updateCommentStatus(id, status) {
        try {
            const response = await API.request('/admin/comment/updateStatus', {
                method: 'POST',
                body: JSON.stringify({
                    id,
                    status
                })
            });

            if (response.code === 1) {
                this.showSuccess('评论状态更新成功');
                this.hideModal();
                await this.loadComments();
            }
        } catch (error) {
            console.error('更新评论状态失败:', error);
            this.showError('更新评论状态失败，请重试');
        }
    }

    hideModal() {
        document.getElementById('commentModal').style.display = 'none';
        this.currentComment = null;
    }

    renderPagination() {
        const totalPages = Math.ceil(this.total / this.pageSize);
        const pagination = document.getElementById('pagination');
        
        let html = '';
        
        // 上一页
        html += `<span class="page-item ${this.currentPage === 1 ? 'disabled' : ''}" 
                      onclick="${this.currentPage > 1 ? 'commentManager.goToPage(' + (this.currentPage - 1) + ')' : ''}">
                    上一页
                </span>`;
        
        // 页码
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
                html += `<span class="page-item ${i === this.currentPage ? 'active' : ''}" 
                              onclick="commentManager.goToPage(${i})">
                            ${i}
                        </span>`;
            } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
                html += '<span class="page-item">...</span>';
            }
        }
        
        // 下一页
        html += `<span class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}" 
                      onclick="${this.currentPage < totalPages ? 'commentManager.goToPage(' + (this.currentPage + 1) + ')' : ''}">
                    下一页
                </span>`;
        
        pagination.innerHTML = html;
    }

    goToPage(page) {
        this.currentPage = page;
        this.loadComments();
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

// 初始化评论管理器
let commentManager = null;
document.addEventListener('DOMContentLoaded', () => {
    commentManager = new CommentManager();
}); 