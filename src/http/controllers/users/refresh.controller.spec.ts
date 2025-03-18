import { app } from '@/app'
import request from 'supertest'

describe('Refresh token Controller (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able to refresh token', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johnDoe@example.com',
      password: 'password123',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johnDoe@example.com',
      password: 'password123',
    })

    const cookies = authResponse.headers['set-cookie']

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    console.log(response.header['set-cookie'])

    expect(response.statusCode).toEqual(200)
    expect(response.body).toHaveProperty('token')
    expect(response.headers['set-cookie']).toEqual([
      expect.stringContaining('refreshToken'),
    ])
  })
})
