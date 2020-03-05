import request from '@/utils/request';

const url = '/search/course/';

export default {
  searchCourse(num, size, searchCourse) {
    return request({
      url: `${url}${num}/${size}`,
      method: 'get',
      params: searchCourse
    })
  }
}
