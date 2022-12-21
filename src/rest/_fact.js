const Joi = require('joi');
const Router = require('@koa/router');

const factService = require('../service/fact');

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
  const newFact = await factService.create(ctx.request.body);
  ctx.body = newFact;
  ctx.status = 201;
};

createFact.validationScheme = {
  body: {
    fact: Joi.string(),
    categoryId: Joi.number().positive().integer(),
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

  router.get('/', validate(getAllFacts.validationScheme), getAllFacts); //v
  router.post('/', validate(createFact.validationScheme), createFact); //v
  router.get('/:id', validate(getFactById.validationScheme), getFactById); //v
  router.put('/:id', validate(updateFact.validationScheme), updateFact);//v
  router.delete('/:id', validate(deleteTransaction.validationScheme), deleteTransaction); //v

  app.use(router.routes()).use(router.allowedMethods());
};