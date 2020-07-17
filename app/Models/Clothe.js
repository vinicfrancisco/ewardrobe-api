'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Clothe extends Model {
  static boot() {
    super.boot();
  }

  /**
   * Clothes belongs to many looks (Many to Many pivot table)
   */
  looks() {
    return this.belongsToMany('App/Models/Look').pivotTable('looks_clothes');
  }

  /**
   * Clothes belongs to a category
   */
  categories() {
    return this.belongsTo('App/Models/Category');
  }
}

module.exports = Clothe;
