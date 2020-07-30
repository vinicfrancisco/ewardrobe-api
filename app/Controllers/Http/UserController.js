'use strict';

const { uuid } = use('uuidv4');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

class UserController {
  /**
   * Store  a new user.
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {AuthSession} ctx.auth
   */
  async store({ request, response, auth }) {
    const data = request.only([
      'name',
      'nickname',
      'email',
      'genre',
      'password'
    ]);

    const user = await User.create({
      id: uuid(),
      ...data
    });

    const { token } = await auth.attempt(user.email, user.password);

    return response.send({ token, user });
  }
}

module.exports = UserController;
