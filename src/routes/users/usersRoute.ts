import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { authUser, createUser, logOffUser } from './handlers'
import { checkSessionIdExists } from '../../midlewares/check-session-id-exists'

export async function usersRoutes(app: FastifyInstance) {
  app.addHook(
    'preHandler',
    async (request: FastifyRequest, reply: FastifyReply) => {
      console.log(`[${request.method}] ${request.url}`)
    }
  )

  app.post('/auth', authUser)
  app.post('/create', createUser)
  app.get('/logoff', { preHandler: [checkSessionIdExists] }, logOffUser)
}
