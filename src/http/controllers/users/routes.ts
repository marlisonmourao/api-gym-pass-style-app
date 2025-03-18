import type { FastifyInstance } from 'fastify'
import { authenticateController } from './authenticate.controller'
import { profileController } from './profile.controller'
import { registerController } from './register.controller'

export async function appRoutes(app: FastifyInstance) {
  app.register(registerController)
  app.register(authenticateController)
  app.register(profileController)
}
