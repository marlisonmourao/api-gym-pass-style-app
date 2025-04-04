import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register-use-case'

export function makeRegisterUseCase() {
  const userRepository = new PrismaUserRepository()
  const registerUseCase = new RegisterUseCase(userRepository)

  return registerUseCase
}
