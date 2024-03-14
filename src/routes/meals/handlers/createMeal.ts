import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { knex } from '../../../database'

export async function createMeal(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<any> {
  const createMealSchema = z.object({
    description: z.string(),
    date_time: z.string(),
    on_diet: z.boolean(),
  })

  const { on_diet, date_time, description } = createMealSchema.parse(
    request.body
  )

  const userSessionIDCookie = request.cookies['session_id']

  const user = await knex('user')
    .select('id')
    .where({ session_id: userSessionIDCookie }) // TODO - fix not finding user ID
    .first()

  const userID = user?.id

  if (!userID) {
    throw new Error('User not found.')
  }

  await knex('meal').insert({
    description,
    date_time,
    on_diet,
    id: userID,
  })

  reply.status(201)
}
