import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('proffy', table => {
    table.increments('id').primary();
    table.string('whatsapp').notNullable();
    table.string('bio').notNullable();

    table.string('user_id')
      .references('id')
      .inTable('users')
      .notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('proffy');
}