import React from "react";
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Image,
} from "react-native";
import Screen from "./Screen";

// const images = [
//   "https://cdn.pixabay.com/photo/2017/08/18/16/38/paper-2655579_1280.jpg",
//   "https://cdn.pixabay.com/photo/2015/09/15/16/30/autum-941304_1280.jpg",
//   "https://cdn.pixabay.com/photo/2014/12/15/15/36/cloth-569222_1280.jpg",
// ];

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

function SWipeSlide(props) {
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
    <Screen>
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
                source={{ uri: img }}
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
    </Screen>
  );
}

const styles = StyleSheet.create({
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

export default SWipeSlide;
