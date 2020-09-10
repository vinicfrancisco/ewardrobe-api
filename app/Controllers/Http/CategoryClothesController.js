'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Clothes = use('App/Models/Clothes');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

class CategoryClothesController {
  async index({ request, response }) {
    const clothesWithCategories = await Clothes.query()
      .with('category')
      .fetch();

    const clothes = [...clothesWithCategories];

    // const bottomClothes = clothesWithCategories.find(
    //   clothes => clothes.category.type === 'bottom'
    // );

    // const topClothes = clothesWithCategories.find(
    //   clothes => clothes.category.type === 'top'
    // );

    // return response.send({
    //   top: topClothes,
    //   bottom: bottomClothes
    // });

    return response.send(clothes);
  }
}

module.exports = CategoryClothesController;
