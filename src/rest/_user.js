const Joi = require('joi');
const Router = require('@koa/router');

const userService = require('../service/user');

const validate = require('./_validation');

const getAllUsers = async (ctx) => {
  ctx.body = await userService.getAll();
  ctx.status = 200;
};
getAllUsers.validationScheme = {
  query: Joi.object({
    limit: Joi.number().positive().max(1000).optional(),
    offset: Joi.number().min(0).optional(),
  }).and('limit', 'offset'),
};


const getUserById = async (ctx) => {
  const user = await userService.getById(ctx.params.id);
  ctx.body = user;
};
getUserById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

/*
const updateUserById = async (ctx) => {
  ctx.body = await userService.updateById(ctx.params.id, ctx.request.body);

};
updateUserById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  Body: {
    firstName: Joi.string(),
    lastName: Joi.string(),
  },
};
*/


//finsih the update function
const updateUserById = async (ctx) => {
  ctx.body = await userService.updateUserById(ctx.params.id, {
    ...ctx.request.body,
  });
};
updateUserById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    firstName: Joi.string(),
    lastName: Joi.string(),
  },
};




const deleteUserById = async (ctx) => {
  await userService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteUserById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const createUser = async (ctx) => {

  const newUser = await userService.createUser(ctx.request.body);
  ctx.body = newUser;
  ctx.status = 201;
};
createUser.validationScheme = {
  body: {
    firstName: Joi.string(),
    lastName: Joi.string(),
  },
};


module.exports = function installUsersRoutes(app) {
  const router = new Router({
    prefix: '/users',
  });

  router.get('/', validate(getAllUsers.validationScheme), getAllUsers); //v
  router.get('/:id', validate(getUserById.validationScheme), getUserById); //v
  router.post('/', validate(createUser.validationScheme), createUser); //v
  //router.put('/:id', validate(updateUserById.validationScheme), updateUserById); // empty update call ????!!
  router.delete('/:id', validate(deleteUserById.validationScheme), deleteUserById); //v

  app
    .use(router.routes())
    .use(router.allowedMethods());
};