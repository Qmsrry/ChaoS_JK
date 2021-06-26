import request from '@/utils/request'
//获得设备数、包数与数据量
export function reqMap(data) {
    return request({
        url: '/map',
        method: 'get',
        data
    })
}