import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { makeFetchGymsNearbyUseCase } from '@/use-cases/factories/make-fetch-gyms-nearby-use-case'
import z from 'zod'

export async function nearbyController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/gyms/nearby',
    {
      schema: {
        tags: ['Gyms'],
        description: 'Fetch nearby gyms',
        summary: 'Fetch nearby gyms',
        querystring: z.object({
          latitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 90
          }),
          longitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 180
          }),
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
      const { latitude, longitude } = request.query

      const fetchGymsNearby = makeFetchGymsNearbyUseCase()

      const { gyms } = await fetchGymsNearby.execute({
        userLatitude: latitude,
        userLongitude: longitude,
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
