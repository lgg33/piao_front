import request from '@/utils/request';

const url = '/uc/user';

export default {
  getEmail(email) {
    return request({
      url: `${url}/getEmail/${email}`,
      method: 'get'
    })
  },
  save(user) {
    return request({
      url: `${url}`,
      method: 'post',
      data: user
    })
  },
  getByName(name) {
    return request({
      url: `${url}/getByName/${name}`,
      method: 'get'
    })
  },
  login(user) {
    return request({
      url: `${url}/auth`,
      method: 'post',
      data: user
    })
  }
}
