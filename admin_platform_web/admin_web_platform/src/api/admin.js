import request from '@/utils/request'

// 管理员登录
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

// 修改密码
export function editPassword(data) {
  return request({
    url: '/admin/marketer/editPassword',
    method: 'put',
    data
  })
} 