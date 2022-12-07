import client from "./client";

const endpoint = "/listings";
const myEndpoint = "/my/listings";

export const getListings = async () => await client.get(endpoint);

export const myListings = async (userId) => await client.get(myEndpoint);

export const deleteListing = async (listingId) =>
  await client.delete(endpoint + "/" + listingId);

export const deleteMyListings = async (userId) => {
  await client.delete(endpoint, userId);
};
export const addListing = (listing, onUploadProgress) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("categoryId", listing.category.value);
  data.append("description", listing.description);
  data.append("userId", listing.userId);
  data.append("userImg", listing.image);
  data.append("username", listing.username);
  data.append("state", listing.state);
  data.append("country", listing.country);
  data.append("whatsapp", listing.whatsapp);

  listing.images.forEach((image, index) =>
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  );

  if (listing.location)
    data.append("location", JSON.stringify(listing.location));

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addListing,
  getListings,
  deleteListing,
  deleteMyListings,
  myListings,
};
