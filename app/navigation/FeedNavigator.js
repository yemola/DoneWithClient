import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import SellerStoreScreen from "../screens/SellerStoreScreen";

const Stack = createNativeStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator presentation="modal">
    <Stack.Screen
      name="Listings"
      component={ListingsScreen}
      options={{ title: "All Listings" }}
    />
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
    <Stack.Screen name="Seller Store" component={SellerStoreScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
