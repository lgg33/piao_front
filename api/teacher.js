import request from '@/utils/request';

const url = '/study/teacher/';

export default {
  getAllTeacher() {
    return request({
      url: url,
      method: 'get'
    })
  },
  getByPage(num, size) {
    return request({
      url: `${url}${num}/${size}`,
      method: 'get'
    });
  },
  getById(id) {
    return request({
      url: `${url}${id}`,
      method: 'get'
    });
  }
}
