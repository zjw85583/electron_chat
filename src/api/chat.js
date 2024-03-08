import request from '@/request/index'

export const fileUpload = params => {
  return request({
    method: 'post',
    url: '/file/upload',
    data: params
  })
}