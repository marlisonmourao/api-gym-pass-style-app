import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function refreshController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/token/refresh',
    {
      schema: {
        tags: ['Auth'],
        description: 'Refresh token',
        summary: 'Refresh token',
        response: {
          200: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      await request.jwtVerify({ onlyCookie: true })

      const userId = request.user.sub

      const { role } = request.user

      const token = await reply.jwtSign(
        {
          role,
        },
        {
          sign: { sub: userId },
        }
      )

      const refreshToken = await reply.jwtSign(
        {
          role,
        },
        {
          sign: {
            sub: userId,
            expiresIn: '7d',
          },
        }
      )

      return reply
        .setCookie('refreshToken', refreshToken, {
          path: '/',
          secure: true,
          httpOnly: true,
          sameSite: true,
        })
        .status(200)
        .send({
          token,
        })
    }
  )
}
