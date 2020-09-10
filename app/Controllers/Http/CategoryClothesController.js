'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Clothes = use('App/Models/Clothes');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

class CategoryClothesController {
  async index({ request, response }) {
    const topClothes = await Clothes.query()
      .with('category', builder =>
        builder.where({
          type: 'top'
        })
      )
      .fetch();

    const bottomClothes = await Clothes.query()
      .with('category', builder =>
        builder.where({
          type: 'bottom'
        })
      )
      .fetch();

    return response.send({
      top: topClothes,
      bottom: bottomClothes
    });
  }
}

module.exports = CategoryClothesController;
