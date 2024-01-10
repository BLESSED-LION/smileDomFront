// import AgoraUIKit from 'agora-rn-uikit';
import React from "react";
import { View, Text } from "react-native";

const CallScreen = () => {
  const connectionData = {
    appId: "9d367d6053de4ffcbc670475fed9b12f",
    channel: 'test',
    token: null, // enter your channel token as a string 
    };
  return(
    <View>
        <Text>Call Screen</Text>
    </View>
    )
}

export default CallScreen; 