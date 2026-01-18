import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios'

export function createService (config?: CreateAxiosDefaults<any> | undefined): AxiosInstance {
  const http = axios.create({
    baseURL: 'https://jsonmock.hackerrank.com',
    timeout: 10_000,
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  })

  http.interceptors.response.use(resp => {
    return resp.data
  })

  return http
}
