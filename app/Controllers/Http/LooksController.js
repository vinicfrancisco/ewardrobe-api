'use strict';

const { uuid } = use('uuidv4');

const Database = use('Database');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Look = use('App/Models/Look');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Clothes = use('App/Models/Clothes');

const AppError = use('App/Exceptions/AppError');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

class LooksController {
  /**
   * Store  a new look.
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const { name, top_clothes_id, bottom_clothes_id } = request.only([
      'name',
      'top_clothes_id',
      'bottom_clothes_id'
    ]);

    const topClothes = await Clothes.find(top_clothes_id);
    const bottomClothes = await Clothes.find(bottom_clothes_id);

    if (!topClothes || !bottomClothes) {
      throw new AppError('Clothes not found', 404, 'ClothesNotFound');
    }

    const look = await Look.create({
      id: uuid(),
      name,
      user_id: auth.user.id
    });

    await Database.table('looks_clothes').insert({
      id: uuid(),
      clothe_id: topClothes.id,
      look_id: look.id
    });

    await Database.table('looks_clothes').insert({
      id: uuid(),
      clothe_id: bottomClothes.id,
      look_id: look.id
    });

    return response.send(look);
  }

  /**
   * List all looks.
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index({ response, auth }) {
    const looks = await Look.query()
      .with('clothes')
      .where('user_id', auth.user.id)
      .fetch();

    return response.send(looks);
  }
}

module.exports = LooksController;
