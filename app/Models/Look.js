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
   * A look has a top clothes
   */
  top() {
    return this.hasOne('App/Models/Clothes', 'top_clothes_id', 'id');
  }

  /**
   * A look has a top clothes
   */
  bottom() {
    return this.hasOne('App/Models/Clothes', 'bottom_clothes_id', 'id');
  }
}

module.exports = Look;
