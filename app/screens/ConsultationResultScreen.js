import React, { useState } from 'react';
import { Button, Linking } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { WebView } from 'react-native-webview';

const ConsultationResultScreen = () => {
    // const [loading, setLoading] = useState(true)
  const handlePress = async () => {
    const supported = await Linking.canOpenURL("https://tutorial.math.lamar.edu/pdf/laplace_table.pdf");

    if (supported) {
      await Linking.openURL("https://tutorial.math.lamar.edu/pdf/laplace_table.pdf");
    } else {
      console.log(`Don't know how to open this URL: https://tutorial.math.lamar.edu/pdf/laplace_table.pdf`);
    }
  };

  return (
    <>
        {/* {loading && <ActivityIndicator style={{alignSelf:"center"}} />} */}
        <WebView originWhitelist={['*']} source={{ uri: 'https://tutorial.math.lamar.edu/pdf/laplace_table.pdf' }} />
    </>
  );
};

export default ConsultationResultScreen;