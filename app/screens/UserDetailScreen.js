import React from "react";
import { Image, View, ScrollView, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import ListProperty from "../components/lists/ListProperty";
import colors from "../config/colors";
import AppText from "../components/Text";

function UserDetailScreen({ route }) {
  const user = route.params;

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
        <ListProperty
          name="account"
          title="First Name"
          subTitle={user.firstname}
        />
        <ListProperty title="Last Name" subTitle={user.lastname} />
        {user.city && (
          <ListProperty name="city" title="City" subTitle={user.city} />
        )}
        <ListProperty title="State" subTitle={user.state} />
        <ListProperty title="Country" subTitle={user.country} />
        <ListProperty name="email" title="Email" subTitle={user.email} />
        {user.whatsapp && (
          <ListProperty
            name="whatsapp"
            title="WhatsApp Number"
            subTitle={user.whatsapp}
          />
        )}
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

export default UserDetailScreen;
