import React, { useState } from "react";
import { useFormikContext } from "formik";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import ErrorMessage from "./forms/ErrorMessage";

function PasswordInput({ icon, name, width = "100%", ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  const [passwordVisible, setPasswordVisible] = useState(true);
  let iconName = passwordVisible ? "eye" : "eye-off";

  return (
    <>
      <View style={[styles.container, { width }]}>
        <View style={styles.wrap}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              onChangeText={(text) => setFieldValue(text)}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}
          <TextInput
            onBlur={() => setFieldTouched(name)}
            onChangeText={(text) => setFieldValue(name, text)}
            value={values[name]}
            placeholderTextColor={defaultStyles.colors.medium}
            style={defaultStyles.text}
            secureTextEntry={passwordVisible}
            {...otherProps}
          />
        </View>

        <MaterialCommunityIcons
          name={iconName}
          onPress={() => setPasswordVisible(!passwordVisible)}
          size={22}
          color="#232323"
        />
      </View>

      <ErrorMessage error={errors[name]} visible={touched.password} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 8,
  },
  icon: {
    marginRight: 10,
  },
  wrap: { flexDirection: "row" },
});

export default PasswordInput;
