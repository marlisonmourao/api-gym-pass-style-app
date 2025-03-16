import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { makeAuthenticateUseCase } from '@/use-cases/factores/make-authenticate-use-case'

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

      const authenticateUseCase = makeAuthenticateUseCase()

      await authenticateUseCase.execute({
        email,
        password,
      })

      return reply.status(200).send()
    }
  )
}
