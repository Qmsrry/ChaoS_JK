import request from '@/utils/request'

export function reqLogin(data) {
  return request({
    url: '/auth',
    method: 'put',
    data
  })
}

export function reqLogout(data) {
  return request({
    url: '/auth',
    method: 'delete',
    data
  })
}

export function reqRegister(data) {
  return request({
    url: '/auth',
    method: 'post',
    data
  })
}

export function reqCode(data) {
  return request({
    url: '/auth/code',
    method: 'post',
    data
  })
}