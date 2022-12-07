import React, { useState } from "react";
import { ScrollView, StyleSheet, Image, Text } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import usersApi from "../api/users";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import PasswordInput from "../components/PasswordInput";
import routes from "../navigation/routes";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required().label("First Name"),
  lastname: Yup.string().required().label("Last Name"),
  username: Yup.string().required().label("Username"),
  city: Yup.string().label("City"),
  state: Yup.string().required().label("State"),
  country: Yup.string().required().label("Country"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  whatsapp: Yup.string().label("WhatsApp Number"),
});

function RegisterScreen({ navigation }) {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    try {
      const result = await registerApi.request(userInfo);
      // console.log("data: ", result.config.data);
      if (result.status === 400)
        setError("Username already taken, select a unique username.");
      if (result.status === 401)
        setError("Email address already registered. Use another email address");
      if (!result.ok) {
        if (result.data) setError(result.data.error);
        else {
          setError("An unexpected error occurred.");
          console.log("result: ", result);
        }
        return;
      }
    } catch (error) {
      console.log(error);
      Sentry.Native.captureException(error);
    }

    const { data: authToken } = await loginApi.request(
      userInfo.email,
      userInfo.password
    );
    auth.logIn(authToken);
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            style={styles.logo}
            source={require("../assets/logo-red.png")}
          />
          <Form
            initialValues={{
              firstname: "",
              lastname: "",
              username: "",
              email: "",
              city: "",
              state: "",
              country: "",
              whatsapp: "",
              password: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <ErrorMessage error={error} visible={error} />

            <FormField
              autoCorrect={false}
              icon="account"
              maxLength={12}
              name="firstname"
              placeholder="First Name"
              textContentType="givenName"
              width="80%"
            />
            <FormField
              autoCorrect={false}
              icon="account"
              maxLength={12}
              name="lastname"
              placeholder="Last Name"
              textContentType="familyName"
              width="80%"
            />
            <FormField
              autoCorrect={false}
              icon="account"
              maxLength={12}
              name="username"
              placeholder="Username"
              width="80%"
            />

            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              maxLength={30}
              name="email"
              placeholder="Email"
              textContentType="emailAddress"
              width="90%"
            />

            <FormField
              autoCorrect={false}
              icon="home-city"
              maxLength={12}
              name="city"
              placeholder="City"
              textContentType="addressCity"
              width="70%"
            />
            <FormField
              autoCorrect={false}
              icon="city-variant"
              maxLength={16}
              name="state"
              placeholder="State or Province"
              textContentType="addressState"
              width="70%"
            />

            <FormField
              autoCorrect={true}
              icon="city"
              name="country"
              maxLength={16}
              placeholder="Country"
              textContentType="countryName"
              width="70%"
            />

            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="whatsapp"
              keyboardType="phone-pad"
              name="whatsapp"
              placeholder="234 070xxxxxxxx (Optional)"
              textContentType="telephoneNumber"
              width="80%"
            />

            <PasswordInput
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="password"
              maxLength={30}
              placeholder="Password"
              textContentType="password"
              width="80%"
            />

            <SubmitButton title="Register" />
            <Text style={{ textAlign: "center", marginBottom: 50 }}>
              {" "}
              Already registered,{" "}
              <Text
                style={{ color: "red" }}
                onPress={() => navigation.navigate(routes.LOGIN)}
              >
                Sign in
              </Text>
            </Text>
          </Form>
        </ScrollView>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 70,
    height: 70,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});

export default RegisterScreen;
