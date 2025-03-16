import type { UsersRepository } from '@/repositories/users-repository'
import bcrypt from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new Error('Email already exists')
    }

    const passwordHash = await bcrypt.hash(password, 6)

    await this.usersRepository.create({
      name,
      email,
      passwordHash,
    })
  }
}
