import { verifyJWT } from '@/http/middlewares/verify-jwt'
import type { FastifyInstance } from 'fastify'
import { createCheckInController } from './create.controller'
import { historyCheckInController } from './history.controller'
import { metricsCheckInController } from './metrics.controller'
import { validateCheckInController } from './validate.controller'

export async function checkInsRouter(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.register(createCheckInController)
  app.register(historyCheckInController)
  app.register(metricsCheckInController)
  app.register(validateCheckInController)
}
