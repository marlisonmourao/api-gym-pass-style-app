import { PrismaGymsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { SearchGymsUseCase } from '../search-gym-use-case'

export function makeSearchGymsUseCase() {
  const userRepository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(userRepository)

  return useCase
}
