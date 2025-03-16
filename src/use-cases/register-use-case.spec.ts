import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { RegisterUseCase } from './register-use-case'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import bcrypt from 'bcryptjs'

let usersRepository: InMemoryUserRepository
let sut: RegisterUseCase

beforeEach(() => {
  usersRepository = new InMemoryUserRepository()
  sut = new RegisterUseCase(usersRepository)
})

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await bcrypt.compare(
      '123456',
      user.passwordHash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'john@email.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
