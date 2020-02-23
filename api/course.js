import request from '@/utils/request';

const url = '/study/course/';

export default {
  getByPage(num, size) {
    return request({
      url: `${url}${num}/${size}`,
      method: 'get'
    })
  },
  getById(courseId) {
    return request({
      url: `${url}${courseId}`,
      method: 'get'
    })
  }
}
