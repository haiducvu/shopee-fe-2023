import { describe, expect, it, beforeEach } from 'vitest'
import { Http } from '../http'
import { access_token_1s, refresh_token_1000days } from 'src/msw/auth.msw'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { setAccessTokenToLS, setRefreshTokenToLS } from '../auth'

describe('http axios', () => {
  let http = new Http().instance
  beforeEach(() => {
    localStorage.clear()
    http = new Http().instance
  })

  it('Call API', async () => {
    const res = await http.get('products')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('Auth Request', async () => {
    // await http.post('login', {
    //   email: 'q@merry.com',
    //   password: '123213'
    // })
    // const res = await http.get('me')
    // expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('Refresh Token', async () => {
    setAccessTokenToLS(access_token_1s)
    setRefreshTokenToLS(refresh_token_1000days)
    const httpNew = new Http().instance
    const res = await httpNew.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
