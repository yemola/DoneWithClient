import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import messagesApi from "../api/messages";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";

import Screen from "../components/Screen";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";

// const initialMessages = [
//   {
//     id: 1,
//     title: "Mosh Hamedani",
//     description: "Hey! Is this item still available?",
//     image: require("../assets/mosh.jpg"),
//   },
//   {
//     id: 2,
//     title: "Mosh Hamedani",
//     description:
//       "I'm interested in this item. When will you be able to post it?",
//     image: require("../assets/mosh.jpg"),
//   },
// ];

function MessagesScreen(props) {
  // const [messages, setMessages] = useState(initialMessages);

  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();
  const userId = user.userId;

  const getMessagesApi = useApi(messagesApi.getChats);

  const allMessages = getMessagesApi.data;

  const myMessages = allMessages.filter(
    (m) => (m.toUserId || m.fromUserId) === userId
  );

  const handleDelete = (message) => {
    // Delete the message from messages
    setMessages(myMessages.filter((m) => m._id !== message._id));
  };

  useEffect(() => {
    getMessagesApi.request();
  }, []);

  return (
    <Screen>
      <FlatList
        data={myMessages}
        keyExtractor={(message) => message._id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.userImg}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          getMessagesApi.request();
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default MessagesScreen;
