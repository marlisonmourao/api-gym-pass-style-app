import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { InvalidCredentialsError } from './use-cases/errors/invalid-credentials-error'
import { MaxDistanceError } from './use-cases/errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './use-cases/errors/max-number-of-check-ins-error'
import { ResourceNotFoundError } from './use-cases/errors/resource-not-found-error'
import { UserAlreadyExistsError } from './use-cases/errors/user-already-exists-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      errors: error.flatten().fieldErrors,
    })
  }

  if (error.statusCode === 400 && error.code === 'FST_ERR_VALIDATION') {
    return reply.status(400).send({
      message: 'Validation error.',
      errors: error.message,
    })
  }

  if (error instanceof MaxDistanceError) {
    return reply.status(400).send({
      message: 'Max distance error.',
      errors: error.message,
    })
  }

  if (error instanceof MaxNumberOfCheckInsError) {
    return reply.status(400).send({
      message: 'Max number of check-ins error.',
      errors: error.message,
    })
  }

  if (error instanceof UserAlreadyExistsError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  if (error instanceof ResourceNotFoundError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  ResourceNotFoundError

  if (error instanceof InvalidCredentialsError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  }

  return reply.status(500).send({
    error: error.message,
    message: 'Internal server error.',
  })
}
