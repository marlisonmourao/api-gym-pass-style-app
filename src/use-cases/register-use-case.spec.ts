import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { RegisterUseCase } from './register-use-case'

import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import bcrypt from 'bcryptjs'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const UsersRepository = new InMemoryUserRepository()
    const sut = new RegisterUseCase(UsersRepository)

    const { user } = await sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const UsersRepository = new InMemoryUserRepository()
    const sut = new RegisterUseCase(UsersRepository)

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
    const UsersRepository = new InMemoryUserRepository()
    const sut = new RegisterUseCase(UsersRepository)

    const email = 'john@email.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
