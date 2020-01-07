import originJSONP from 'jsonp'

export default function jsonp(url, data, options) {
  // eslint-disable-next-line no-undef
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJSONP(url, options, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
function param (data) {
  let url = ''
  for (var k in data) {
    // eslint-disable-next-line no-unused-vars
    let value = data[k] !== undefined ? data[k] : ''
    // eslint-disable-next-line no-template-curly-in-string
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
