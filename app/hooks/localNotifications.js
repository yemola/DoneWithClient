import React from "react";
import { Button } from "react-native";
import Screen from "../components/Screen";
import { Notifications } from "expo";

export default function localNotifications() {
  const showNotification = () => {
    Notifications.scheduleLocalNotificationAsync(
      {
        title: "Congratulations",
        body: "Your order was successfully placed!",
      },
      {
        time: new Date().getTime() + 2000,
      }
    );
  };

  return (
    <Screen>
      <Button title="Tap me" onPress={showNotification} />
    </Screen>
  );
}
