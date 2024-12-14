// API接口封装
const API = {
    // API基础URL
    baseURL: 'http://localhost:8081',

    // 封装请求方法
    async request(url, options = {}) {
        try {
            const { params, ...otherOptions } = options;
            const finalUrl = this.buildUrl(url, params);
            
            // 获取token并检查
            const token = localStorage.getItem('token');
            console.log("当前token：", token);

            // 构建请求头
            const headers = {
                'Content-Type': 'application/json',
                ...(token ? { 'token': token } : {}),
                ...(otherOptions.headers || {})
            };
            
            console.log("请求头：", headers);
            console.log("发送请求：", this.baseURL + finalUrl);

            const response = await fetch(this.baseURL + finalUrl, {
                ...otherOptions,
                credentials: 'include',
                headers
            });
            
            console.log("请求响应：", response);
            
            // 如果是401错误，可能是token无效
            if (response.status === 401) {
                console.error('认证失败，请重新登录');
                // 可以选择是否跳转到登录页
                // window.location.href = '/login.html';
                throw new Error('认证失败，请重新登录');
            }
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log("响应数据：", data);
            return data;
        } catch (error) {
            console.error('Request failed:', error);
            throw error;
        }
    },

    // 登录接口
    async login(username, password) {
        console.log("发送登录请求，参数：", { username, password });
        try {
            const result = await this.request('/admin/login', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password
                })
            });
            
            // 如果登录成功，保存token
            if (result.code === 1 && result.data?.token) {
                // 保存token前先清除旧的
                localStorage.removeItem('token');
                localStorage.setItem('token', result.data.token);
                console.log("Token已保存：", result.data.token);
            } else {
                console.error('登录响应中没有token:', result);
            }
            
            return result;
        } catch (error) {
            console.error('登录请求失败:', error);
            throw error;
        }
    },

    // 退出登录接口
    async logout() {    
        try {
            const result = await this.request('/admin/logout', {
                method: 'POST'
            });
            
            // 清除本地存储的token和用户信息
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
            
            return result;
        } catch (error) {
            console.error('退出登录请求失败:', error);
            throw error;
        }
    },

    // 处理URL参数
    buildUrl(url, params) {
        if (!params) return url;
        const queryString = Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
        return `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
    }
}; 