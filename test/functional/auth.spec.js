'use strict';

const { uuid } = use('uuidv4');

const { test, trait } = use('Test/Suite')('Auth');
trait('Test/ApiClient');
trait('DatabaseTransactions');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

const createUser = async (data = {}) => {
  return await User.create({
    id: uuid(),
    name: 'John Doe',
    nickname: 'John',
    sex: 'male',
    email: 'john@gmail.com',
    password: '123456',
    ...data
  });
};

/**
 * AuthController.store (Login) tests.
 */
test('should authenticate with valid credentials', async ({ client }) => {
  const user = await createUser();

  const response = await client
    .post('/auth')
    .send({
      email: user.email,
      password: '123456'
    })
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

test('should not authenticate with invalid password', async ({ client }) => {
  await createUser();

  const response = await client
    .post('/auth')
    .send({
      email: 'john@gmail.com',
      password: '123456789'
    })
    .end();

  response.assertStatus(401);
});

test('should not authenticate with email that does not exists', async ({
  client
}) => {
  await createUser();

  const response = await client
    .post('/auth')
    .send({
      email: 'john123@gmail.com',
      password: '123456'
    })
    .end();

  response.assertStatus(404);
});

test('should not authenticate with invalid email', async ({ client }) => {
  const response = await client
    .post('/auth')
    .send({
      email: 'john',
      password: '123456'
    })
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({
    error: {
      code: 'E_VALIDATION_FAILED'
    }
  });
});

test('should not authenticate with a password with less than 6 characters', async ({
  client
}) => {
  const response = await client
    .post('/auth')
    .send({
      email: 'john@gmail.com',
      password: '123'
    })
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({
    error: {
      code: 'E_VALIDATION_FAILED'
    }
  });
});

test('should not authenticate without an email provided', async ({
  client
}) => {
  const response = await client
    .post('/auth')
    .send({
      password: '123456'
    })
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({
    error: {
      code: 'E_VALIDATION_FAILED'
    }
  });
});

test('should not authenticate without a password provided', async ({
  client
}) => {
  const response = await client
    .post('/auth')
    .send({
      email: 'john@gmail.com'
    })
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({
    error: {
      code: 'E_VALIDATION_FAILED'
    }
  });
});
