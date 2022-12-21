/* eslint-disable semi */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
//this file is used to test the fact.js file in the repository folder
//we use jest to test the functions in the fact.js file
/*
const createServer = require("../../src/createServer");
const supertest = require("supertest");
const {tables, getKnex} = require("../../src/data/index");
*/

const { withServer } = require("../helpers");
const { tables } = require("../../src/data/index");

const data = {
    facts: [ 
      { //factId: 1
        categoryId: 1,
        fact: 'De eerste mens die een vliegtuig bestuurde was een Belg.',
        id: 1,
   
      },
      { //factId 2
        categoryId: 2,
        fact: 'De eerste Belgische astronaut was Jean-François Clervoy.',
        id: 2,
    
      },
      { //factId 3
        categoryId: 3,
        fact: 'De eerste Belgische vrouwelijke astronaut was Claudie Haigneré.',
        id: 3,
 
      },
      { //factId 4
        categoryId: 1,
        fact:'A crocodile cannot stick its tongue out.' ,
        id: 4,
    
      },
      { //factId 5
        categoryId: 2,
        fact: 'A shrimp has his heart in its head',
        id: 5,
   
      }],
      users: [
      {//userId 1
        id: 1,
        firstName:'Fons',
        lastName:'Van Callenberge',
      },
      { //userId 2
        id: 2,
        firstName:'Palmyra',
        lastName:'Van Callenberge',
      },
      { //userId 3
        id: 3,
        firstName:'Pol',
        lastName:'Thijs',
      }],
      likedFacts: [
      { //likedFactId 1/1
            id: 1,
            userId: 1,
            factId: 1,
          },
          { //likedFactId 2/3
            id:2,
            userId: 2,
            factId: 3,
          },
          { //likedFactId 3/2
            id:3,
            userId: 3,
            factId: 2,
          },
          { //likedFactId 1/3
            id:4,
            userId: 1,
            factId: 3,
          },
          { //likedFactId 2/1
            id:5,
            userId: 2,
            factId: 1,
          }
        ],
     categories: [
        { //categoryId 1
            id: 4,
            name: 'geschiedenis',
          },
          { //categoryId 2
            id: 5,
            name: 'wetenschap',
          },
          { //categoryId 3
            id: 6,
            name: 'andere',
          }
     ],
}

const dataToDelete = {
    facts: [1,2,3,4,5],
    //sers: [1,2,3],
    //likedFacts: [1,2,3,4,5],
    categories: [1,2,3],
  };


describe('fact',  () => {
    let request;
    let knex;

    withServer(({ knex: k, request: r }) => {
        knex = k;
        request = r;
      });
    
/*
  beforeAll(async () => {
    server = await createServer();
    request = supertest(server.getApp(),callback());
    knex = getKnex();

  })

  afterAll(async () => {
    await server.stop();
    
  })
*/
  const url = '/api/facts';

  describe('GET /api/facts', () => {
     /*
    beforeAll(async () => {
        
       await knex(tables.fact).insert(data.facts);
    })

    afterAll(async () => {
       //await getKnex(tables.fact).whereIn('id', dataToDelete.facts).delete();
    })
*/
    it('should return 200 and all facts', async () => {
      const response = await request.get(url);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(5);
    })
    })
  
  //write a test function for the getFactById function
    describe('GET /api/facts/:id', () => {
        it('should return 200 and the fact with the given id', async () => {
            const response = await request.get(`${url}/1`);
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
            expect(response.body.fact).toBe('De eerste mens die een vliegtuig bestuurde was een Belg.');
            expect(response.body.categoryId).toBe(1);
        })
    })

    //write a test function for createFact function
    describe('POST /api/facts', () => {
        it('should return 201 and the created fact', async () => {
            const response = await request.post(url).send({
                fact: 'testFact',
                categoryId: 1,
            });
            expect(response.status).toBe(201);
            expect(response.body.id).toBe(6);
            expect(response.body.fact).toBe('testFact');
            expect(response.body.categoryId).toBe(1);
        })

    })

    //write a test function for updateFact function
    describe('PUT /api/facts/:id', () => {
        it('should return 200 and the updated fact', async () => {
            const response = await request.put(`${url}/1`).send({
                fact: 'De eerste mens die een vliegtuig bestuurde was een Belg.',
                categoryId: 1,
            });
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
            expect(response.body.fact).toBe('De eerste mens die een vliegtuig bestuurde was een Belg.');
            expect(response.body.categoryId).toBe(1);
        })
    })

    //write a test function for deleteFact function
    describe('DELETE /api/facts/:id', () => {
        it('should return 200 and the deleted fact', async () => {
            const response = await request.delete(`${url}/6`);
            expect(response.status).toBe(204);
            //expect(response.body.id).toBe(1);
           // expect(response.body.fact).toBe('testFact');
           // expect(response.body.categoryId).toBe(1);
        })
    })















})

/*
describe("findAll", () => {

    it("should return all facts", async () => {
        const facts = await factService.findAll();
        expect(facts).toHaveLength(3);
        expect(facts[0]).toHaveProperty("id");
        expect(facts[0]).toHaveProperty("fact");
        expect(facts[0]).toHaveProperty("categoryId");
    });
});
*/


