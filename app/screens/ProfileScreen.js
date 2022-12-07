import React from "react";
import {
  Image,
  View,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import ListProperty from "../components/lists/ListProperty";
import colors from "../config/colors";
import AppText from "../components/Text";
import listingsApi from "../api/listings";
import usersApi from "../api/users";

function ProfileScreen(props) {
  const { user, logOut } = useAuth();
  // const userImg = user.image;

  async function handleDeleteUser(user) {
    const userId = user.userId;

    await listingsApi.deleteMyListings(userId);
    await usersApi.deleteUser(userId);

    logOut();
  }
  return (
    <ScrollView>
      <Screen style={styles.container}>
        <View style={styles.imgContainer}>
          <View style={styles.imgWrapper}>
            {user.image && (
              <Image style={styles.image} source={{ uri: user.image }} />
            )}
            <AppText style={styles.username}>{user.username}</AppText>
          </View>
        </View>
        {user.firstname && (
          <ListProperty
            name="account"
            title="First Name"
            subTitle={user.firstname}
          />
        )}
        {user.lastname && (
          <ListProperty title="Last Name" subTitle={user.lastname} />
        )}
        {user.city && (
          <ListProperty name="city" title="City" subTitle={user.city} />
        )}
        {user.state && <ListProperty title="State" subTitle={user.state} />}
        {user.country && (
          <ListProperty title="Country" subTitle={user.country} />
        )}
        <ListProperty name="email" title="Email" subTitle={user.email} />
        {user.whatsapp && (
          <ListProperty
            name="whatsapp"
            title="WhatsApp Number"
            subTitle={user.whatsapp}
          />
        )}
        <View style={styles.delete}>
          <TouchableWithoutFeedback onPress={() => handleDeleteUser(user)}>
            <AntDesign name="deleteuser" size={25} color={colors.primary} />
          </TouchableWithoutFeedback>
          <Text>Delete my account</Text>
        </View>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flex: 1,
    marginBottom: 60,
  },
  delete: {
    paddingLeft: 30,
    paddingTop: 20,
  },
  imgContainer: {
    marginLeft: 30,
    marginBottom: 10,
  },
  imgWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: 130,
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  username: {
    fontWeight: "bold",
    padding: 10,
  },
});

export default ProfileScreen;
