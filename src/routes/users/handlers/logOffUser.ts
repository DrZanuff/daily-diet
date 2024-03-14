import { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../../../database'
import { randomUUID } from 'crypto'

export async function logOffUser(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<any> {
  const userSessionIDCookie = request.cookies['session_id']

  const user = await knex('user')
    .where({ session_id: userSessionIDCookie })
    .first()

  if (!user) {
    throw new Error('User not found')
  }

  reply.clearCookie('session_id', { maxAge: 0, path: '/' })

  await knex('user')
    .where({ session_id: userSessionIDCookie })
    .first()
    .update({ session_id: randomUUID() })

  reply.status(200)
}
