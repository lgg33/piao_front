import request from '@/utils/request';

const url = '/vod/video/';

export default {

  getPlayAuth(vid) {
    return request({
      url: `${url}${vid}`,
      method: 'get'
    })
  }

}
