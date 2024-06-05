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

test("GET /hotels debe traer todos las usuarios", async () => {
  const res = await request(app).get("/hotels");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /hotels debe crear un hotel", async () => {
  const newHotel = {
    name: "CityExpress",
    description: "hotel de paso",
    price: 1200,
    address: "5 de febrero",
    lat: "190092",
    long: "0991911",
  };
  const res = await request(app)
    .post("/hotels")
    .send(newHotel)
    .set("Authorization", `Bearer ${token}`);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(newHotel.name);
  expect(res.body.id).toBeDefined();
});

test("PUT /hotels/:id debe actualizar una ciudad ", async () => {
  const updateHotel = {
    price: 900,
  };
  const res = await request(app)
    .put("/hotels/" + id)
    .send(updateHotel)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.price).toBe(updateHotel.price);
});

test("DELETE /hotels/:id debe eliminar un hotel", async () => {
  const res = await request(app)
    .delete(`/hotels/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
