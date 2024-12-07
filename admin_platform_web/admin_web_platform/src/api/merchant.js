import request from '@/utils/request'

// 商家分页查询
export function getMerchantList(params) {
  return request({
    url: '/admin/marketer/page',
    method: 'get',
    params
  })
}

// 新增商家
export function addMerchant(data) {
  return request({
    url: '/admin/marketer',
    method: 'post',
    data
  })
}

// 编辑商家信息
export function updateMerchant(data) {
  return request({
    url: '/admin/marketer',
    method: 'put',
    data
  })
}

// 启用、禁用商家账号
export function updateMerchantStatus(status, id) {
  return request({
    url: `/admin/marketer/status/${status}`,
    method: 'post',
    params: { id }
  })
}

// 根据id查询商家
export function getMerchantById(id) {
  return request({
    url: `/admin/marketer/${id}`,
    method: 'get'
  })
} 