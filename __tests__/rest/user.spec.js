/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
const { withServer } = require("../helpers");
const { tables } = require("../../src/data/index");


describe('user',  () => {
    let request;
    let knex;
    let authHeader;
    withServer(({ knex: k, request: r, authHeader:h }) => {
        knex = k;
        request = r;
        authHeader = h;
      });

      const url = '/api/users';


    //write a test function for findAll
    describe('GET /api/users', () => {
    it('should return 200 and all users', async () => {
        const response = await request.get(url).set('Authorization', authHeader);
        expect(response.status).toBe(200);
        expect(response.body.items.length).toBe(3);
        })
    })
    
    //write a test function for findById
    describe('GET /api/users/:id', () => {
        it('should return 200 and the user with the given id', async () => {
            const response = await request.get(`${url}/1`).set('Authorization', authHeader);
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
        })
    }
    )

    //write a test function for createUser
    describe('POST /api/users', () => {
        it('should return 201 and create a new user', async () => {
            const response = await request.post(url).send({
                firstName: 'Test1',
                lastName: 'test2'
            }).set('Authorization', authHeader);
            expect(response.status).toBe(201);
        })
    })   

    //write a test function for deleteById
    describe('DELETE /api/users/:id', () => {
        it('should return 204 and delete a user', async () => {
            const response = await request.delete(`${url}/1`).set('Authorization', authHeader);
            expect(response.status).toBe(204);
        })
    }
    )








})
