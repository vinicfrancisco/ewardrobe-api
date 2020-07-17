'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Look extends Model {
  static boot() {
    super.boot();
  }

  /**
   * A look belongs to an User
   */
  user() {
    return this.belongsTo('App/Models/User');
  }

  /**
   * A look belongs to many Clothes (Many to Many pivot table)
   */
  clothes() {
    return this.belongsToMany('App/Models/Clothes').pivotTable('looks_clothes');
  }
}

module.exports = Look;
