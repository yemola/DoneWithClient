import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";
import SearchBox from "../components/SearchBox";

function SellerStoreScreen({ navigation, route }) {
  const { user } = useAuth();
  const userItem = route.params;
  const getListingsApi = useApi(listingsApi.getListings);

  const allData = getListingsApi.data;
  const userListings = allData.filter(
    (listings) => listings.userId === userItem.userId
  );
  const [refreshing, setRefreshing] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    getListingsApi.request();
  }, []);

  const renderItem = ({ item }) => {
    if (searchPhrase === "") {
      return (
        <Card
          title={item.title}
          subTitle={item.price}
          imageUrl={item.images[0].url}
          onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          thumbnailUrl={item.images[0].thumbnailUrl}
        />
      );
    }

    if (
      item.title
        .toLowerCase()
        .includes(searchPhrase.toLowerCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <Card
          title={item.title}
          subTitle={"$" + item.price}
          imageUrl={item.images[0].url}
          onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          thumbnailUrl={item.images[0].thumbnailUrl}
        />
      );
    }
  };

  return (
    <>
      <ActivityIndicator visible={getListingsApi.loading} />
      <Screen style={styles.screen}>
        <SearchBox
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
        />
        {getListingsApi.error && (
          <>
            <AppText>Couldn't retrieve the listings.</AppText>
            <Button title="Retry" onPress={getListingsApi.request} />
          </>
        )}

        <FlatList
          data={userListings}
          keyExtractor={(listing) => listing._id}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            getListingsApi.request();
          }}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 16,
    paddingTop: 2,
    backgroundColor: colors.light,
  },
});

export default SellerStoreScreen;
