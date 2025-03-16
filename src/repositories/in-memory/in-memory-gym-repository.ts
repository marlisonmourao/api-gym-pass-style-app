import { type Gym, Prisma } from '@prisma/client'
import type { GymsRepository } from '../gyms-repository'

import { randomUUID } from 'node:crypto'

export class InMemoryGymRepository implements GymsRepository {
  public items: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const checkIn = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      createdAt: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.items.find(gym => gym.id === gymId)

    if (!gym) return null

    return gym
  }
}
