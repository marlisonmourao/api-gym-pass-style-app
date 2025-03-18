import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'
import z from 'zod'

export async function metricsCheckInController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/check-ins/metrics',
    {
      schema: {
        tags: ['Check-ins'],
        description: 'Fetch metrics of check-ins',
        summary: 'Fetch metrics of check-ins',
        response: {
          200: z.object({
            checkInsCount: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = request.user.sub

      const getUserMetrics = makeGetUserMetricsUseCase()

      const { checkInsCount } = await getUserMetrics.execute({
        userId,
      })

      return reply.status(200).send({
        checkInsCount,
      })
    }
  )
}
