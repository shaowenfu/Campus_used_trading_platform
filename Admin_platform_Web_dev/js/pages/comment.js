class CommentManager {
    constructor() {
        this.currentPage = 1;
        this.pageSize = 10;
        this.total = 0;
        this.searchText = '';
        this.statusFilter = '';
        this.currentComment = null;
        this.commentList = [];
        
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

            const response = await API.request('/admin/remark/list', {
                method: 'GET',
                params
            });
            
            if (response.code === 1) {
                this.commentList = response.data;
                this.renderComments(response.data);
                this.renderPagination();
            }
        } catch (error) {
            console.error('加载评论列表失败:', error);
            this.showError('加载评论列表失败，请重试');
        }
    }

    renderComments(comments) {
        const tbody = document.getElementById('commentList');
        console.log('comments', comments);
        if (!comments || comments.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center">暂无数据</td></tr>';
            return;
        }

        tbody.innerHTML = comments.map(comment => `
            <tr>
                <td>${comment.id}</td>
                <td>${comment.detail}</td>
                <td>${comment.marketerUsername}</td>
                <td>${comment.userUsername}</td>
                <td>${this.formatDate(comment.date)}</td>
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

    viewComment(id) {
        const comment = this.commentList.find(item => item.id === id);
        if (comment) {
            this.currentComment = comment;
            this.showCommentDetail(comment);
        } else {
            this.showError('未找到评论详情');
        }
    }

    showCommentDetail(comment) {
        // 填充评论信息
        document.getElementById('userName').textContent = comment.userUsername || '-';
        document.getElementById('content').textContent = comment.detail || '-';
        document.getElementById('createTime').textContent = this.formatDate(comment.date) || '-';
        document.getElementById('status').textContent = this.getStatusText(comment.status);

        // 渲染操作按钮
        const actionButtons = document.getElementById('actionButtons');
        actionButtons.innerHTML = this.renderActionButton(comment);

        // 显示模态框
        document.getElementById('commentModal').style.display = 'block';
    }

    getStatusText(status) {
        const statusMap = {
            0: '待审核',
            1: '已通过',
            2: '已拒绝'
        };
        return statusMap[status] || '未知状态';
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
        return `${dateStr[0]}-${String(dateStr[1]).padStart(2, '0')}-${String(dateStr[2]).padStart(2, '0')} ${String(dateStr[3]).padStart(2, '0')}:${String(dateStr[4]).padStart(2, '0')}`;
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