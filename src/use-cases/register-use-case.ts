import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userExists) {
    throw new Error('Email already exists')
  }

  const passwordHash = await bcrypt.hash(password, 6)

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  })
}
