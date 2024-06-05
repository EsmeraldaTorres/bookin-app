const app = require("../app");
const request = require("supertest");
let id;
let token;

beforeAll(async () => {
  const credentials = {
    email: "juan@gmail.com",
    password: "juan1234",
  };
  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
});

test("GET /cities debe traer todas las ciudades", async () => {
  const res = await await request(app).get("/cities");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /cities debe crear una ciudad", async () => {
  const newCity = {
    name: "Cartagena",
    country: "Colombia",
    countryId: "COl",
  };
  const res = await request(app)
    .post("/cities")
    .send(newCity)
    .set("Authorization", `Bearer ${token}`);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(newCity.name);
});

test("PUT /cities/:id debe actualizar una ciudad ", async () => {
  const updateCity = {
    name: "Medellin",
  };
  const res = await request(app)
    .put("/cities/" + id)
    .send(updateCity)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updateCity.name);
});

test("DELETE /cities/:id debe eliminar una ciudad", async () => {
  const res = await request(app)
    .delete(`/cities/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
