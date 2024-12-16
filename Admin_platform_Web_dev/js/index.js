// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 检查登录状态
    if (!Auth.checkLogin()) return;

    // 初始化用户信息
    initUserInfo();
    
    // 初始化导航事件
    initNavigation();
    
    // 加载默认页面
    loadPage('dashboard');
});

// 初始化用户信息
function initUserInfo() {
    const userInfo = Auth.getUserInfo();
    if (userInfo) {
        document.getElementById('userName').textContent = userInfo.name;
    }
    
    // 绑定退出登录事件
    document.getElementById('logoutBtn').addEventListener('click', Auth.logout);
}

// 初始化导航事件
function initNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // 移除其他菜单项的激活状态
            menuItems.forEach(i => i.classList.remove('active'));
            // 添加当前菜单项的激活状态
            item.classList.add('active');
            // 加载对应页面
            loadPage(item.dataset.page);
        });
    });
}

// 加载页面内容
async function loadPage(pageName) {
    const pageContainer = document.getElementById('pageContainer');
    // 创建DOMParser实例
    const parser = new DOMParser();
    
    try {
        // 根据页面名称加载对应模块
        switch(pageName) {
            case 'dashboard':
                // 加载控制台页面
                const response = await fetch('/pages/dashboard.html');
                const html = await response.text();
                
                // 解析HTML内容
                const doc = parser.parseFromString(html, 'text/html');
                const bodyContent = doc.querySelector('.dashboard-container');
                
                if (!bodyContent) {
                    throw new Error('无法加载页面内容');
                }
                
                pageContainer.innerHTML = bodyContent.outerHTML;
                
                // 确保dashboard.css已加载
                if (!document.querySelector('link[href="/css/dashboard.css"]')) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = '/css/dashboard.css';
                    document.head.appendChild(link);
                }
                
                // 加载并执行控制台逻辑
                const scriptExists = document.querySelector('script[src="/js/pages/dashboard.js"]');
                if (!scriptExists) {
                    const script = document.createElement('script');
                    script.src = '/js/pages/dashboard.js';
                    script.onload = () => {
                        new Dashboard();
                    };
                    document.body.appendChild(script);
                } else {
                    // 如果脚本已存在，直接初始化Dashboard
                    try {
                        new Dashboard();
                    } catch (error) {
                        console.error('初始化Dashboard失败:', error);
                    }
                }
                break;
                
            case 'merchant':
                // 加载商户管理页面
                const merchantResponse = await fetch('/pages/merchant.html');
                const merchantHtml = await merchantResponse.text();
                
                // 解析HTML内容
                const merchantDoc = parser.parseFromString(merchantHtml, 'text/html');
                const merchantContent = merchantDoc.querySelector('.merchant-container');
                
                if (!merchantContent) {
                    throw new Error('无法加载商户管理页面内容');
                }
                
                pageContainer.innerHTML = merchantContent.outerHTML;
                
                // 确保merchant.css已加载
                if (!document.querySelector('link[href="/css/merchant.css"]')) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = '/css/merchant.css';
                    document.head.appendChild(link);
                }
                
                // 加载并执行商户管理逻辑
                const merchantScriptExists = document.querySelector('script[src="/js/pages/merchant.js"]');
                if (!merchantScriptExists) {
                    const script = document.createElement('script');
                    script.src = '/js/pages/merchant.js';
                    script.onload = () => {
                        // 确保在脚本加载完成后初始化
                        merchantManager = new MerchantManager();
                    };
                    document.body.appendChild(script);
                } else {
                    // 如果脚本已存在，直接初始化新的MerchantManager实例
                    merchantManager = new MerchantManager();
                }
                break;
                
            case 'category':
                // 加载分类管理页面
                const categoryResponse = await fetch('/pages/category.html');
                const categoryHtml = await categoryResponse.text();
                
                // 解析HTML内容
                const categoryDoc = parser.parseFromString(categoryHtml, 'text/html');
                const categoryContent = categoryDoc.querySelector('.category-container');
                
                if (!categoryContent) {
                    throw new Error('无法加载分类管理页面内容');
                }
                
                pageContainer.innerHTML = categoryContent.outerHTML;
                
                // 确保category.css已加载
                if (!document.querySelector('link[href="/css/category.css"]')) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = '/css/category.css';
                    document.head.appendChild(link);
                }
                
                // 加载并执行分类管理逻辑
                const categoryScriptExists = document.querySelector('script[src="/js/pages/category.js"]');
                if (!categoryScriptExists) {
                    const script = document.createElement('script');
                    script.src = '/js/pages/category.js';
                    script.onload = () => {
                        // 确保在脚本加载完成后初始化
                        categoryManager = new CategoryManager();
                    };
                    document.body.appendChild(script);
                } else {
                    // 如果脚本已存在，直接初始化新的CategoryManager实例
                    categoryManager = new CategoryManager();
                }
                break;
                
            case 'news':
                // 加载新闻管理页面
                const newsResponse = await fetch('/pages/news.html');
                const newsHtml = await newsResponse.text();
                
                // 解析HTML内容
                const newsDoc = parser.parseFromString(newsHtml, 'text/html');
                const newsContent = newsDoc.querySelector('.news-container');
                
                if (!newsContent) {
                    throw new Error('无法加载新闻管理页面内容');
                }
                
                pageContainer.innerHTML = newsContent.outerHTML;
                
                // 确保news.css已加载
                if (!document.querySelector('link[href="/css/news.css"]')) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = '/css/news.css';
                    document.head.appendChild(link);
                }
                
                // 加载并执行新闻管理逻辑
                const newsScriptExists = document.querySelector('script[src="/js/pages/news.js"]');
                if (!newsScriptExists) {
                    const script = document.createElement('script');
                    script.src = '/js/pages/news.js';
                    script.onload = () => {
                        // 确保在脚本加载完成后初始化
                        newsManager = new NewsManager();
                    };
                    document.body.appendChild(script);
                } else {
                    // 如果脚本已存在，直接初始化新的NewsManager实例
                    newsManager = new NewsManager();
                }
                break;
                
            case 'order':
                // 加载订单管理页面
                const orderResponse = await fetch('/pages/order.html');
                const orderHtml = await orderResponse.text();
                
                // 解析HTML内容
                const orderDoc = parser.parseFromString(orderHtml, 'text/html');
                const orderContent = orderDoc.querySelector('.order-container');
                
                if (!orderContent) {
                    throw new Error('无法加载订单管理页面内容');
                }
                
                pageContainer.innerHTML = orderContent.outerHTML;
                
                // 确保order.css已加载
                if (!document.querySelector('link[href="/css/order.css"]')) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = '/css/order.css';
                    document.head.appendChild(link);
                }
                
                // 加载并执行订单管理逻辑
                const orderScriptExists = document.querySelector('script[src="/js/pages/order.js"]');
                if (!orderScriptExists) {
                    const script = document.createElement('script');
                    script.src = '/js/pages/order.js';
                    script.onload = () => {
                        // 确保在脚本加载完成后初始化
                        orderManager = new OrderManager();
                    };
                    document.body.appendChild(script);
                } else {
                    // 如果脚本已存在，直接初始化新的OrderManager实例
                    orderManager = new OrderManager();
                }
                break;
                
            case 'comment':
                // 加载评论管理页面
                const commentResponse = await fetch('/pages/comment.html');
                const commentHtml = await commentResponse.text();
                
                // 解析HTML内容
                const commentDoc = parser.parseFromString(commentHtml, 'text/html');
                const commentContent = commentDoc.querySelector('.comment-container');
                
                if (!commentContent) {
                    throw new Error('无法加载评论管理页面内容');
                }
                
                pageContainer.innerHTML = commentContent.outerHTML;
                
                // 确保comment.css已加载
                if (!document.querySelector('link[href="/css/comment.css"]')) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = '/css/comment.css';
                    document.head.appendChild(link);
                }
                
                // 加载并执行评论管理逻辑
                const commentScriptExists = document.querySelector('script[src="/js/pages/comment.js"]');
                if (!commentScriptExists) {
                    const script = document.createElement('script');
                    script.src = '/js/pages/comment.js';
                    script.onload = () => {
                        // 确保在脚本加载完成后初始化
                        commentManager = new CommentManager();
                    };
                    document.body.appendChild(script);
                } else {
                    // 如果脚本已存在，直接初始化新的CommentManager实例
                    commentManager = new CommentManager();
                }
                break;
                
            case 'product':
                // 加载商品管理页面
                const productResponse = await fetch('/pages/product.html');
                const productHtml = await productResponse.text();
                
                // 解析HTML内容
                const productDoc = parser.parseFromString(productHtml, 'text/html');
                const productContent = productDoc.querySelector('.product-container');
                
                if (!productContent) {
                    throw new Error('无法加载商品管理页面内容');
                }
                
                pageContainer.innerHTML = productContent.outerHTML;
                
                // 确保product.css已加载
                if (!document.querySelector('link[href="/css/product.css"]')) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = '/css/product.css';
                    document.head.appendChild(link);
                }
                
                // 加载并执行商品管理逻辑
                const productScriptExists = document.querySelector('script[src="/js/pages/product.js"]');
                if (!productScriptExists) {
                    const script = document.createElement('script');
                    script.src = '/js/pages/product.js';
                    script.onload = () => {
                        // 确保在脚本加载完成后初始化
                        productManager = new ProductManager();
                    };
                    document.body.appendChild(script);
                } else {
                    // 如果脚本已存在，直接初始化新的ProductManager实例
                    productManager = new ProductManager();
                }
                break;
                
            default:
                pageContainer.innerHTML = `
                    <div class="page-container">
                        <h2>${pageName.charAt(0).toUpperCase() + pageName.slice(1)}</h2>
                        <div class="page-content">该页面正在开发中...</div>
                    </div>
                `;
        }
    } catch (error) {
        console.error('加载页面失败:', error);
        pageContainer.innerHTML = `
            <div class="error-container">
                <div class="error-message">
                    <h3>页面加载失败</h3>
                    <p>${error.message || '请刷新重试'}</p>
                </div>
            </div>
        `;
    }
} 