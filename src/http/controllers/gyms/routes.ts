import { verifyJWT } from '@/http/middlewares/verify-jwt'
import type { FastifyInstance } from 'fastify'
import { createGymController } from './create.controller'
import { nearbyController } from './nearby.controller'
import { searchGymController } from './search.controller'

export async function gymsRouter(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.register(createGymController)
  app.register(searchGymController)
  app.register(nearbyController)
}
