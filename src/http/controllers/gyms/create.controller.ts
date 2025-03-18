import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'

export async function createGymController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/gyms',
    {
      onRequest: [verifyUserRole('ADMIN')],
      schema: {
        tags: ['Gyms'],
        description: 'Create a new gym',
        summary: 'Create a new gym',
        body: z.object({
          title: z.string(),
          description: z.string().nullable(),
          phone: z.string().nullable(),
          latitude: z.number().refine(value => {
            return Math.abs(value) <= 90
          }),
          longitude: z.number().refine(value => {
            return Math.abs(value) <= 180
          }),
        }),
        response: {
          201: z.object({}),
        },
      },
    },
    async (request, reply) => {
      const { title, description, phone, latitude, longitude } = request.body

      const createGymUseCase = makeCreateGymUseCase()

      await createGymUseCase.execute({
        title,
        description,
        phone,
        latitude,
        longitude,
      })

      return reply.status(201).send()
    }
  )
}
