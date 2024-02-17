import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import React, { useState, useRef, useContext } from "react";
import { useMutation, gql } from "@apollo/client";
import { user } from "../store/userSlice";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../constants/theme";
import LoginInput from "../components/LoginInput";
import AppButton from "../components/AppButton";

import { useDispatch } from "react-redux";
// import { loginSuccess } from '../store/actions';
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { login } from '../store/userSlice'

const LoginScreen = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const {recaptcha,recaptchaBanner,sendOtp,verifyOtp} = useFirebaseLogin({auth: auth,firebaseConfig:firebaseConfig});
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [country, setCountry] = useState("");
  const [usePhone, setUsePhone] = useState(false);
  const [loading, setLoading] = useState(false);

  const LOGIN_USER = gql`
    mutation AuthenticateUser($email_or_phone: String!, $password: String!) {
      authUser(email_or_phone: $email_or_phone, password: $password) {
        token
        user
      }
    }
  `;

  const [authUser] = useMutation(LOGIN_USER, {
    onCompleted: (rdata) => {
      if (rdata.authUser.token) {
        dispatch(
          login({
            user: rdata.authUser.user,
            token: rdata.authUser.token,
          })
        );
        setLoading(false);
        navigation.navigate('Home')
      }
    },
    onError: (error) => {
      console.error(error)
      let errorMessage = "There was an error making request, please try again later"
      // if(graphQLErrors){
      //   errorMessage = graphQLErrors[0].message
      // }
      Toast.show({
        text1: errorMessage,
        // text2: 'Additional text can go here',
        type: "error", // Can be 'success', 'info', 'warning', or 'error'
        position: "top", // Can be 'top', 'center', or 'bottom'
        duration: 3000, // Duration in milliseconds
      });
      setLoading(false);
    },
  });

  const handlePress = () => {
    if (emailOrPhone == "" || password == "") {
      Toast.show({
        text1: "All inputs must be filled",
        type: "error",
        position: "top",
      });
      return;
    }
    setLoading(true);
    authUser({ variables: { email_or_phone: emailOrPhone, password: password } });
  };

  const handleTextChange = (value) => {
    if (usePhone) {
      const phn = "+" + country + value;
      setEmailOrPhone(phn);
    } else {
      setEmailOrPhone(value);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View
        style={[styles.container, { backgroundColor: theme.colors.Background }]}
      >
        <StatusBar />
        <View>
          <Text style={[styles.intro, { color: theme.colors.Primary }]}>
            Welcome to
            <Text style={{ color: theme.colors.tabActive, fontWeight: "bold" }}>
              {" "}
              SmileDom.
            </Text>
          </Text>
          <View style={[styles.iconContainer]}>
            <Image
              source={require("../../assets/icon.png")}
              style={{
                width: 99,
                height: 99,
              }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: theme.colors.Primary,
              }}
            >
              Smile
              <Text
                style={{
                  color: theme.colors.tabActive,
                }}
              >
                Dom
              </Text>
            </Text>
          </View>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              marginBottom: 10,
              fontWeight: "bold",
              color: theme.colors.Primary,
            }}
          >
            Login To your Account
          </Text>
          {/* {recaptcha} */}

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <>
              {usePhone ? (
                <View>
                  <LoginInput setCountry={setCountry} />
                  <View style={{ marginTop: 30, width: "100%" }}>
                    <Text style={[styles.title, { color: theme.colors.Text }]}>
                      Phone
                    </Text>
                    <View
                      style={[
                        styles.countrySelect,
                        { borderColor: theme.colors.grey2 },
                      ]}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <TextInput
                          placeholder="Enter phone number"
                          onChangeText={handleTextChange}
                          style={{
                            width: "100%",
                          }}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 5,
                      }}
                    >
                      <Text>login with email</Text>
                      <Switch
                        onValueChange={() => setUsePhone(!usePhone)}
                        value={usePhone}
                      />
                    </View>
                  </View>
                </View>
              ) : (
                <View style={{ marginTop: 30, width: "100%" }}>
                  <Text
                    style={[
                      styles.title,
                      { color: theme.colors.Text, marginBottom: 10 },
                    ]}
                  >
                    Email or Phone
                  </Text>
                  <View
                    style={[
                      styles.countrySelect,
                      { borderColor: theme.colors.grey2 },
                    ]}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <TextInput
                        placeholder="Email"
                        keyboardType="email-address"
                        onChangeText={handleTextChange}
                        style={{
                          width: "100%",
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                  >
                    <Text>Login with phone</Text>
                    <Switch
                      onValueChange={() => setUsePhone(!usePhone)}
                      value={usePhone}
                      thumbColor={theme.colors.Primary}
                    />
                  </View>
                </View>
              )}
            </>

            <View style={{ marginTop: 30, width: "100%" }}>
              <Text
                style={[
                  styles.title,
                  { color: theme.colors.Text, marginBottom: 10 },
                ]}
              >
                Password
              </Text>
              <View
                style={[
                  styles.countrySelect,
                  { borderColor: theme.colors.grey2 },
                ]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <TextInput
                    placeholder="*******"
                    secureTextEntry={isPasswordVisible}
                    onChangeText={(value) => setPassword(value)}
                    style={{ flex: 1 }}
                  />
                  <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    <MaterialIcons
                      name={isPasswordVisible ? "visibility-off" : "visibility"}
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: 30,
            }}
          >
            <View>
              {!loading ? (
                <AppButton
                  title="Login"
                  bgColor={theme.colors.Primary}
                  color={theme.colors.White}
                  // onPress={() => loginWithPhoneNumber()}
                  onPress={handlePress}
                />
              ) : (
                <ActivityIndicator size="large" color={theme.colors.Primary} />
              )}
            </View>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            {/* {recaptchaBanner} */}
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <Text>Don't yet have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("signUp");
              }}
            >
              <Text
                style={{
                  color: theme.colors.Primary,
                }}
              >
                {" "}
                Create one
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar backgroundColor={"#BFD101"} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 70,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  intro: {
    fontSize: 16,
    textAlign: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 35,
  },
  useEmailText: {
    fontSize: 14,
    textDecorationLine: "underline",
  },
  input: {
    height: 40,
    marginBottom: 10,
    paddingLeft: 10,
  },
  countrySelect: {
    flexDirection: "row",
    borderBottomWidth: 1,
    width: "100%",
  },
});
