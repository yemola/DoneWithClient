import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Linking,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Keyboard,
} from "react-native";
import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import Icon from "../components/Icon";
import ContactSellerForm from "../components/ContactSellerForm";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import usersApi from "../api/users";
import useApi from "../hooks/useApi";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import routes from "../navigation/routes";

function ListingDetailsScreen({ navigation, route }) {
  const listing = route.params;
  const sellerId = listing.userId;

  const getSellerApi = useApi(usersApi.getUser);
  const seller = getSellerApi.data;

  useEffect(() => {
    getSellerApi.request(sellerId);
  }, []);
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
      <View style={styles.container}>
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
                  showsHorizontalScrollIndicator={false}
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
                      style={
                        imgActive === index ? styles.dotActive : styles.dot
                      }
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
              {!seller.image && (
                <ListItem
                  IconComponent={
                    <MaterialCommunityIcons
                      color={colors.medium}
                      name="account-circle-outline"
                      size={40}
                    />
                  }
                  title={listing.username}
                  subTitle={`${listing.state.trim()}, ${listing.country}`}
                  onPress={() =>
                    navigation.navigate(routes.SELLER_STORE, listing)
                  }
                />
              )}
              {seller.image && (
                <ListItem
                  image={seller.image}
                  title={listing.username}
                  subTitle={`${listing.state.trim()}, ${listing.country}`}
                  onPress={() =>
                    navigation.navigate(routes.SELLER_STORE, listing)
                  }
                />
              )}
            </View>
            {listing.whatsapp && (
              <View style={styles.chatbox}>
                <MaterialCommunityIcons
                  name="whatsapp"
                  size={25}
                  color={colors.secondary}
                  onPress={() => {
                    Linking.openURL(
                      "http://api.whatsapp.com/send?phone=" + listing.whatsapp
                    );
                  }}
                />
                <Text style={styles.chatlabel}>Chat with seller</Text>
              </View>
            )}
            <View style={styles.appchatbox}>
              <Text style={styles.appchatlabel}>In-app Chat</Text>
              <ContactSellerForm listing={listing} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appchatbox: {
    marginTop: 40,
    width: "95%",
  },
  appchatlabel: {
    fontSize: 13,
    paddingLeft: 7,
  },
  chatbox: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  chatlabel: {
    fontSize: 13,
    paddingLeft: 2,
  },
  container: {
    flex: 1,
  },
  detailsContainer: {
    padding: 20,
  },
  // userDetailsContainer: {
  //   flex: 1,
  //   marginLeft: 10,
  //   justifyContent: "center",
  // },
  image: {
    width: "100%",
    height: 300,
  },
  // profileImage: {
  //   width: 52,
  //   height: 52,
  //   borderRadius: 26,
  // },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  // profile: {
  //   alignItems: "center",
  //   flexDirection: "row",
  //   padding: 10,
  //   backgroundColor: colors.white,
  // },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  // profileSubTitle: {
  //   color: colors.medium,
  //   fontSize: 13,
  // },
  // profileTitle: {
  //   fontWeight: "500",
  // },
  userContainer: {
    marginTop: 40,
    marginBottom: 10,
  },
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
