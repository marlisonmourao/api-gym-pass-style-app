import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'

export async function validateCheckInController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/check-ins/:checkInId/validate',
    {
      schema: {
        tags: ['Check-ins'],
        description: 'Validate check-ins',
        summary: 'Validate check-ins',
        params: z.object({
          checkInId: z.string().uuid(),
        }),
        response: {
          204: z.object({}),
        },
      },
    },
    async (request, reply) => {
      const { checkInId } = request.params as { checkInId: string }

      const userId = request.user.sub

      const validateCheckIn = makeValidateCheckInUseCase()

      await validateCheckIn.execute({
        checkInId,
      })

      return reply.status(204).send({})
    }
  )
}
