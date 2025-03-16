import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import type { UsersRepository } from '@/repositories/users-repository'
import type { User } from '@prisma/client'
import bcrypt from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}
export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await bcrypt.hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
    })

    return { user }
  }
}
