import fastify from 'fastify'

import fastifyJwt from '@fastify/jwt'
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { errorHandler } from './error-handler'
import { gymsRouter } from './http/controllers/gyms/routes'
import { appRoutes } from './http/controllers/users/routes'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.setErrorHandler(errorHandler)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(appRoutes)
app.register(gymsRouter)
