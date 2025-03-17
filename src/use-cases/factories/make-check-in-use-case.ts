import { PrismaGymsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../check-in-use-case'

export function makeCheckInUseCase() {
  const userRepository = new PrismaCheckInRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(userRepository, gymsRepository)

  return useCase
}
