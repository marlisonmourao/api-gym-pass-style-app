import fastify from 'fastify'

import fastifyJwt from '@fastify/jwt'
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { errorHandler } from './error-handler'
import { checkInsRouter } from './http/controllers/check-ins/routes'
import { gymsRouter } from './http/controllers/gyms/routes'
import { appRoutes } from './http/controllers/users/routes'

import fastifyCookie from '@fastify/cookie'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.setErrorHandler(errorHandler)

app.register(fastifyCookie)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(appRoutes)
app.register(gymsRouter)
app.register(checkInsRouter)
