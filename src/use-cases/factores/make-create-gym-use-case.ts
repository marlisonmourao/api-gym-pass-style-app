import { PrismaGymsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { CreateGymUseCase } from '../create-gym-use-case'

export function makeCreateGymUseCase() {
  const userRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(userRepository)

  return useCase
}
