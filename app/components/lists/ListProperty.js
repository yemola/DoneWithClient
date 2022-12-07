import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "../Text";
import colors from "../../config/colors";

function ListProperty({ name, title, size = 20, subTitle }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.iconWrapper}>
        <MaterialCommunityIcons color={colors.medium} name={name} size={size} />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subTitle && (
          <Text style={styles.subTitle} numberOfLines={2}>
            {subTitle}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    flexDirection: "row",
    padding: 8,
    paddingLeft: 30,
    backgroundColor: colors.white,
    marginBottom: 1,
  },
  iconWrapper: {
    width: 40,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontSize: 13,
  },
});

export default ListProperty;
