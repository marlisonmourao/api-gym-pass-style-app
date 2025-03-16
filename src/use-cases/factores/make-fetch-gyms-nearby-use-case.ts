import { PrismaGymsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms-use-case'

export function makeFetchGymsNearbyUseCase() {
  const userRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymsUseCase(userRepository)

  return useCase
}
