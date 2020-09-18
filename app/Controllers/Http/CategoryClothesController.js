'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Clothes = use('App/Models/Clothes');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

class CategoryClothesController {
  async index({ request, response }) {
    const topClothes = await Clothes.query()
      .where('category_id', 'b380a5f7-2f31-4085-989b-785a98aadc58')
      .fetch();

    const bottomClothes = await Clothes.query()
      .where('category_id', 'dfd8421e-43cb-45e2-93a6-c9b4e970a177')
      .fetch();

    return response.send({
      top: topClothes,
      bottom: bottomClothes
    });
  }
}

module.exports = CategoryClothesController;
