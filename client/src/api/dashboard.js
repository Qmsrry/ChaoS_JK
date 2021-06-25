import request from '@/utils/request'
//获得设备数、包数与数据量
export function reqnStats(data) {
    return request({
        url: '/stats/number',
        method: 'get',
        data
    })
}
