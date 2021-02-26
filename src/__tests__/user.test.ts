import { app } from "../app";
import createConnection from "../database";
import { getConnection } from "typeorm";
import request from "supertest";

describe("Users", async () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  })

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  })

  it('should be able to create a new user', async () => {
    const response = await request(app)
    .post('/users')
    .send({
      name: "Giovanny",
      email: "giovanny@mail.com"
    })

    expect(response.status).toBe(201);
  })

  it('should not be able to create a user with existent email', async () => {
    const response = await request(app)
    .post('/users')
    .send({
      name: "Giovanny",
      email: "giovanny@mail.com"
    })

    expect(response.status).toBe(409);
  })
})