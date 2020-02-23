import request from '@/utils/request';

const url = '/study/subject/';

export default {

  getSubject() {
    return request({
      url: url,
      method: 'get'
    })
  }

}
