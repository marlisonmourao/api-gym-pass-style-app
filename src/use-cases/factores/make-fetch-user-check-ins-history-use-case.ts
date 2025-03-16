import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchUserCheckInHistoryUseCase } from './../fetch-user-check-ins-history-use-case'

export function makeFetchUserCheckInsHistoryUseCase() {
  const userRepository = new PrismaCheckInRepository()
  const useCase = new FetchUserCheckInHistoryUseCase(userRepository)

  return useCase
}
