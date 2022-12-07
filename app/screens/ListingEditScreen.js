import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import AppText from "../components/Text";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import listingsApi from "../api/listings";
import useLocation from "../hooks/useLocation";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.string().required().min(1).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "sofa-single-outline",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "Automobile",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "tablet-cellphone",
    label: "Phones/Tabs",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "blender",
    label: "Electronics",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "shoe-heel",
    label: "Fashion",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "Sports",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "home-outline",
    label: "Houses & Apartment",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    icon: "desktop-mac",
    label: "Computing",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 9,
  },
];

function ListingEditScreen() {
  const { user } = useAuth();

  const { image, userId, username, state, country, whatsapp } = user;
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await listingsApi.addListing(
      {
        ...listing,
        location,
        userId,
        username,
        state,
        country,
        image,
        whatsapp,
      },
      (progress) => setProgress(progress)
    );
    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the listing");
    }

    resetForm();
  };

  return (
    <ScrollView>
      <Screen style={styles.container}>
        <AppText style={styles.heading}>Post An Item for Sale</AppText>
        <UploadScreen
          onDone={() => setUploadVisible(false)}
          progress={progress}
          visible={uploadVisible}
        />
        <Form
          initialValues={{
            title: "",
            price: "",
            description: "",
            category: null,
            images: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormImagePicker name="images" />

          <FormField maxLength={255} name="title" placeholder="Title" />
          <AppText style={styles.priceLabel}>
            Enter price with your preferred currency
          </AppText>
          <FormField
            maxLength={12}
            name="price"
            placeholder="Price"
            width={120}
          />
          <Picker
            items={categories}
            name="category"
            numberOfColumns={3}
            PickerItemComponent={CategoryPickerItem}
            placeholder="Category"
            width="50%"
          />
          <FormField
            maxLength={255}
            multiline
            name="description"
            numberOfLines={3}
            placeholder="Description"
          />
          <SubmitButton title="Post" />
        </Form>
        <AppText style={styles.text}>
          To view posted item on listings page, pull down to refresh
        </AppText>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "500",
    paddingVertical: 15,
  },
  priceLabel: {
    fontSize: 12,
  },
  text: {
    fontSize: 13,
    alignSelf: "center",
    marginTop: 20,
  },
});
export default ListingEditScreen;
