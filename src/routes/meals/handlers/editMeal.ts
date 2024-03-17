import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { knex } from '../../../database'

export async function editMeal(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<any> {
  const editMealSchema = z.object({
    description: z.string().optional(),
    date_time: z.string().optional(),
    on_diet: z.boolean().optional(),
    id: z.string(),
  })

  const { on_diet, date_time, description, id } = editMealSchema.parse(
    request.body
  )

  const userSessionIDCookie = request.cookies['session_id']

  const user = await knex('user')
    .select('id')
    .where({ session_id: userSessionIDCookie })
    .first()

  const userID = user?.id

  if (!userID) {
    throw new Error('User not found.')
  }

  const meal = await knex('meal')
    .select('*')
    .where({ id })
    .andWhere({ user_id: userID })
    .first()

  if (!meal) {
    throw new Error('Meal not found.')
  }

  await knex('meal')
    .where({ id })
    .update({
      date_time: date_time ? date_time : meal.date_time,
      description: description ? description : meal.description,
      on_diet: on_diet !== undefined ? on_diet : meal.on_diet,
    })

  reply.status(204)
}
