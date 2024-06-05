const app = require("../app");
const request = require("supertest");
const moment = require("moment");

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

test("GET /booking debe traer todos los reviews", async () => {
  const res = await request(app)
    .get("/booking")
    .set("Authorization", `Bearer ${token}`);
  console.log(token, "token");
  console.log(res.body, "res body");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /booking debe crear un nuevo booking", async () => {
  const newBooking = {
    checkOut: "2024-06-27",
    checkIn: "2024-06-17",
  };
  console.log(newBooking, "newBooking");
  console.log(newBooking.checkIn, "newBooking.checkIn");

  const res = await request(app)
    .post("/booking")
    .send(newBooking)
    .set("Authorization", `Bearer ${token}`);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  //   expect(res.body.checkIn).toBe(newBooking.checkIn);
});

test("PUT /booking/:id debe actualizar una ciudad ", async () => {
  const updateBooking = {
    checkOut: "2024-06-25",
  };
  const res = await request(app)
    .put("/booking/" + id)
    .send(updateBooking)
    .set("Authorization", `Bearer ${token}`);

  const receivedDate = new Date(res.body.checkOut).toISOString().split("T")[0];
  expect(receivedDate).toBe(updateBooking.checkOut);
  expect(res.status).toBe(200);
});

test("DELETE /booking/:id debe eliminar un review", async () => {
  const res = await request(app)
    .delete(`/booking/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
