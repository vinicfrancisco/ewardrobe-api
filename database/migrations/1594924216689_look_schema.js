'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LookSchema extends Schema {
  up() {
    this.create('looks', table => {
      table.uuid('id').primary();
      table.string('name', 80);
      table
        .uuid('user_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table.timestamps();
    });
  }

  down() {
    this.drop('looks');
  }
}

module.exports = LookSchema;
