// 权限控制和用户信息管理
const Auth = {
    // 检查登录状态
    checkLogin() {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login.html';
            return false;
        }
        return true;
    },

    // 获取用户信息
    getUserInfo() {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo) : null;
    },

    // 退出登录
    async logout() {
        try {
            await API.logout();
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
            window.location.href = '/login.html';
        } catch (error) {
            console.error('退出登录失败:', error);
            alert('退出登录失败，请重试');
        }
    }
}; 