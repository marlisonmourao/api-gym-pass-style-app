import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { CreateGymUseCase } from './create-gym-use-case'

let gymsRepository: InMemoryGymRepository
let sut: CreateGymUseCase

beforeEach(() => {
  gymsRepository = new InMemoryGymRepository()
  sut = new CreateGymUseCase(gymsRepository)
})

describe('Create gym Use Case', () => {
  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.640109,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
