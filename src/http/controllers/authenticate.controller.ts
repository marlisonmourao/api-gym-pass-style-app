import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate-use-case'

export async function authenticateController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions',
    {
      schema: {
        tags: ['Auth'],
        description: 'Authenticate user',
        summary: 'Authenticate user',
        body: z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }),
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const userRepository = new PrismaUserRepository()
      const registerUseRepository = new AuthenticateUseCase(userRepository)

      await registerUseRepository.execute({
        email,
        password,
      })

      return reply.status(200).send()
    }
  )
}
