'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LooksClothesSchema extends Schema {
  up() {
    this.create('looks_clothes', table => {
      table.uuid('id').primary();
      table
        .uuid('look_id')
        .references('id')
        .inTable('looks')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table
        .uuid('clothe_id')
        .references('id')
        .inTable('clothes')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table.timestamps();
    });
  }

  down() {
    this.drop('looks_clothes');
  }
}

module.exports = LooksClothesSchema;
