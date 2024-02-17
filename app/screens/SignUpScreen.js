import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState, useRef, useContext } from "react";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../constants/theme";
import LoginInput from "../components/LoginInput";
import AppButton from "../components/AppButton";
import { MaterialIcons } from '@expo/vector-icons';
import { useMutation, gql } from "@apollo/client";
import { auth, app, firebaseConfig } from "../config/firebaseConfig";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { register } from "../store/userSlice";

const SignUpScreen = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const REGISTER_USER = gql`
    mutation registerUser(
      $username: String!
      $email: String!
      $phoneNumber: String!
      $password: String!
    ) {
      registerUser(
        name: $username
        email: $email
        phone: $phoneNumber
        password: $password
      ) {
        token,
        user  
      }
    }
  `;
  const [registerUser] = useMutation(REGISTER_USER, {
    onCompleted: (rdata) => {
      // dispatch(
      //   register({
      //     user: rdata.registerUser.user,
      //     token: rdata.registerUser.token,
      //   })
      // );
      setLoading(false);
      Toast.show({
        text1: "Registration successful",
        // text2: 'Additional text can go here',
        type: "success", // Can be 'success', 'info', 'warning', or 'error'
        position: "top", // Can be 'top', 'center', or 'bottom'
        duration: 3000, // Duration in milliseconds
      })
      navigation.navigate('login')
    },
    onError: (error) => {
      const { graphQLErrors, networkError } = error;
      console.log(error)
      setLoading(false);
      let errorMessage = "There was an error processing your request, please try again later"
      if(graphQLErrors){
        errorMessage = graphQLErrors[0].message
      }
      Toast.show({
        text1: errorMessage,
        // text2: 'Additional text can go here',
        type: "error", // Can be 'success', 'info', 'warning', or 'error'
        position: "top", // Can be 'top', 'center', or 'bottom'
        duration: 3000, // Duration in milliseconds
      });
    },
  });

  const handleTextChange = (value) => {
    const phn = "+" + country + value;
    setPhoneNumber(phn);
  };
  const [country, setCountry] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePress = () => {
    // check if all inputs are filled
    if (!username || !email || !phoneNumber || !password || !confirmPassword) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "All fields are required",
      });
      return;
    }
    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Passwords do not match",
      });
      return;
    }
    setLoading(true);
    registerUser({variables: {username,email,phoneNumber,password},})
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
            Yorem ipsum dolor sit amet, consectetur adipiscing
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
          {/* {recaptcha} */}

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/*usernmame input */}
            <View style={{ marginTop: 20, width: "100%" }}>
              <Text style={[styles.title, { color: theme.colors.Text, marginBottom: 6 }]}>
                Username
              </Text>
              <View
                style={[
                  styles.countrySelect,
                  { borderColor: theme.colors.grey2 },
                ]}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextInput
                    placeholder="Enter username"
                    onChangeText={(text) => setUsername(text)}
                    style={{
                      width: "100%",
                    }}
                  />
                </View>
              </View>
            </View>

            {/*email input */}
            <View style={{ marginTop: 20, marginBottom: 20, width: "100%" }}>
              <Text style={[styles.title, { color: theme.colors.Text, marginBottom: 6 }]}>
                Email
              </Text>
              <View
                style={[
                  styles.countrySelect,
                  { borderColor: theme.colors.grey2 },
                ]}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextInput
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    onChangeText={(text) => setEmail(text)}
                    style={{
                      width: "100%",
                    }}
                  />
                </View>
              </View>
            </View>

            <LoginInput setCountry={setCountry} />
            {/* <InputLogin setPhoneNumber={setPhoneNumber}/> */}
            <View style={{ marginTop: 20, width: "100%" }}>
              <Text style={[styles.title, { color: theme.colors.Text, marginBottom: 6 }]}>
                Phone
              </Text>
              <View
                style={[
                  styles.countrySelect,
                  { borderColor: theme.colors.grey2 },
                ]}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextInput
                    placeholder="Enter phone number"
                    onChangeText={handleTextChange}
                    style={{
                      width: "100%",
                    }}
                  />
                </View>
              </View>
            </View>

            {/*password input */}
            <View style={{ marginTop: 20, width: "100%" }}>
              <Text style={[styles.title, { color: theme.colors.Text, marginBottom: 6 }]}>
                Password
              </Text>
              <View
                style={[
                  styles.countrySelect,
                  { borderColor: theme.colors.grey2 },
                ]}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextInput
                    placeholder="Enter password"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    style={{
                      width: "100%",
                    }}
                  />
                </View>
              </View>
            </View>

            {/*confirm password input */}
            <View style={{ marginTop: 20, width: "100%" }}>
              <Text style={[styles.title, { color: theme.colors.Text, marginBottom: 6 }]}>
                Confirm Password
              </Text>
              <View
                style={[
                  styles.countrySelect,
                  { borderColor: theme.colors.grey2 },
                ]}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextInput
                    placeholder="Enter password"
                    secureTextEntry={true}
                    onChangeText={(text) => setConfirmPassword(text)}
                    style={{
                      width: "100%",
                    }}
                  />
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
                  title="Register"
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
            <Text>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("login");
              }}
            >
              <Text
                style={{
                  color: theme.colors.Primary,
                }}
              >
                {" "}
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar backgroundColor={"#BFD101"} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

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
