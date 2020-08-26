'use strict';

/** @type {import('@adonisjs/framework/src/Route/Manager'} */
const Route = use('Route');

Route.group(() => {
  /**
   * ClothesController routes.
   */
  Route.get('clothes', 'ClothesController.index');
  Route.post('clothes', 'ClothesController.store');
  Route.delete('clothes/:id', 'ClothesController.destroy');

  /**
   * LooksController routes.
   */
  Route.get('looks', 'LooksController.index');
  Route.post('looks', 'LooksController.store');
  Route.delete('looks/:id', 'LooksController.destroy');
});
