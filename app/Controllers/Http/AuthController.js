'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

const AppError = use('App/Exceptions/AppError');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

class AuthController {
  /**
   * Authenticate credentials and return user and token.
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {AuthSession} ctx.auth
   */
  async store({ request, response, auth }) {
    const { email, password } = request.only(['email', 'password']);

    const user = await User.findBy('email', email);

    if (!user) {
      throw new AppError(
        `User with email: ${email} does not exists`,
        404,
        'UserNotFound'
      );
    }

    const { token } = await auth.attempt(email, password);

    return response.send({ token, user });
  }
}

module.exports = AuthController;
