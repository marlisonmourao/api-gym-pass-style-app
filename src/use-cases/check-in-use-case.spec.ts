import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { CheckInUseCase } from './check-in-use-case'

import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymRepository
let sut: CheckInUseCase

beforeEach(() => {
  checkInsRepository = new InMemoryCheckInsRepository()
  gymsRepository = new InMemoryGymRepository()
  sut = new CheckInUseCase(checkInsRepository, gymsRepository)

  gymsRepository.items.push({
    id: 'gym-01',
    title: 'JavaScript Gym',
    description: '',
    latitude: new Decimal(-3.0737436),
    longitude: new Decimal(-59.9219225),
    phone: '',
  })

  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('Check-in Use Case', () => {
  it('should be able to check in ', async () => {
    const checkIn = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -3.0737436,
      userLongitude: -59.9219225,
    })

    expect(checkIn.checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -3.0737436,
      userLongitude: -59.9219225,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -3.0737436,
        userLongitude: -59.9219225,
      })
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -3.0737436,
      userLongitude: -59.9219225,
    })

    vi.setSystemTime(new Date(2025, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -3.0737436,
      userLongitude: -59.9219225,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym ', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Typescript Gym',
      description: '',
      latitude: new Decimal(-3.0395459),
      longitude: new Decimal(-59.9381016),
      phone: '',
    })

    await expect(
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -3.0737436,
        userLongitude: -59.9219225,
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
