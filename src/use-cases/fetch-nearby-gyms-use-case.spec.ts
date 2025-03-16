import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms-use-case'

let gymsRepository: InMemoryGymRepository
let sut: FetchNearbyGymsUseCase

beforeEach(() => {
  gymsRepository = new InMemoryGymRepository()
  sut = new FetchNearbyGymsUseCase(gymsRepository)
})

describe('Fetch nearby gyms Use Case', () => {
  it('should be able to fetch nearby gym', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -3.0737436,
      longitude: -59.9219225,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -2.9523135,
      longitude: -59.998394,
    })

    const { gyms } = await sut.execute({
      userLatitude: -3.0737436,
      userLongitude: -59.9219225,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
