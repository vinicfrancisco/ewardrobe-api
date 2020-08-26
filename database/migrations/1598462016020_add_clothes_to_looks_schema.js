'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddClothesToLooksSchema extends Schema {
  up() {
    this.table('looks', table => {
      table
        .uuid('top_clothes_id')
        .references('id')
        .inTable('clothes')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table
        .uuid('bottom_clothes_id')
        .references('id')
        .inTable('clothes')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
    });
  }

  down() {
    this.table('looks', table => {
      table.dropColumn('top_clothes_id');
      table.dropColumn('bottom_clothes_id');
    });
  }
}

module.exports = AddClothesToLooksSchema;
