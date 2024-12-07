import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
} 