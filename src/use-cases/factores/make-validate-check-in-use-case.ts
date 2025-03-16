import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { ValidateCheckInUseCase } from '../validate-check-in-use-case'

export function makeValidateCheckInUseCase() {
  const userRepository = new PrismaCheckInRepository()
  const useCase = new ValidateCheckInUseCase(userRepository)

  return useCase
}
