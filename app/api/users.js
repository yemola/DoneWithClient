import * as Sentry from "sentry-expo";
import client from "./client";

const endpoint = "/users";

const deleteUser = async (userId) =>
  await client.delete(endpoint + "/" + userId);

const register = async (userInfo) => await client.post(endpoint, userInfo);

const getUser = async (userId) => await client.get(endpoint + "/" + userId);

const getUsers = async () => await client.get(endpoint);

const storeProfPix = async (user) => {
  const userId = user.userId;
  let data = new FormData();

  data.append("image", {
    name: "image",
    type: "image/jpeg",
    uri: user.image.uri,
  });

  try {
    return client.put(endpoint + "/" + userId, data);
  } catch (error) {
    Sentry.Native.captureException("error sending to backend", error);
  }
};

const storePushToken = (pushToken, userId) =>
  client.put(endpoint + "/storetoken/" + userId, { token: pushToken });

export default {
  deleteUser,
  getUser,
  getUsers,
  register,
  storeProfPix,
  storePushToken,
};
