import request from '@/utils/request'
//获得设备数、包数与数据量
export function reqnStats(data) {
    return request({
        url: '/stats/number',
        method: 'get',
        data
    })
}
//获得一周概览
export function reqWeek(data) {
    return request({
        url: '/stats/week',
        method: 'get',
        data
    })
}
//获得前五设备
export function reqPie(data) {
    return request({
        url: '/stats/pie',
        method: 'get',
        data
    })
}