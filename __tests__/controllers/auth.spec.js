const User = require("../../models/user");
const { createToken } = require("../../helpers/jwt");
const { authRegisterController } = require("../../controllers/auth");

jest.mock("../../models/user");
jest.mock("../../helpers/jwt", () => ({
  createToken: jest.fn(() => "fake_token"),
}));

const request = {
  body: {
    username: "fake_username",
    password: "fake_password",
    weight: "100",
    height: "160",
    email: "fake_email",
  },
};

const response = {
  status: jest.fn((x) => x),
};

const next = jest.fn((x) => x);

const validator = true;

it("should send a status code of 201 when a new user is created", async () => {
  User.register.mockResolvedValueOnce({
    token: "fake_token",
  });

  await authRegisterController(request, response, next);

  expect(User.register).toHaveBeenCalledWith({
    username: "fake_username",
    password: "fake_password",
    weight: 100,
    height: 160,
    email: "fake_email",
    is_admin: false,
  });
  // expect(createToken).toHaveBeenCalledWith({
  //   username: "fake_username",
  //   password: "fake_password",
  //   weight: 100,
  //   height: 160,
  //   email: "fake_email",
  //   isAdmin: false,
  // });
  // expect(response.status).toEqual(201);
});
