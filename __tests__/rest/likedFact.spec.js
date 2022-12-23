/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
const { withServer } = require("../helpers");
const { tables } = require("../../src/data/index");


describe('likedFact',  () => {
    let request;
    let knex;
    let authHeader;

    withServer(({ knex: k, request: r,authHeader:h }) => {
        knex = k;
        request = r;
        authHeader = h;
      });

      const url = '/api/likedFacts';


    //write a test function for findALLLikedFacts
    describe('GET /api/likedFacts', () => {
        it('should return 200 and all liked facts', async () => {
            const response = await request.get(url).set('Authorization', authHeader);
            expect(response.status).toBe(200);
            expect(response.body.items.length).toBe(5);
        })
    })

    //write a test function for findAllFromUserWithFact
    describe('GET /api/likedFacts/:userId', () => {
        it('should return 200 and all liked facts from a specific user', async () => {
            const response = await request.get(`${url}/1`).set('Authorization', authHeader);
            expect(response.status).toBe(200);
            expect(response.body.items.length).toBe(2);
        })
    }
    )

    //write a test function for findAllFromUserWithFactAndCategory
    describe('GET /api/likedFacts/:userId/:categoryId', () => {
        it('should return 200 and all liked facts from a specific user and category', async () => {
            const response = await request.get(`${url}/1/1`).set('Authorization', authHeader);
            expect(response.status).toBe(200);
            expect(response.body.items.length).toBe(2);
        })
    }
    )
    
    //write a test function for deleteById (userId and factId)
    describe('DELETE /api/likedFacts/:userId/:factId', () => {
        it('should return 204 and delete a liked fact', async () => {
            const response = await request.delete(`${url}/1/3`).set('Authorization', authHeader);
            expect(response.status).toBe(204);
        })
    }
    )
 















});