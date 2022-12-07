import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import * as Sentry from "sentry-expo";

import MyCard from "../components/MyCard";
import AppText from "../components/Text";
import Screen from "../components/Screen";
import listingsApi from "../api/listings";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";
import colors from "../config/colors";

function MyListingsScreen(props) {
  const { user } = useAuth();
  const userId = user.userId;
  const getListingsApi = useApi(listingsApi.getListings);

  let myListings = getListingsApi.data.filter(
    (listing) => listing.userId === userId
  );

  const handleDelete = async (item) => {
    let listingId = item._id;

    const response = await listingsApi.deleteListing(listingId);
    getListingsApi.request();
    if (!response.ok) Sentry.Native.captureException(response.problem);
  };

  useEffect(() => {
    getListingsApi.request();
  }, []);

  return (
    <Screen style={styles.screen}>
      <AppText style={styles.title}>My Listings</AppText>
      {myListings.length === 0 && <AppText>You have no listing.</AppText>}
      <FlatList
        data={myListings}
        keyExtractor={(listing) => listing._id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <MyCard
            title={item.title}
            subTitle={item.price}
            imageUrl={item.images[0].url}
            onDelete={() => handleDelete(item, index)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 12,
    paddingTop: 5,
    backgroundColor: colors.light,
  },
  title: {
    marginBottom: 20,
  },
});

export default MyListingsScreen;
