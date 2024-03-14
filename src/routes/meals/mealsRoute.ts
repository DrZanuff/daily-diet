import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { createMeal } from './handlers'
import { checkSessionIdExists } from '../../midlewares/check-session-id-exists'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook(
    'preHandler',
    async (request: FastifyRequest, reply: FastifyReply) => {
      console.log(`[${request.method}] ${request.url}`)
    }
  )

  app.post('/create', { preHandler: [checkSessionIdExists] }, createMeal)
}
