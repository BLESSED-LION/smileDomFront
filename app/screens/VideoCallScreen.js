import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';

const VideoCallScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.subText}>This is the sub text</Text>
      </View>
      <View style={styles.opponentContainer}>
        <Image
          source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
          style={styles.opponentVideo}
          resizeMode='cover'
        />
      </View>
      <View style={styles.currentContainer}>
        <Image
          source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar1.png' }}
          style={styles.currentUser}
          resizeMode='cover'
        />
      </View>
      <View style={styles.controlsContainer}>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton}>
            <Text>Mute</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Text>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Text>Send file</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlButton, styles.endCallButton]}>
            <Text>End Call</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor:'#fff'
  },
  header: {
    marginTop:30,
    padding:10,
    backgroundColor:'#fff',
    justifyContent: 'center',
  },
  name: {
    fontSize:20,
    fontWeight:'bold',
    marginLeft:20,
    marginBottom:3,
  },
  subText: {
    fontSize:14,
    marginLeft:20,
    color:'#808080'
  },
  opponentContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  opponentVideo: {
    flex: 1,
  },
  currentContainer: {
    position: 'absolute',
    top: 120,
    left: 20,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  currentUser: {
    width: 100,
    height: 150,
  },
  controlsContainer: {
    height:80,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  endCallButton:{
    backgroundColor: '#FF4500'
  }
});

export default VideoCallScreen;