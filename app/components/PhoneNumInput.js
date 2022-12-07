import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-number-input";

import defaultStyles from "../config/styles";

function PhoneNumInput({ icon, width = "100%", ...otherProps }) {
  const phoneInput = useRef < PhoneInput > null;
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <PhoneInput
        ref={phoneInput}
        placeholderTextColor={defaultStyles.colors.medium}
        style={defaultStyles.text}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 8,
    marginVertical: 8,
  },
  icon: {
    marginRight: 10,
  },
});

export default PhoneNumInput;
