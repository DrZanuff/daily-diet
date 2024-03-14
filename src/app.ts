import fastify, { FastifyRequest, FastifyReply } from 'fastify'
import cookie from '@fastify/cookie'
import { usersRoutes, mealsRoutes } from './routes'

export const app = fastify()

app.register(cookie)
app.register(usersRoutes, { prefix: 'user' })
app.register(mealsRoutes, { prefix: 'meal' })

app.get('/', (request: FastifyRequest, reply: FastifyReply) => {
  const { ip } = request
  reply.send(
    `
    - Server is up and running.
    - Date: ${new Date()}.
    - Your IP: ${ip}
    `
  )
})
