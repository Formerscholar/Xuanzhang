import { bestURL, crosURl } from './baseURL'

import { Toast } from 'vant'

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true

let loading
let loadingNum = 0
function startLoading() {
  if (loadingNum == 0) {
    loading = Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
    })
  }
  loadingNum++
}
function endLoading() {
  loadingNum--
  if (loadingNum <= 0) {
    loading.clear()
  }
}

export function request(config) {
  const instance = axios.create({
    baseURL: crosURl,
    timeout: 9999,
  })

  instance.interceptors.request.use(
    (config) => {
      startLoading()
      return config
    },
    (err) => {
      console.log(err)
    }
  )

  instance.interceptors.response.use(
    (res) => {
      endLoading()
      console.log(res.data.code)
      return res.data
    },
    (err) => {
      endLoading()
      console.log(err)
    }
  )

  return instance(config)
}
