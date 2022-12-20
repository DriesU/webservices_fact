const Joi = require('joi');
const Router = require('@koa/router');

const transactionService = require('../service/transaction');

const validate = require('./_validation.js');

const getAllFacts = async (ctx) => {
  ctx.body = await transactionService.getAll();
};
getAllFacts.validationScheme = {
  query: Joi.object({
    limit: Joi.number().positive().max(1000).optional(),
    offset: Joi.number().min(0).optional(),
  }).and('limit', 'offset'),
};

const createFact = async (ctx) => {
  const newFact = await transactionService.create(ctx.request.body);
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
  ctx.body = await transactionService.getById(ctx.params.id);
};
getFactById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const updateFact = async (ctx) => {
  ctx.body = await transactionService.updateById(ctx.params.id, {
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
  await transactionService.deleteById(ctx.params.id);
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
  router.put('/:id', validate(updateFact.validationScheme), updateFact);
  router.delete('/:id', validate(deleteTransaction.validationScheme), deleteTransaction);

  app.use(router.routes()).use(router.allowedMethods());
};