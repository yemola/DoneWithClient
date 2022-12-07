// import { useEffect } from "react";
// import { Platform } from "react-native";
// import * as Notifications from "expo-notifications";
// import * as Device from "expo-device";
// import navigation from "../navigation/rootNavigation";

// export default useNotifications = () => {
//   useEffect(() => {
//     registerForPushNotificationsAsync();

//     // if (notificationListener) Notifications.addListener(notificationListener);

//     // Notifications.addPushTokenListener((notification) => {
//     //   navigation.navigate("MessagesScreen");
//     // });
//   }, []);

//   async function registerForPushNotificationsAsync() {
//     if (Platform.OS === "android") {
//       await Notifications.setNotificationChannelAsync("default", {
//         name: "default",
//         importance: Notifications.AndroidImportance.MAX,
//         vibrationPattern: [0, 250, 250, 250],
//         lightColor: "#FF231F7C",
//       });
//     }

//     if (Device.isDevice) {
//       const { status: existingStatus } =
//         await Notifications.getPermissionsAsync();
//       let finalStatus = existingStatus;
//       if (existingStatus !== "granted") {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }
//       if (finalStatus !== "granted") {
//         console.log("Failed to get push token for push notification!");
//         return;
//       }
//       const tokenObject = await Notifications.getExpoPushTokenAsync();
//       const token = tokenObject.data;
//       console.log("pushtoken: ", token);
//       // usersApi.storePushToken(token, userId);
//     } else {
//       console.log("Error getting a push token", error);
//     }
//   }
// };
