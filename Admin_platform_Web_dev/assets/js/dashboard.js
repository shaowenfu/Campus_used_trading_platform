document.addEventListener('DOMContentLoaded', () => {
    // 检查登录状态
    const checkAuth = () => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            window.location.href = './index.html';
        }
    };
    checkAuth();

    // 获取DOM元素
    const sidebar = document.querySelector('.sidebar-nav');
    const content = document.querySelector('.content');
    const logoutBtn = document.querySelector('.logout-btn');
    const breadcrumb = document.querySelector('.breadcrumb');
    const username = document.querySelector('.username');

    // 设置用户名
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo') || '{}');
    username.textContent = adminInfo.name || '管理员';

    // 页面切换
    sidebar.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
            e.preventDefault();
            const link = e.target.closest('a');
            const page = link.dataset.page;
            
            // 更新活动状态
            sidebar.querySelectorAll('li').forEach(li => li.classList.remove('active'));
            link.parentElement.classList.add('active');
            
            // 更新面包屑
            breadcrumb.textContent = link.querySelector('span').textContent;
            
            // 切换页面显示
            content.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
            document.getElementById(page).classList.add('active');
            
            // 如果需要加载数据，可以在这里调用相应的函数
            loadPageData(page);
        }
    });

    // 退出登录
    logoutBtn.addEventListener('click', async () => {
        try {
            await API.logout();
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminInfo');
            window.location.href = './index.html';
        } catch (error) {
            console.error('退出失败:', error);
            alert('退出失败，请重试');
        }
    });

    // 加载页面数据
    const loadPageData = async (page) => {
        switch (page) {
            case 'overview':
                await loadOverviewData();
                break;
            // 其他页面的数据加载函数将在后续实现
        }
    };

    // 加载概览页数据
    const loadOverviewData = async () => {
        try {
            const stats = await API.getStatistics();
            if (stats.code === 0 && stats.data) {
                // 更新统计卡片数据
                updateStatCards(stats.data);
            }
        } catch (error) {
            console.error('加载概览数据失败:', error);
        }
    };

    // 更新统计卡片
    const updateStatCards = (data) => {
        const cards = document.querySelectorAll('.stat-card .number');
        // 根据实际数据更新卡片内容
    };

    // 初始加载概览数据
    loadOverviewData();

    // 添加快捷操作按钮的点击处理
    const quickActions = document.querySelector('.quick-actions');
    quickActions.addEventListener('click', (e) => {
        const actionBtn = e.target.closest('.action-btn');
        if (!actionBtn) return;

        const targetPage = actionBtn.dataset.page;
        if (!targetPage) return;

        // 切换到目标页面
        const targetLink = sidebar.querySelector(`a[data-page="${targetPage}"]`);
        if (targetLink) {
            // 更新活动状态
            sidebar.querySelectorAll('li').forEach(li => li.classList.remove('active'));
            targetLink.parentElement.classList.add('active');
            
            // 更新面包屑
            breadcrumb.textContent = targetLink.querySelector('span').textContent;
            
            // 切换页面显示
            content.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
            document.getElementById(targetPage).classList.add('active');

            // 根据不同的快捷操作执行相应的功能
            switch (targetPage) {
                case 'merchant':
                    // 直接打开新增商家模态框
                    if (merchantManager) {
                        merchantManager.showMerchantModal();
                    }
                    break;
                case 'product':
                    // 加载商品列表
                    if (productManager) {
                        productManager.loadProductList();
                    }
                    break;
                case 'order':
                    // 加载订单列表
                    if (orderManager) {
                        orderManager.loadOrderList();
                    }
                    break;
                case 'news':
                    // 直接打开新增新闻模态框
                    if (newsManager) {
                        newsManager.showNewsModal();
                    }
                    break;
            }
        }
    });
}); 