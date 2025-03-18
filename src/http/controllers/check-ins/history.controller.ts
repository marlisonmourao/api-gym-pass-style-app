import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'

export async function historyCheckInController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/check-ins/history',
    {
      schema: {
        tags: ['Check-ins'],
        description: 'Fetch history of check-ins',
        summary: 'Fetch history of check-ins',
        querystring: {
          page: z.coerce.number().min(1).default(1),
        },
        response: {
          200: z.object({
            checkIns: z.array(
              z.object({
                id: z.string(),
                gymId: z.string(),
                userId: z.string(),
                createdAt: z.coerce.date(),
                validatedAt: z.coerce.date().nullable(),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { page } = request.query as { page: number }

      const userId = request.user.sub

      const fetchUserCheckInsHistory = makeFetchUserCheckInsHistoryUseCase()

      const { checkIns } = await fetchUserCheckInsHistory.execute({
        page,
        userId,
      })

      return reply.status(200).send({ checkIns })
    }
  )
}
