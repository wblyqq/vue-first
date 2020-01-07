import jsonp from '../common/js/jsonp'
import {commonParams, options} from '../api/config.js'
import axios from 'axios'
export function getRecommend () {
  // eslint-disable-next-line no-unused-vars
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    // eslint-disable-next-line no-undef
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}
export function getDiscList () {
  // eslint-disable-next-line no-unused-vars
  const url = '/api/getDiscList' // 调用自定义接口
  const data = Object.assign({}, commonParams, {
    rnd: Math.random(),
    picmid: 1,
    loginUin: 0,
    hostUin: 0,
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29,
    format: 'json'
  })
  // eslint-disable-next-line no-undef
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
