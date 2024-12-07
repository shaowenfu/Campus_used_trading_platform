// 开发模式标志
const isDev = true; // 开发时设为 true，部署时需要设为 false

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // 开发模式下直接跳转
        if (isDev) {
            console.log('开发模式：跳过登录验证');
            // 模拟存储登录信息
            localStorage.setItem('adminToken', 'dev-token');
            localStorage.setItem('adminInfo', JSON.stringify({
                id: 1,
                name: '开发者',
                userName: 'developer'
            }));
            window.location.href = './dashboard.html';
            return;
        }
        
        try {
            const result = await API.login(username, password);
            
            if (result.code === 0 && result.data) {
                // 登录成功，保存token
                localStorage.setItem('adminToken', result.data.token);
                localStorage.setItem('adminInfo', JSON.stringify({
                    id: result.data.id,
                    name: result.data.name,
                    userName: result.data.userName
                }));
                
                // 跳转到管理主页
                window.location.href = './dashboard.html';
            } else {
                // 显示错误信息
                alert(result.msg || '登录失败，请检查用户名和密码');
            }
        } catch (error) {
            console.error('登录失败:', error);
            alert('登录失败，请稍后重试');
        }
    });
}); 