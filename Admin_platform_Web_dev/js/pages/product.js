class ProductManager {
    constructor() {
        this.currentPage = 1;
        this.pageSize = 10;
        this.total = 0;
        this.searchText = '';
        this.categoryFilter = '';
        this.editingId = null;
        this.categories = [
            { id: 1, categoryName: '手机数码' },
            { id: 2, categoryName: '家用电器' },
            { id: 3, categoryName: '家具家居' },
            { id: 4, categoryName: '电脑办公' },
            { id: 5, categoryName: '图书音像' },
            { id: 6, categoryName: '服装配饰' },
            { id: 7, categoryName: '运动户外' },
            { id: 8, categoryName: '其他' }
        ];
        
        this.init();
    }

    async init() {
        this.bindEvents();
        this.renderCategoryOptions();
        await this.loadProducts();
    }

    renderCategoryOptions() {
        const filterSelect = document.getElementById('categoryFilter');
        const modalSelect = document.getElementById('categoryId');
        
        const options = this.categories.map(category => 
            `<option value="${category.id}">${category.categoryName}</option>`
        ).join('');
        
        filterSelect.innerHTML = '<option value="">全部分类</option>' + options;
        modalSelect.innerHTML = '<option value="">请选择分类</option>' + options;
    }

    bindEvents() {
        // 搜索事件
        document.getElementById('searchBtn').addEventListener('click', () => {
            this.searchText = document.getElementById('searchInput').value.trim();
            this.currentPage = 1;
            this.loadProducts();
        });

        // 分类筛选事件
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.categoryFilter = e.target.value;
            this.currentPage = 1;
            this.loadProducts();
        });

        // 添加商品事件
        document.getElementById('addProductBtn').addEventListener('click', () => {
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
            this.saveProduct();
        });

        // 图片上传事件
        document.getElementById('imageFile').addEventListener('change', (e) => {
            this.handleImageUpload(e.target.files[0]);
        });

        // 表单提交事件
        document.getElementById('productForm').addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }

    async loadProducts() {
        try {
            const params = {
                page: this.currentPage,
                pageSize: this.pageSize,
                ...(this.searchText ? { name: this.searchText } : {}),
                ...(this.categoryFilter ? { categoryId: this.categoryFilter } : {})
            };

            const response = await API.request('/admin/thing/page', {
                method: 'GET',
                params
            });

            if (response.code === 1) {
                this.total = response.data.total;
                this.renderProducts(response.data.records);
                this.renderPagination();
            }
        } catch (error) {
            console.error('加载商品列表失败:', error);
            this.showError('加载商品列表失败，请重试');
        }
    }

    renderProducts(products) {
        const tbody = document.getElementById('productList');
        if (!products || products.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="text-center">暂无数据</td></tr>';
            return;
        }

        tbody.innerHTML = products.map(product => `
            <tr>
                <td>${product.id}</td>
                <td>
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                </td>
                <td>${product.name}</td>
                <td>${this.getCategoryName(product.categoryId)}</td>
                <td class="price">￥${product.price.toFixed(2)}</td>
                <td class="${this.getStockClass(product.amount)}">${product.amount}</td>
                <td>
                    <span class="status-tag ${product.status === 1 ? 'status-online' : 'status-offline'}">
                        ${product.status === 1 ? '已上架' : '已下架'}
                    </span>
                </td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-primary btn-sm" onclick="productManager.editProduct(${product.id})">编辑</button>
                        <button class="btn ${product.status === 1 ? 'btn-warning' : 'btn-success'} btn-sm" 
                                onclick="productManager.toggleStatus(${product.id}, ${product.status})">
                            ${product.status === 1 ? '下架' : '上架'}
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="productManager.deleteProduct(${product.id})">删除</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    getCategoryName(categoryId) {
        const category = this.categories.find(c => c.id === parseInt(categoryId));
        return category ? category.categoryName : '未知分类';
    }

    getStockClass(amount) {
        if (amount <= 0) return 'stock-danger';
        if (amount <= 10) return 'stock-warning';
        return '';
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
                document.getElementById('imageUrl').value = response.data;
                document.getElementById('imagePreview').style.backgroundImage = `url(${response.data})`;
            }
        } catch (error) {
            console.error('上传图片失败:', error);
            this.showError('上传图片失败，请重试');
        }
    }

    async editProduct(id) {
        try {
            const response = await API.request(`/admin/thing/${id}`, {
                method: 'GET'
            });

            if (response.code === 1) {
                this.editingId = id;
                this.showModal(response.data);
            }
        } catch (error) {
            console.error('获取商品详情失败:', error);
            this.showError('获取商品详情失败，请重试');
        }
    }

    async toggleStatus(id, currentStatus) {
        const action = currentStatus === 1 ? '下架' : '上架';
        if (!confirm(`确定要${action}这个商品吗？`)) return;

        try {
            const response = await API.request('/admin/product/updateStatus', {
                method: 'POST',
                body: JSON.stringify({
                    id,
                    status: currentStatus === 1 ? 0 : 1
                })
            });

            if (response.code === 1) {
                this.showSuccess(`${action}成功`);
                await this.loadProducts();
            }
        } catch (error) {
            console.error('更新商品状态失败:', error);
            this.showError('更新商品状态失败，请重试');
        }
    }

    async deleteProduct(id) {
        if (!confirm('确定要删除这个商品吗？')) return;

        try {
            const response = await API.request(`/admin/product/delete/${id}`, {
                method: 'POST'
            });

            if (response.code === 1) {
                this.showSuccess('删除成功');
                await this.loadProducts();
            }
        } catch (error) {
            console.error('删除商品失败:', error);
            this.showError('删除商品失败，请重试');
        }
    }

    async saveProduct() {
        const form = document.getElementById('productForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // 验证必填字段
        if (!data.name || !data.categoryId || !data.price || !data.stock || !data.description) {
            this.showError('请填写所有必填字段');
            return;
        }

        // // 验证图片
        // if (!this.editingId && !data.imageUrl) {
        //     this.showError('请上传商品图片');
        //     return;
        // }

        try {
            const url = this.editingId ? 
                `/admin/thing/update` : 
                '/admin/thing/add';
            
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
                await this.loadProducts();
            }
        } catch (error) {
            console.error('保存商品失败:', error);
            this.showError('保存失败，请重试');
        }
    }

    showModal(data = null) {
        const modal = document.getElementById('productModal');
        const title = document.getElementById('modalTitle');
        const form = document.getElementById('productForm');
        const preview = document.getElementById('imagePreview');
        
        title.textContent = data ? '编辑商品' : '添加商品';
        
        if (data) {
            form.name.value = data.name;
            // 根据categoryId设置正确的分类选项
            const categorySelect = form.categoryId;
            const categoryOption = Array.from(categorySelect.options).find(
                option => option.value === data.categoryId.toString()
            );
            
            if (categoryOption) {
                categorySelect.value = data.categoryId;
            } else {
                // 如果在现有选项中找不到对应的分类，添加一个新选项
                const category = this.categories.find(c => c.id === parseInt(data.categoryId));
                if (category) {
                    const newOption = new Option(category.categoryName, category.id);
                    categorySelect.add(newOption);
                    categorySelect.value = category.id;
                } else {
                    console.warn(`未找到分类ID ${data.categoryId} 对应的分类信息`);
                    categorySelect.value = ""; // 设置为默认选项
                }
            }

            form.imageUrl.value = data.image || '';
            form.price.value = data.price;
            form.stock.value = data.amount;
            form.description.value = data.description;
            form.status.value = data.status;
            preview.style.backgroundImage = data.image ? `url(${data.image})` : '';
        } else {
            form.reset();
            form.status.value = '1'; // 默认状态为上架
            preview.style.backgroundImage = '';
        }
        
        modal.style.display = 'block';
    }

    hideModal() {
        const modal = document.getElementById('productModal');
        modal.style.display = 'none';
        this.editingId = null;
    }

    renderPagination() {
        const totalPages = Math.ceil(this.total / this.pageSize);
        const pagination = document.getElementById('pagination');
        
        let html = '';
        
        // 上一页
        html += `<span class="page-item ${this.currentPage === 1 ? 'disabled' : ''}" 
                      onclick="${this.currentPage > 1 ? 'productManager.goToPage(' + (this.currentPage - 1) + ')' : ''}">
                    上一页
                </span>`;
        
        // 页码
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
                html += `<span class="page-item ${i === this.currentPage ? 'active' : ''}" 
                              onclick="productManager.goToPage(${i})">
                            ${i}
                        </span>`;
            } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
                html += '<span class="page-item">...</span>';
            }
        }
        
        // 下一页
        html += `<span class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}" 
                      onclick="${this.currentPage < totalPages ? 'productManager.goToPage(' + (this.currentPage + 1) + ')' : ''}">
                    下一页
                </span>`;
        
        pagination.innerHTML = html;
    }

    goToPage(page) {
        this.currentPage = page;
        this.loadProducts();
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

// 初始化商品管理器
let productManager = null;
// 移除 DOMContentLoaded 事件监听
// document.addEventListener('DOMContentLoaded', () => {
//     productManager = new ProductManager();
// }); 