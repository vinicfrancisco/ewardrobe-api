'use strict';

const Logger = use('Logger');
const Env = use('Env');
const Youch = use('youch');
const BaseExceptionHandler = use('BaseExceptionHandler');

/**
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { request, response }) {
    /**
     * Format Validation error data.
     */
    if (error.name === 'ValidationException') {
      error.message = error.messages;
    }

    /**
     * Format error data.
     */
    const youch = new Youch(error, request.request);
    const errorJSON = await youch.toJSON();

    delete errorJSON.error.message;

    /**
     * Return code, message and all error data
     */
    return response.status(error.status).send({
      error: {
        code: error.code,
        message: error.message,
        ...errorJSON.error
      }
    });
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report(error, { request, auth }) {
    if (Env.get('NODE_ENV') !== 'testing') {
      Logger.error(error);
    }
  }
}

module.exports = ExceptionHandler;
