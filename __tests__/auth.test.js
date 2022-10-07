const request = require("supertest");
const baseURL = "http://localhost:3001";

describe("test auth routes POST /auth/register /auth/token", () => {
  let token;
  const username = "testuser";

  it("should add a new user to users table and return token", async () => {
    const response = await request(baseURL).post("/auth/register").send({
      username: "testuser",
      email: "testuser@gmail.com",
      password: "123456",
      height: 123,
      weight: 132,
    });
    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response["text"])).toHaveProperty(["token"]);
  });

  it("should not add a user with duplicate username to users table", async () => {
    const response = await request(baseURL).post("/auth/register").send({
      username: "testuser",
      email: "testuser@gmail.com",
      password: "123456",
      height: 123,
      weight: 132,
    });
    expect(response.statusCode).toBe(400);
  });

  it("should sign in an existing user and return token", async () => {
    const response = await request(baseURL).post("/auth/token").send({
      username: "testuser",
      password: "123456",
    });
    expect(response.statusCode).toBe(200);
    // expect(response).toHaveProperty(["header"]);
    // expect(response).toHaveProperty(["text"]);
    expect(JSON.parse(response["text"])).toHaveProperty(["token"]);
    token = JSON.parse(response["text"]).token;
  });

  it("should not sign in a user that is not existing", async () => {
    const response = await request(baseURL).post("/auth/token").send({
      username: "testuser1",
      password: "123456",
    });
    expect(response.statusCode).toBe(401);
  });

  afterAll(async () => {
    console.log("Run after all tests; Delete the signed in user from database");
    await request(baseURL)
      .delete(`/profile/${username}`)
      .set("Authorization", `Bearer ${token}`);
  });
});
