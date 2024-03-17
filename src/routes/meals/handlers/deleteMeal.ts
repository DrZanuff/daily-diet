import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { knex } from '../../../database'

export async function deleteMeal(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<any> {
  const deleteMealSchema = z.object({
    id: z.string(),
  })

  const { id } = deleteMealSchema.parse(request.body)

  const userSessionIDCookie = request.cookies['session_id']

  const user = await knex('user')
    .select('id')
    .where({ session_id: userSessionIDCookie })
    .first()

  const userID = user?.id

  if (!userID) {
    throw new Error('User not found.')
  }

  await knex('meal').where({ id }).and.where({ user_id: userID }).delete()

  reply.status(204)
}
