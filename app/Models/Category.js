'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Category extends Model {
  static boot() {
    super.boot();
  }

  /**
   * A category has many clothes
   */
  clothes() {
    return this.hasMany('App/Models/Clothes');
  }
}

module.exports = Category;
