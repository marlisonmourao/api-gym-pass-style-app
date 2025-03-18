import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'

export async function historyCheckInController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/check-ins/history',
    {
      schema: {
        tags: ['Check-ins'],
        description: 'Fetch history of check-ins',
        summary: 'Fetch history of check-ins',
        querystring: z.object({
          page: z.coerce.number().min(1).default(1),
        }),
      },
    },
    async (request, reply) => {
      const { page } = request.query

      const userId = request.user.sub

      const fetchUserCheckInsHistory = makeFetchUserCheckInsHistoryUseCase()

      const { checkIns } = await fetchUserCheckInsHistory.execute({
        page: 1,
        userId,
      })

      return reply.status(200).send({ checkIns })
    }
  )
}
