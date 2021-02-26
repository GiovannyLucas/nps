import { app } from "../app";
import createConnection from "../database";
import { getConnection } from "typeorm";
import request from "supertest";

describe("Surveys", async () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  })

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  })

  it('should be able to create a new survey', async () => {
    const response = await request(app)
    .post('/surveys')
    .send({
      title: "Conte-nos sua opinião",
      description: "De 0 a 10, chama na bota pra nós"
    })

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  })

  it('should be able to get all surveys', async () => {
    await request(app)
    .post('/surveys')
    .send({
      title: "Conte-nos sua opinião 2",
      description: "De 0 a 10, chama na bota pra nós 2"
    })


    const response = await request(app)
    .get('/surveys')

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  })
})