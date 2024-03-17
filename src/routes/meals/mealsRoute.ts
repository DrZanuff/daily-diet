import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { createMeal, editMeal, deleteMeal, listMeals } from './handlers'
import { checkSessionIdExists } from '../../midlewares/check-session-id-exists'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook(
    'preHandler',
    async (request: FastifyRequest, reply: FastifyReply) => {
      console.log(`[${request.method}] ${request.url}`)
    }
  )

  app.post('/create', { preHandler: [checkSessionIdExists] }, createMeal)
  app.patch('/edit', { preHandler: [checkSessionIdExists] }, editMeal)
  app.delete('/delete', { preHandler: [checkSessionIdExists] }, deleteMeal)
  app.post('/list', { preHandler: [checkSessionIdExists] }, listMeals)
}
