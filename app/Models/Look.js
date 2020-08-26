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
    return this.hasOne('App/Models/Clothes', 'id', 'top_clothes_id');
  }

  /**
   * A look has a top clothes
   */
  bottom() {
    return this.hasOne('App/Models/Clothes', 'id', 'bottom_clothes_id');
  }
}

module.exports = Look;
