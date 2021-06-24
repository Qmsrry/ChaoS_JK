import request from '@/utils/request'
export function deviceList(data) {
  const start = (data.pageNumber - 1) * data.pageSize;
  const end = data.pageNumber * data.pageSize;
  const name = data.name;
  const status = data.status;
  const tmp = '' + (name ? '&name=' + name : '') + (status ? '&status=' + status : '')
  return request({
    url: '/device?start='+start+'&end='+end+tmp,
    method: 'get',
    data
  })
}

export function deleteDevice(data) {
  return request({
    url: '/table/delete',
    method: 'post',
    data
  })
}

export function editDevice(data) {
  return request({
    url: '/table/edit',
    method: 'post',
    data
  })
}

export function addDevice(data) {
  return request({
    url: '/device',
    method: 'post',
    data: {
      addname:data
    }
  })
}