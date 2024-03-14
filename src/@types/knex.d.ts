import { knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    user: {
      id: string
      name: string
      password: string
      created_at: string
      session_id?: string
    }
    meal: {
      id: string
      description: string
      date_time: string
      on_diet: boolean
    }
  }
}
