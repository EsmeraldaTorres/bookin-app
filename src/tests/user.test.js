const app = require("../app");
const request = require("supertest");
let id;
let token;

test("POST /users debe crear un usuario", async () => {
  const newUser = {
    firstName: "test user",
    lastName: "test user",
    email: "pruebaseis@gmail.com",
    password: "test123",
    gender: "other",
  };
  const res = await request(app).post("/users").send(newUser);
  id = res.body.id;
  console.log(res.body, "resbody post users");
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(newUser.firstName);
});

test("POST /users/login debe loggear al usuario", async () => {
  const credentials = {
    email: "pruebaseis@gmail.com",
    password: "test123",
  };
  const res = await request(app).post(`/users/login`).send(credentials);
  token = res.body.token;
  expect(res.status).toBe(200);
  expect(res.body.token).toBeDefined();
  expect(res.body.user.email).toBe(credentials.email);
});

test("GET /users debe traer todos los usuarios", async () => {
  const res = await await request(app)
    .get("/users")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("PUT /users/:id debe actualizar un usuario ", async () => {
  const updateUser = {
    firstName: "James Francis",
  };
  const res = await request(app)
    .put("/users/" + id)
    .send(updateUser)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(updateUser.firstName);
});

test("POST /users/login con credenciales incorrectas debe dar error", async () => {
  const credentials = {
    email: "incorrecto@gmail.com",
    password: "incorrecto1234",
  };
  const res = await request(app).post("/users/login").send(credentials);
  expect(res.status).toBe(401);
});

test("DELETE /users/:id debe eliminar un usuario", async () => {
  const res = await request(app)
    .delete(`/users/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
