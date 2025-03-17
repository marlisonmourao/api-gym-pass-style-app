import type { FastifyInstance } from 'fastify'
import { authenticateController } from './controllers/authenticate.controller'
import { profileController } from './controllers/profile.controller'
import { registerController } from './controllers/register.controller'

export async function appRoutes(app: FastifyInstance) {
  app.register(registerController)
  app.register(authenticateController)

  app.register(profileController)
}
