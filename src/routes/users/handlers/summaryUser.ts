import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { knex } from '../../../database'

export async function summaryUser(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<any> {
  const userSessionIDCookie = request.cookies['session_id']

  const user = await knex('user')
    .select('id')
    .where({ session_id: userSessionIDCookie })
    .first()

  const userID = user?.id

  if (!userID) {
    throw new Error('User not found.')
  }

  const meals = await knex('meal')
    .select('description', 'date_time', 'on_diet', 'id')
    .where({ user_id: userID })

  reply.status(200).send({ meals })
}
