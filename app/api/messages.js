import client from "./client";

const endpoint = "/messages";

const send = (message, listingId) =>
  client.post(endpoint, {
    message,
    listingId,
  });

const getChats = async () => await client.get(endpoint);

export default {
  getChats,
  send,
};
