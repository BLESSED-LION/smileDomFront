import { TextInput, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useRef, useContext } from 'react'
import { signInWithPhoneNumber } from "@firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import Toast from 'react-native-toast-message';

import { StatusBar } from 'expo-status-bar'
import { useTheme } from '../constants/theme';
import LoginInput from '../components/LoginInput';
import InputLogin from '../components/InputLogin';
import AppButton from '../components/AppButton'
import { auth, app } from '../config/firebaseConfig';

import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/actions';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation()

  const handlePress = () => {
    console.log(recaptchaVerifier.current)

    if (recaptchaVerifier != null) {
      loginWithPhoneNumber()
    }
    // dispatch(loginSuccess(user));
  };

  const handleTextChange = (value) => {
    const phn = "+" + country + value
    setPhoneNumber(phn);
  };

  const [isVerifying, setIsVerifying] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [country, setCountry] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const recaptchaVerifier = useRef(null);
  const [verificationWrong, setVerificationWrong] = useState(false);
  const { loading, setLoading } = useState(false);

  const loginWithPhoneNumber = async () => {
    console.log(phoneNumber)
    try {
      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier.current
      );
      setConfirmationResult(result);
      setIsVerifying(true);
      console.log(result)
      Toast.show({
        text1: 'Verify phone number',
        // text2: 'Additional text can go here',
        type: 'success', // Can be 'success', 'info', 'warning', or 'error'
        position: 'top', // Can be 'top', 'center', or 'bottom'
        duration: 3000, // Duration in milliseconds
      });
      navigation.navigate("verify", { confirmationResult: result })
    } catch (error) {
      Toast.show({
        text1: 'There was an error signing in',
        // text2: 'Additional text can go here',
        type: 'error', // Can be 'success', 'info', 'warning', or 'error'
        position: 'top', // Can be 'top', 'center', or 'bottom'
        duration: 3000, // Duration in milliseconds
      });
      console.log(error)
    }
  };


  return (
    <View style={[styles.container, { backgroundColor: theme.colors.Background }]}>
      <StatusBar />
      <View>
        <Text
          style={[
            styles.intro,
            { color: theme.colors.Primary }]}>Welcome to
          <Text style={{ color: theme.colors.tabActive, fontWeight: 'bold' }}> SmileDom.</Text>
          Yorem ipsum dolor sit amet, consectetur adipiscing</Text>

        <View
          style={[styles.iconContainer]}
        >
          <Image
            source={require('../../assets/icon.png')}
            style={{
              width: 99,
              height: 99,
            }}
          />
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.colors.Primary
          }}>Smile<Text
            style={{
              color: theme.colors.tabActive,
            }}
          >Dom</Text></Text>
        </View>

        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={app.options}
        />

        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <LoginInput setCountry={setCountry} />
          {/* <InputLogin setPhoneNumber={setPhoneNumber}/> */}
          <View style={{ marginTop: 30, width: "100%" }}>
            <Text style={[styles.title, { color: theme.colors.Text }]}>Phone</Text>
            <View style={[styles.countrySelect, { borderColor: theme.colors.grey2 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  placeholder='Enter phone number'
                  onChangeText={handleTextChange}
                />
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: 30
          }}
        >
          <AppButton
            title='Continue'
            bgColor={theme.colors.Primary}
            color={theme.colors.White}
            // onPress={() => loginWithPhoneNumber()}
            onPress={handlePress}
          />
        </View>

        <View style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row"
        }}>
          <Text>Don’t have an account? </Text>
          <TouchableOpacity><Text style={{ textAlign: "center" }}>Create one</Text></TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 70,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: "center"
  },
  intro: {
    fontSize: 16,
    textAlign: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 35,
  },
  useEmailText: {
    fontSize: 14,
    textDecorationLine: 'underline'
  },
  input: {
    height: 40,
    marginBottom: 10,
    paddingLeft: 10,
  },
  countrySelect: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    width: 240,
  },
})