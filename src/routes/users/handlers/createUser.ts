import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { knex } from '../../../database'
import { randomUUID } from 'node:crypto'

export async function createUser(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<any> {
  const createUserSchema = z.object({
    name: z.string(),
    password: z.string(),
  })

  const { name, password } = createUserSchema.parse(request.body)

  if (name === '' || password === '') {
    throw new Error('Name and Password cannot be empty.')
  }

  if (name.length < 3 || password.length < 3) {
    throw new Error('Name and Password must have at least 3 characters.')
  }

  const sessionID = randomUUID()

  await knex('user').insert({
    id: randomUUID(),
    name,
    password,
    created_at: new Date().toISOString(),
    session_id: sessionID,
  })

  reply.cookie('session_id', sessionID, {
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })

  reply.status(201).send(`User created: ${name}.`)
}
