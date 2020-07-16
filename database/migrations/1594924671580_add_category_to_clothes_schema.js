'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddCategoryToClothesSchema extends Schema {
  up() {
    this.table('clothes', table => {
      table
        .uuid('category_id')
        .references('id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
    });
  }

  down() {
    this.table('users', table => {
      table.dropColumn('category_id');
    });
  }
}

module.exports = AddCategoryToClothesSchema;
