import React, { useState } from "react";
import {
  Dimensions,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import ContactSellerForm from "../components/ContactSellerForm";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

function ListingDetailsScreen({ route }) {
  const listing = route.params;

  const [imgActive, setImgActive] = useState(0);

  const onChange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide !== imgActive) {
        setImgActive(slide);
      }
    }
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
        {listing.images.length < 3 && (
          <Image
            style={styles.image}
            preview={{ uri: listing.images[0].thumbnailUrl }}
            tint="light"
            uri={listing.images[0].url}
          />
        )}

        {listing.images.length > 2 && (
          <SafeAreaView style={styles.sliderContainer}>
            <View style={styles.wrapper}>
              <ScrollView
                onScroll={({ nativeEvent }) => onChange(nativeEvent)}
                showsVerticalScrollIndicator={false}
                pagingEnabled
                horizontal
                style={styles.wrapper}
              >
                {listing.images.map((img, index) => (
                  <Image
                    key={img.url}
                    resizeMode="cover"
                    style={styles.wrapper}
                    tint="light"
                    preview={{ uri: img.thumbnailUrl }}
                    uri={img.url}
                  />
                ))}
              </ScrollView>

              <View style={styles.wrapDot}>
                {listing.images.map((img, index) => (
                  <Text
                    key={img.url}
                    style={imgActive === index ? styles.dotActive : styles.dot}
                  >
                    ●
                  </Text>
                ))}
              </View>
            </View>
          </SafeAreaView>
        )}

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{listing.title}</Text>
          <Text style={styles.price}>${listing.price}</Text>
          <View style={styles.userContainer}>
            <ListItem
              image={require("../assets/mosh.jpg")}
              title="Mosh Hamedani"
              subTitle="5 Listings"
            />
          </View>
          <ContactSellerForm listing={listing} />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
  // sliderContainer: {
  //   flex: 1,
  // },
  wrapper: {
    width: WIDTH,
    height: 350,
  },
  wrapDot: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignSelf: "center",
  },
  dotActive: {
    margin: 3,
    color: "black",
  },
  dot: {
    margin: 3,
    color: "white",
  },
});

export default ListingDetailsScreen;
