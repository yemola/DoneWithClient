import client from "./client";

const register = (pushToken) => client.put("/users", { token: pushToken });

export default {
  register,
};
