'use strict';

/** @type {import('@adonisjs/framework/src/Route/Manager'} */
const Route = use('Route');

Route.group(() => {
  /**
   * HealthCheck
   */
  Route.get('healthcheck', ({ response }) => {
    return response.status(200).send('Health is OK!');
  });

  /**
   * AuthController routes.
   */
  Route.post('auth', 'AuthController.store');

  /**
   * UserController routes.
   */
  Route.post('users', 'UserController.store');

  /**
   * CategoryController routes.
   */
  Route.post('categories', 'CategoryController.store');
  Route.get('categories', 'CategoryController.index');

  /**
   * ClothesController routes.
   */
  Route.get('clothes', 'ClothesController.index');
  Route.post('clothes', 'ClothesController.store');
});
