'use strict';

const { uuid } = use('uuidv4');
const { hash } = use('bcryptjs');

const Drive = use('Drive');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Clothes = use('App/Models/Clothes');

const AppError = use('App/Exceptions/AppError');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

class ClothesController {
  /**
   * Store  new clothes.
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const body = {};

    const validationOptions = {
      types: ['jpeg', 'jpg', 'png']
    };

    let fileName = '';
    let imageUrl = '';

    await request.multipart.field((name, value) => {
      body[name] = value;
    });

    request.multipart.file('clothes_image', validationOptions, async file => {
      file.size = file.stream.byteCount;

      await file.runValidations();

      const error = file.error();

      if (error.message) {
        throw new AppError('Cannot validate file', 400, 'FileValidation');
      }

      fileName = await hash(file.clientName, 8);

      imageUrl = await Drive.put(fileName, file.stream, {
        ContentType: file.headers['content-type'],
        ACL: 'public-read'
      });
    });

    await request.multipart.process();

    const clothes = await Clothes.create({
      id: uuid(),
      clothes_url: imageUrl,
      // user_id: auth.user.id,
      ...body
    });

    return response.send(clothes);
  }

  /**
   * List all clothes.
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index({ response, auth }) {
    const clothes = await Clothes.query()
      // .where('user_id', auth.user.id)
      .fetch();

    return response.send(clothes);
  }

  async destroy({ response, params }) {
    const { id } = params;

    const clothes = await Clothes.find(id);

    if (!clothes) {
      throw new AppError(
        `Clothes with id: ${id} does not exists`,
        404,
        'ClothesNotFound'
      );
    }

    await clothes.delete();

    return response.status(204).send();
  }
}

module.exports = ClothesController;
