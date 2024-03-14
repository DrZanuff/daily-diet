import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { knex } from '../../../database'

export async function authUser(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<any> {
  const createUserSchema = z.object({
    name: z.string(),
    password: z.string(),
  })

  const { name, password } = createUserSchema.parse(request.body)

  const user = await knex('user')
    .where({ name: name, password: password })
    .first()

  if (!user) {
    throw new Error('User not found')
  }

  reply.cookie('session_id', String(user.session_id), {
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })

  reply.status(200).send({
    user: {
      name: user.name,
      created_at: user.created_at,
    },
  })
}
