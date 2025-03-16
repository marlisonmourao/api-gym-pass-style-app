import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { registerUseCase } from '@/use-cases/register-use-case'

export async function registerController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        tags: ['Users'],
        description: 'Create a new user',
        summary: 'Create a new user',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body

      try {
        await registerUseCase({
          name,
          email,
          password,
        })
      } catch (error) {
        return reply.status(409).send()
      }

      return reply.status(201).send()
    }
  )
}
