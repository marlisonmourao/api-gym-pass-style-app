import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export async function searchGymController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/gyms/search',
    {
      schema: {
        tags: ['Gyms'],
        description: 'Search gyms',
        summary: 'Search gyms',
        querystring: z.object({
          q: z.string(),
          page: z.coerce.number().min(1).default(1),
        }),
        response: {
          200: z.object({
            gyms: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                description: z.string().nullable(),
                phone: z.string().nullable(),
                latitude: z.number(),
                longitude: z.number(),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { q, page } = request.query

      const searchGym = makeSearchGymsUseCase()

      const { gyms } = await searchGym.execute({
        query: q,
        page,
      })

      return reply.status(201).send({
        gyms: gyms.map(gym => ({
          ...gym,
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        })),
      })
    }
  )
}
