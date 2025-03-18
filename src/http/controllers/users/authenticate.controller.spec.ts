import { app } from '@/app'
import request from 'supertest'

describe('Authenticate Controller (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should register a authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johnDoe@example.com',
      password: 'password123',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johnDoe@example.com',
      password: 'password123',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
