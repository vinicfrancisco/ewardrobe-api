'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ClothesSchema extends Schema {
  up() {
    this.create('clothes', table => {
      table.uuid('id').primary();
      table.string('name', 80);
      table.string('clothes_url');
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
    this.drop('clothes');
  }
}

module.exports = ClothesSchema;
