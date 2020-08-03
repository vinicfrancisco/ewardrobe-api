'use strict';

const { uuid } = use('uuidv4');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Category = use('App/Models/Category');

const AppError = use('App/Exceptions/AppError');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

class CategoryController {
  /**
   * Store  a new category.
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(['name', 'type']);

    const findCategory = await Category.findBy('name', data.name);

    if (findCategory) {
      throw new AppError(
        `Category {${findCategory.name}} already exists`,
        403,
        'CategoryAlreadyExists'
      );
    }

    const category = await Category.create({
      id: uuid(),
      ...data
    });

    return response.send(category);
  }

  /**
   * List all categories and its clothes.
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index({ response }) {
    const categories = await Category.query().with('clothes').fetch();

    return response.send(categories);
  }
}

module.exports = CategoryController;
