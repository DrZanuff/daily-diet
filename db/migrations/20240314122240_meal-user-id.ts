import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('meal', (table) => {
    table.uuid('user_id').index()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('meal', (table) => {
    table.dropIndex('user_id')
    table.dropColumn('user_id')
  })
}
