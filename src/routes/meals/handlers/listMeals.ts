import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { knex } from '../../../database'

export async function listMeals(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<any> {
  const editMealSchema = z.object({
    id: z.string().optional(),
  })

  const { id } = editMealSchema.parse(request.body)

  const userSessionIDCookie = request.cookies['session_id']

  const user = await knex('user')
    .select('id')
    .where({ session_id: userSessionIDCookie })
    .first()

  const userID = user?.id

  if (!userID) {
    throw new Error('User not found.')
  }

  if (id) {
    const meal = await knex('meal')
      .select('description', 'date_time', 'on_diet', 'id')
      .where({ id })
      .and.where({ user_id: userID })

    return reply.status(200).send({ meals: meal })
  }

  const meals = await knex('meal')
    .select('description', 'date_time', 'on_diet', 'id')
    .where({ user_id: userID })

  reply.status(200).send({ meals })
}
