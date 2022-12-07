import React, { useEffect, useState } from "react";
import * as Sentry from "sentry-expo";
import {
  Image,
  StyleSheet,
  View,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { Image } from "react-native-expo-image-cache";

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import Text from "../components/Text";
import usersApi from "../api/users";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import * as ImagePicker from "expo-image-picker";
import Button from "../components/Button";

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.MYLISTINGS,
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.MESSAGES,
  },
];

function AccountScreen({ navigation }) {
  const [imageUri, setImageUri] = useState();
  const { user, logOut } = useAuth();
  const userId = user.userId;

  const getCurrentUser = useApi(usersApi.getUser);
  const currentUser = getCurrentUser.data;
  let userImg = currentUser.image;
  const admin = currentUser.isAdmin;

  useEffect(() => {
    getCurrentUser.request(userId);
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library.");
  };

  const handlePress = () => {
    selectImage();
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.5,
      });
      if (!result.cancelled) setImageUri(result.uri);
      user.image = result;
      await usersApi.storeProfPix(user);
      getCurrentUser.request(userId);
    } catch (error) {
      Sentry.Native.captureException("Error reading an image", error);
    }
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <TouchableWithoutFeedback onPress={handlePress}>
            <View>
              {userImg && (
                <Image style={styles.image} source={{ uri: userImg }} />
              )}

              {!userImg && !imageUri && (
                <MaterialCommunityIcons
                  color={colors.medium}
                  name="account-circle-outline"
                  size={40}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {user.username}
            </Text>
            {user.state && (
              <Text style={styles.subTitle} numberOfLines={2}>
                {`${user.state.trim()}, ${user.country}`}
              </Text>
            )}
          </View>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(routes.PROFILE)}
          >
            <MaterialCommunityIcons
              color={colors.medium}
              name="chevron-right"
              size={25}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => logOut()}
      />
      {admin && (
        <View style={styles.admin}>
          <Button
            title="Admin"
            onPress={() => navigation.navigate(routes.ADMIN)}
          />
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  admin: {
    height: 150,
    justifyContent: "center",
    marginLeft: 15,
    width: 100,
  },

  container: {
    marginVertical: 20,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  subTitle: {
    color: colors.medium,
    fontSize: 13,
  },
  title: {
    fontWeight: "500",
  },
  profile: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    backgroundColor: colors.white,
  },
});

export default AccountScreen;
