import { bestURL, crosURl } from './baseURL'

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true

export function request(config) {
  const instance = axios.create({
    baseURL: crosURl,
    timeout: 9999,
  })

  instance.interceptors.request.use(
    (config) => {
      return config
    },
    (err) => {
      alert(err)
    }
  )

  instance.interceptors.response.use(
    (res) => {
      console.log(res.data.code)
      return res.data
    },
    (err) => {
      alert(err)
    }
  )

  return instance(config)
}
