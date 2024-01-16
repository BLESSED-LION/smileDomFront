import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
} from 'react-native';
// import { RTCView } from 'react-native-webrtc';
// import { Avatar } from 'react-native-elements';

const CallScreen = ({ otherParticipant }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  // ... Video calling setup and events (omitted for brevity)

  return (
    <View style={styles.container}>
      {/* <View style={styles.videoContainer}>
        <RTCView streamURL={localStream?.toURL()} style={styles.localVideo} />
        <RTCView streamURL={remoteStream?.toURL()} style={styles.remoteVideo} />
      </View> */}
      <View style={styles.controlsContainer}>
        <Button title="Mute" onPress={() => { /* Handle mute */ }} />
        <Button title="Switch Camera" onPress={() => { /* Handle camera switch */ }} />
        <Button title="End Call" onPress={() => { /* Handle end call */ }} />
      </View>
      <View style={styles.userInfoContainer}>
        <Image source={require("../../assets/doctors/1.png")} />
        <Text style={styles.userName}>Other participant</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // WhatsApp-like background
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  localVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#25D366', // Placeholder color for local video
  },
  remoteVideo: {
    flex: 1,
    backgroundColor: '#000', // Placeholder color for remote video
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfoContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  avatar: {
    width: 50,
    height: 50,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#25D366', // WhatsApp green
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});


export default CallScreen;
