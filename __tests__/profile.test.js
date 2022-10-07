const request = require("supertest");
const baseURL = "http://localhost:3001";

describe("test profile routes GET profile/:username PATCH /profile/:username", () => {
  let token;
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

  it("should return a user info based on username", async () => {
    const response = await request(baseURL)
      .get(`/profile/${username}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("user");
  });

  it("should change a user's info", async () => {
    const response = await request(baseURL)
      .patch(`/profile/${username}`)
      .send({
        email: "testuser@gmail.com",
        password: "123456",
        weight: 123,
        height: 180,
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("user");
  });

  afterAll(async () => {
    console.log("Run after all tests; Delete the signed in user ");
    await request(baseURL)
      .delete(`/profile/${username}`)
      .set("Authorization", `Bearer ${token}`);
  });
});
