import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";

import Text from "./Text";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function MyCard({
  title,
  subTitle,
  imageUrl,
  onDelete,
  onEdit,
  onPress,
  thumbnailUrl,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          tint="light"
          preview={{ uri: thumbnailUrl }}
          uri={imageUrl}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subTitle} numberOfLines={2}>
            {subTitle}
          </Text>
          <View style={styles.edit}>
            <TouchableWithoutFeedback onPress={onEdit}>
              <MaterialCommunityIcons
                name="pencil-outline"
                size={25}
                color={colors.white}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onDelete}>
              <MaterialCommunityIcons
                name="trash-can"
                size={25}
                color={colors.primary}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
    paddingTop: 12,
  },
  edit: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.primary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 4,
  },
});

export default MyCard;
