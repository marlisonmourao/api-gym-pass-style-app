import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in-use-case'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

beforeEach(() => {
  checkInsRepository = new InMemoryCheckInsRepository()
  sut = new CheckInUseCase(checkInsRepository)
})

describe('Check-in Use Case', () => {
  it('should be able to check in ', async () => {
    const checkIn = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.checkIn.id).toEqual(expect.any(String))
  })
})
