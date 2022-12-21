const Joi = require('joi');
const Router = require('@koa/router');

const likedFactsService = require('../service/likedFact');

const validate = require('./_validation.js');

const getAllLikedFacts = async (ctx) => {
  ctx.body = await likedFactsService.getAll();
};
getAllLikedFacts.validationScheme = {
  query: {
    page: Joi.number().integer().min(1).optional(),
    pageSize: Joi.number().integer().min(1).optional(),
  },
};

const findAllFromUserWithFact = async (ctx) => {
  ctx.body = await likedFactsService.findAllFromUserWithFact(ctx.params.userId);
};
findAllFromUserWithFact.validationScheme = {
  params: {
    userId: Joi.number().integer().positive(),
  },
};

const findAllFromUserWithFactAndCategory = async (ctx) => {
  ctx.body = await likedFactsService.findAllFromUserWithFactAndCategory(ctx.params.userId, ctx.params.categoryId);
};
findAllFromUserWithFactAndCategory.validationScheme = {
  params: {
    userId: Joi.number().integer().positive(),
    categoryId: Joi.number().integer().positive(),
  },
};

const createLikedFact = async (ctx) => {
  const newLikedFact = await likedFactsService.create(ctx.request.body);
  ctx.body = newLikedFact;
  ctx.status = 201;
};
createLikedFact.validationScheme = {
  body: {
    userId: Joi.number().integer().positive(),
    factId: Joi.number().integer().positive(),
  },
};


const getPlaceById = async (ctx) => {
  ctx.body = await likedFactsService.getById(Number(ctx.params.id));
};
getPlaceById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};


const updatePlace = async (ctx) => {
  ctx.body = await likedFactsService.updateById(ctx.params.id, ctx.request.body);
};
updatePlace.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    name: Joi.string().max(255),
    rating: Joi.number().min(1).max(5).integer(),
  },
};


const deleteById = async (ctx) => {
  await likedFactsService.deleteById(ctx.params.userId, ctx.params.factId);
  ctx.status = 204;
};
deleteById.validationScheme = {
  params: {
    userId: Joi.number().integer().positive(),
    factId: Joi.number().integer().positive(),
  },
};

/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/likedFacts',
  });

  router.get('/', validate(getAllLikedFacts.validationScheme), getAllLikedFacts); //v
  router.get('/:userId', validate(findAllFromUserWithFact.validationScheme), findAllFromUserWithFact); //v
  router.get('/:userId/:categoryId', validate(findAllFromUserWithFactAndCategory.validationScheme), findAllFromUserWithFactAndCategory); //v
  //router.post('/', validate(createLikedFact.validationScheme), createLikedFact);
  //router.get('/:id', validate(getPlaceById.validationScheme), getPlaceById);
  //router.put('/:id', validate(updatePlace.validationScheme), updatePlace);
  router.delete('/:userId/:factId', validate(deleteById.validationScheme), deleteById); //v

  app.use(router.routes()).use(router.allowedMethods());
};