// 登录页面逻辑
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');
    const errorMsg = document.getElementById('errorMsg');

    // 登录表单提交处理
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        
        // 表单验证
        if (!username || !password) {
            showError('用户名和密码不能为空');
            return;
        }

        try {
            // 禁用登录按钮
            loginBtn.disabled = true;
            loginBtn.textContent = '登录中...';
            
            // 调用登录接口
            console.log("开始调用登录接口");
            const response = await API.login(username, password);
            console.log("登录接口返回结果：", response);
            
            if (response && response.code === 1 && response.data) {
                // 登录成功，token已在API.login中保存
                localStorage.setItem('userInfo', JSON.stringify({
                    id: response.data.id,
                    name: response.data.name,
                    userName: response.data.userName
                }));
                
                // 跳转到主页
                window.location.href = 'index.html';
            } else {
                showError(response?.msg || '登录失败');
            }
        } catch (error) {
            console.error('登录失败:', error);
            showError(error.message || '登录失败，请稍后重试');
        } finally {
            // 恢复登录按钮状态
            loginBtn.disabled = false;
            loginBtn.textContent = '登录';
        }
    });

    // 显示错误信息
    function showError(message) {
        errorMsg.textContent = message;
        setTimeout(() => {
            errorMsg.textContent = '';
        }, 3000);
    }
}); 