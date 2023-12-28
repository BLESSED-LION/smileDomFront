import { StyleSheet, View, Image, Text } from "react-native";
import React from 'react'
import { useTheme } from '../constants/theme';
import { StatusBar } from 'expo-status-bar'
import AppButton from '../components/AppButton'

const OnboardingScreen = () => {
  const { theme } = useTheme();
  return (
    <View style={[styles.background,{backgroundColor: theme.colors.Background}]}>
      <StatusBar style="auto" />
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../../assets/icon.png")} />
        <Text style={styles.tagline}>Welcome at SmileDom</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton title="Login"
         color={theme.colors.Black}
         bgColor={theme.colors.grey}
         onPress={() => console.log('Login pressed')} />
        <AppButton
         title="Register"
         bgColor={theme.colors.Primary}
         color={theme.colors.White}
         onPress={() => console.log('Register pressed')} />
      </View>
    </View>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
    paddingTop: 50,
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
  },
});
