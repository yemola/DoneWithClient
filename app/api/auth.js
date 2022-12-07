import client from "./client";

const login = async (email, password) =>
  await client.post("/auth", { email, password });

export default {
  login,
};
