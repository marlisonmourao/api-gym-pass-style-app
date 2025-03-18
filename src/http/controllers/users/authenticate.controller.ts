import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

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
        response: {
          200: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const authenticateUseCase = makeAuthenticateUseCase()

      const { user } = await authenticateUseCase.execute({
        email,
        password,
      })

      const token = await reply.jwtSign(
        {},
        {
          sign: { sub: user.id },
        }
      )

      return reply.status(200).send({
        token,
      })
    }
  )
}
