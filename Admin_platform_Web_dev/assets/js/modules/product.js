// 商品管理模块
class ProductManager {
    constructor() {
        this.currentPage = 1;
        this.pageSize = 10;
        this.total = 0;
        this.searchName = '';
        this.categoryId = '';
        this.status = '';
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadCategoryOptions();
        this.loadProductList();
    }

    bindEvents() {
        // 搜索按钮点击事件
        document.querySelector('#product .search-btn').addEventListener('click', () => {
            this.searchName = document.getElementById('productSearch').value;
            this.categoryId = document.getElementById('categoryFilter').value;
            this.currentPage = 1;
            this.loadProductList();
        });

        // 分类筛选变化事件
        document.getElementById('categoryFilter').addEventListener('change', () => {
            this.categoryId = document.getElementById('categoryFilter').value;
            this.currentPage = 1;
            this.loadProductList();
        });
    }

    async loadCategoryOptions() {
        try {
            const result = await API.category.getList({ pageSize: 100 });
            if (result.code === 1 && result.data) {
                const options = result.data.records.map(category => `
                    <option value="${category.id}">${category.name}</option>
                `).join('');
                document.getElementById('categoryFilter').innerHTML = 
                    '<option value="">全部分类</option>' + options;
            }
        } catch (error) {
            console.error('加载分类选项失败:', error);
        }
    }

    async loadProductList() {
        try {
            const result = await API.thing.getList({
                page: this.currentPage,
                pageSize: this.pageSize,
                name: this.searchName,
                categoryId: this.categoryId,
                status: this.status
            });

            if (result.code === 1 && result.data) {
                this.total = result.data.total;
                this.renderProductTable(result.data.records);
                this.renderPagination();
            } else {
                throw new Error(result.msg || '获取商品列表失败');
            }
        } catch (error) {
            console.error('加载商品列表失败:', error);
            alert('加载商品列表失败，请重试');
        }
    }

    renderProductTable(products) {
        const table = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>商品图片</th>
                        <th>商品名称</th>
                        <th>分类</th>
                        <th>价格</th>
                        <th>状态</th>
                        <th>更新时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    ${products.map(product => `
                        <tr>
                            <td>${product.id}</td>
                            <td>
                                <img src="${product.image}" alt="${product.name}" class="product-image">
                            </td>
                            <td>${product.name}</td>
                            <td>${product.categoryName}</td>
                            <td>￥${product.price}</td>
                            <td>
                                <span class="status-tag ${product.status === 1 ? 'status-active' : 'status-inactive'}">
                                    ${product.status === 1 ? '在售' : '下架'}
                                </span>
                            </td>
                            <td>${product.updateTime}</td>
                            <td>
                                <button class="action-btn ${product.status === 1 ? 'btn-delete' : 'btn-edit'}"
                                    onclick="productManager.toggleStatus(${product.id}, ${product.status === 1 ? 0 : 1})">
                                    ${product.status === 1 ? '下架' : '上架'}
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        document.getElementById('productTable').innerHTML = table;
    }

    renderPagination() {
        const totalPages = Math.ceil(this.total / this.pageSize);
        let paginationHtml = '';

        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += `
                <button class="${this.currentPage === i ? 'active' : ''}"
                    onclick="productManager.goToPage(${i})">
                    ${i}
                </button>
            `;
        }

        document.getElementById('productPagination').innerHTML = paginationHtml;
    }

    async toggleStatus(id, status) {
        try {
            const result = await API.thing.updateStatus(id, status);
            if (result.code === 1) {
                alert(status === 1 ? '商品已上架' : '商品已下架');
                this.loadProductList();
            } else {
                throw new Error(result.msg || '操作失败');
            }
        } catch (error) {
            console.error('更新商品状态失败:', error);
            alert('操作失败，请重试');
        }
    }

    goToPage(page) {
        this.currentPage = page;
        this.loadProductList();
    }
}

// 创建商品管理实例
const productManager = new ProductManager(); 