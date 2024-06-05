const app = require("../app");
const request = require("supertest");

let token;
let id;

beforeAll(async () => {
  const credentials = {
    email: "juan@gmail.com",
    password: "juan1234",
  };
  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
});

test("GET /reviews debe traer todos los reviews", async () => {
  const res = await request(app)
    .get("/reviews")
    .set("Authorization", `Bearer ${token}`);
  console.log(token, "token");
  console.log(res.body, "res body");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /reviews debe crear un review", async () => {
  const newReview = {
    comment: "lorem",
    rating: 3,
  };

  const res = await request(app)
    .post("/reviews")
    .send(newReview)
    .set("Authorization", `Bearer ${token}`);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.comment).toBe(newReview.comment);
});

test("PUT /reviews/:id debe actualizar una ciudad ", async () => {
  const updateReview = {
    rating: 4,
  };
  const res = await request(app)
    .put("/reviews/" + id)
    .send(updateReview)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.rating).toBe(updateReview.rating);
});

test("DELETE /reviews/:id debe eliminar un review", async () => {
  const res = await request(app)
    .delete(`/reviews/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
