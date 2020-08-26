'use strict';

const { uuid } = use('uuidv4');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Look = use('App/Models/Look');

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

    const look = await Look.create({
      id: uuid(),
      name,
      bottom_clothes_id,
      top_clothes_id
      // user_id: auth.user.id
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
      .with('bottom')
      .with('top')
      // .where('user_id', auth.user.id)
      .fetch();

    return response.send(looks);
  }

  async destroy({ response, params }) {
    const { id } = params;

    const look = await Look.find(id);

    if (!look) {
      throw new AppError(
        `Look with id: ${id} does not exists`,
        404,
        'LookNotFound'
      );
    }

    await look.delete();

    return response.status(204).send();
  }
}

module.exports = LooksController;
