import React, { useState } from "react";
import { Keyboard, TextInput, View, StyleSheet } from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

function SearchBox({ searchPhrase, setSearchPhrase }) {
  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <MaterialCommunityIcons
          name="text-search"
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
        <TextInput
          placeholderTextColor={defaultStyles.colors.medium}
          style={defaultStyles.text}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search..."
          onChangeText={setSearchPhrase}
          value={searchPhrase}
        />
      </View>
      {searchPhrase !== "" && (
        <Entypo
          style={styles.clearIcon}
          name="cross"
          size={20}
          color={defaultStyles.colors.dark}
          onPress={() => {
            setSearchPhrase("");
            Keyboard.dismiss();
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 8,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  clearIcon: {
    marginRight: 5,
  },
  wrap: {
    flexDirection: "row",
  },
});

export default SearchBox;

// function SearchBox({ searchPhrase, setSearchPhrase }) {
//   return (
//     <Screen>
//       <View style={styles.searchBox}>
//         <TextInput
//           autoCapitalize="none"
//           autoCorrect={false}
//           icon="text-search"
//           placeholder="Search..."
//           onChangeText={setSearchPhrase}
//           onFocus={() => setFocus(true)}
//           value={searchPhrase}
//         />
//         {searchPhrase === "" && (
//           <Entypo
//             style={styles.clearIcon}
//             name="cross"
//             size={25}
//             color="black"
//             onPress={() => {
//               setSearchPhrase("");
//               Keyboard.dismiss();
//             }}
//           />
//         )}
//       </View>
//     </Screen>
//   );
// }

// const styles = StyleSheet.create({
//   clearIcon: {
//     position: "absolute",
//     zIndex: 9,
//   },
//   searchBox: {
//     borderRadius: 4,
//     alignSelf: "center",
//     justifyContent: "center",
//     width: "90%",
//     zIndex: 5,
//   },
// });

// export default SearchBox;
