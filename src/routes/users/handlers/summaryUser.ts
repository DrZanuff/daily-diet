import { FastifyReply, FastifyRequest } from 'fastify'
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

  const meals = await knex('meal').select('*').where({ user_id: userID })

  const results = meals.reduce(
    (result, meal) => {
      result.totalMeals += 1

      if (meal.on_diet) {
        result.onDietMeals += 1
        result.currentStreak += 1

        if (result.currentStreak > result.bestMealsStreak) {
          result.bestMealsStreak = result.currentStreak
        }
      } else {
        result.offDietMeals += 1
        result.currentStreak = 0
      }

      return result
    },
    {
      totalMeals: 0,
      onDietMeals: 0,
      offDietMeals: 0,
      bestMealsStreak: 0,
      currentStreak: 0,
    }
  )

  reply.status(200).send({
    summary: {
      totalMeals: results.totalMeals,
      onDietMeals: results.onDietMeals,
      offDietMeals: results.offDietMeals,
      bestOnDietMealsStreak: results.bestMealsStreak,
    },
  })
}
