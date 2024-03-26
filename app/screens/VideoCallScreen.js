import React from 'react';
import { WebView } from 'react-native-webview';

const GoogleMeetScreen = () => {
  return <WebView source={{ uri: 'https://meet.jit.si/' }} />;
};

export default GoogleMeetScreen;
