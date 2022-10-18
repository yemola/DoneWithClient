import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Image } from "react-native-expo-image-cache";

import Text from "./Text";
import colors from "../config/colors";

function Card({ title, subTitle, imageUrl, onPress, thumbnailUrl }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <SafeAreaView style={styles.sliderContainer}>
          <View style={styles.wrapper}>
            <ScrollView
              onScroll={({ nativeEvent }) => onChange(nativeEvent)}
              showsVerticalScrollIndicator={false}
              pagingEnabled
              horizontal
              style={styles.wrapper}
            >
              {images.map((img, index) => (
                <Image
                  key={img}
                  resizeMode="stretch"
                  style={styles.wrapper}
                  tint="light"
                  preview={{ uri: thumbnailUrl }}
                  uri={imageUrl}
                />
              ))}
            </ScrollView>

            <View style={styles.wrapDot}>
              {images.map((img, index) => (
                <Text
                  key={img}
                  style={imgActive === index ? styles.dotActive : styles.dot}
                >
                  ●
                </Text>
              ))}
            </View>
          </View>
        </SafeAreaView>
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subTitle} numberOfLines={2}>
            {subTitle}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
  sliderContainer: {
    flex: 1,
  },
  wrapper: {
    width: "100%",
    height: 200,
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

export default Card;
