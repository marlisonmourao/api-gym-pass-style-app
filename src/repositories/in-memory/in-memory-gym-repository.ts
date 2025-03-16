import type { Gym } from '@prisma/client'
import type { GymsRepository } from '../gyms-repository'

export class InMemoryGymRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.items.find(gym => gym.id === gymId)

    if (!gym) return null

    return gym
  }
}
