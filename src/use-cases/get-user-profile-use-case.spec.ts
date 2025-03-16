import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'

import bcrypt from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetUserProfileUseCase } from './get-user-profile-use-case'

let usersRepository: InMemoryUserRepository
let sut: GetUserProfileUseCase

beforeEach(() => {
  usersRepository = new InMemoryUserRepository()
  sut = new GetUserProfileUseCase(usersRepository)
})

describe('Get User Profile Use Case', () => {
  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      passwordHash: await bcrypt.hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(
      sut.execute({
        userId: 'non-existing-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
