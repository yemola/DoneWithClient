import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../screens/AccountScreen";
import AdminScreen from "../screens/AdminScreen";
import MessagesScreen from "../screens/MessagesScreen";
import MyListingsScreen from "../screens/MyListingsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import UserDetailScreen from "../screens/UserDetailScreen";

const Stack = createNativeStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator
  // screenOptions={{
  //   headerStyle: { backgroundColor: "tomato" },
  // }}
  >
    <Stack.Screen name="Account Page" component={AccountScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="My Listings" component={MyListingsScreen} />
    <Stack.Screen name="Admin" component={AdminScreen} />
    <Stack.Screen name="User Details" component={UserDetailScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
