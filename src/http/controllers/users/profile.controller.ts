import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { verifyJWT } from '../../middlewares/verify-jwt'

export async function profileController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/me',
    {
      onRequest: [verifyJWT],
      schema: {
        response: {
          200: z.object({
            user: z.object({
              id: z.string().uuid(),
              name: z.string(),
              email: z.string().email(),
              passwordHash: z.string().optional(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const getUserProfile = makeGetUserProfileUseCase()

      const { user } = await getUserProfile.execute({
        userId: request.user.sub,
      })

      return reply.status(200).send({
        user: {
          ...user,
          passwordHash: undefined,
        },
      })
    }
  )
}
