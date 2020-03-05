import request from '@/utils/request';

const url = '/order/orders';

export default {
  createOrder(courseId, user, token) {
    return request({
      url: `${url}/${courseId}/${token}`,
      method: 'post',
      data: user
    })
  },
}
