import { randomUUID } from 'node:crypto'

import type { Prisma, User } from '@prisma/client'
import type { UsersRepository } from '../users-repository'

export class InMemoryUserRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      createdAt: new Date(),
    }

    await this.items.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find(user => user.email === email)

    if (!user) return null

    return user
  }

  async findById(userId: string): Promise<User | null> {
    const user = this.items.find(user => user.id === userId)

    if (!user) return null

    return user
  }
}
