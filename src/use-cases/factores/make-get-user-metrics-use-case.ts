import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics-use-case'

export function makeGetUserMetricsUseCase() {
  const userRepository = new PrismaCheckInRepository()
  const useCase = new GetUserMetricsUseCase(userRepository)

  return useCase
}
