const request = require("supertest");
const baseURL = "http://localhost:3001";

describe("test trip routes POST /trip/start", () => {
  let token;
  let tripId;
  const username = "testuser";

  beforeAll(async () => {
    console.log("Run before all tests: Register a new user and get the token");
    const response = await request(baseURL).post("/auth/register").send({
      username: "testuser",
      email: "testuser@gmail.com",
      password: "123456",
      height: 123,
      weight: 132,
    });
    token = JSON.parse(response["text"]).token;
  });

  it("should create a new trip and return trip info", async () => {
    const response = await request(baseURL)
      .post("/trip/start")
      .send({
        start_dock: "BikePoints_180",
        start_time: "1:12:24 PM",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("trip");
    expect(response.body.trip).toHaveProperty("start_time");
    tripId = response.body.trip.id;
  });

  it("should end an ongoing trip and return trip info", async () => {
    const response = await request(baseURL)
      .patch(`/trip/end/${tripId}`)
      .send({
        end_dock: "BikePoints_180",
        end_time: "2022-08-10 10:23:54",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });

  afterAll(async () => {
    console.log(
      "Run after all tests; Delete the signed in user and their trips from database"
    );
    await request(baseURL)
      .delete(`/profile/${username}`)
      .set("Authorization", `Bearer ${token}`);
  });
});
