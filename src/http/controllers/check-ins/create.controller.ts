import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function createCheckInController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/gyms/:gymId/check-ins',
    {
      schema: {
        tags: ['Check-ins'],
        description: 'Create check-in',
        summary: 'Create check-in',
        body: z.object({
          latitude: z.number().refine(value => {
            return Math.abs(value) <= 90
          }),
          longitude: z.number().refine(value => {
            return Math.abs(value) <= 180
          }),
        }),
        params: z.object({
          gymId: z.string().uuid(),
        }),
        response: {
          201: z.object({}),
        },
      },
    },
    async (request, reply) => {
      const { latitude, longitude } = request.body
      const { gymId } = request.params

      const userId = request.user.sub

      const createCheckIn = makeCheckInUseCase()

      await createCheckIn.execute({
        userLatitude: latitude,
        userLongitude: longitude,
        gymId,
        userId,
      })

      return reply.status(201).send()
    }
  )
}
