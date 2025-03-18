import { app } from '@/app'
import request from 'supertest'

describe('Register Controller (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should register a new user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    })

    expect(response.statusCode).toEqual(201)
  })
})
