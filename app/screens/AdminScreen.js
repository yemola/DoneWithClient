import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import routes from "../navigation/routes";
import AppText from "../components/Text";
import { ListItem, ListItemSeparator } from "../components/lists";
import listingsApi from "../api/listings";
import usersApi from "../api/users";
import useApi from "../hooks/useApi";
import colors from "../config/colors";

function AdminScreen({ navigation }) {
  const getAllUsersApi = useApi(usersApi.getUsers);
  const getListingsApi = useApi(listingsApi.getListings);

  const allListings = getListingsApi.data;
  const totalListings = allListings.length;
  const allUsers = getAllUsersApi.data;
  const totalUsers = allUsers.length;

  const listingsTitle = totalListings > 1 ? "Listings" : "Listing";
  const usersTitle = totalUsers > 1 ? "Users" : "User";

  useEffect(() => {
    getListingsApi.request();
    getAllUsersApi.request();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.listings}>
        <AppText style={styles.title}>{listingsTitle}</AppText>
        <AppText style={styles.total}>{totalListings}</AppText>
      </View>
      <View style={styles.users}>
        <AppText style={styles.title}>{usersTitle}</AppText>
        <AppText style={styles.total}>{totalUsers}</AppText>
      </View>
      <FlatList
        data={allUsers}
        keyExtractor={(user) => user._id}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item, index }) => (
          <ListItem
            image={
              !item.image
                ? require("../assets/account-circle-outline.jpg")
                : item.image
            }
            title={`${item.firstname} ${item.lastname}`}
            subTitle={item.email}
            onPress={() => navigation.navigate(routes.USER_DETAILS, item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flex: 1,
  },
  listings: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    paddingBottom: 7,
  },
  title: {
    color: colors.primary,
    fontWeight: "bold",
  },
  total: {
    fontWeight: "500",
  },
  users: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    paddingTop: 8,
  },
});

export default AdminScreen;
