const Joi = require('joi');
const Router = require('@koa/router');

const factService = require('../service/fact');
const userService = require('../service/user');
const {addUserInfo} = require('../core/auth');
const {permissions, hasPermission} = require('../core/auth');

const validate = require('./_validation.js');

const getAllFacts = async (ctx) => {
  ctx.body = await factService.getAll();
};
getAllFacts.validationScheme = {
  query: Joi.object({
    limit: Joi.number().positive().max(1000).optional(),
    offset: Joi.number().min(0).optional(),
  }).and('limit', 'offset'),
};

const createFact = async (ctx) => {
  let userId = 0;
  try{
    console.log("hey");
    const user = await userService.getByAuth0Id(ctx.state.user.sub);
    console.log("hoi");
    userId = user.id;
  } catch (error) {
    await addUserInfo(ctx);
    userId = await userService.createUser({
      firstName: ctx.state.user.firstName,
      lastName: ctx.state.user.lastName,
      auth0Id: ctx.state.user.sub,
    });
  }
  const newFact = await factService.create(ctx.request.body);
  ctx.body = newFact,
  userId;
  ctx.status = 201;
};

createFact.validationScheme = {
  body: {
    fact: Joi.string(),
    categoryId: Joi.number().positive().integer(),
    //userId: Joi.number().positive().integer(), //this is not needed
  },
};


const getFactById = async (ctx) => {
  ctx.body = await factService.getById(ctx.params.id);
};
getFactById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const updateFact = async (ctx) => {
  ctx.body = await factService.updateById(ctx.params.id, {
    ...ctx.request.body,
  });
};
updateFact.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    fact: Joi.string(),
    categoryId: Joi.number().positive().integer(),
  },
};

const deleteTransaction = async (ctx) => {
  await factService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteTransaction.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};


module.exports = (app) => {
  const router = new Router({
    prefix: '/facts',
  });

  router.get('/', hasPermission(permissions.loggedIn), validate(getAllFacts.validationScheme), getAllFacts); //v
  router.post('/', hasPermission(permissions.write), validate(createFact.validationScheme), createFact); //v
  router.get('/:id', hasPermission(permissions.read),validate(getFactById.validationScheme), getFactById); //v
  router.put('/:id', hasPermission(permissions.write),validate(updateFact.validationScheme), updateFact);//v
  router.delete('/:id', hasPermission(permissions.write),validate(deleteTransaction.validationScheme), deleteTransaction); //v

  app.use(router.routes()).use(router.allowedMethods());
};