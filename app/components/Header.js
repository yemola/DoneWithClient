import React from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import colors from "../config/colors";

function Header({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    color: colors.medium,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontSize: 20,
    fontWeight: "bold",
    height: 35,
    alignItems: "center",
    paddingTop: 6,
    paddingLeft: 16,
  },
});

export default Header;
