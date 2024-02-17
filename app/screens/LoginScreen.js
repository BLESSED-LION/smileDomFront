import { TextInput, StyleSheet, Text, View, Image, TouchableOpacity, Switch } from 'react-native'
import React, { useState, useRef, useContext } from 'react'
import Toast from 'react-native-toast-message';

import { StatusBar } from 'expo-status-bar'
import { useTheme } from '../constants/theme';
import LoginInput from '../components/LoginInput';
import InputLogin from '../components/InputLogin';
import AppButton from '../components/AppButton'
import { auth, app, firebaseConfig } from '../config/firebaseConfig';

import { useDispatch } from 'react-redux';
// import { loginSuccess } from '../store/actions';
import { useNavigation } from '@react-navigation/native';
// import { useFirebaseLogin } from '@itzsunny/firebase-login';

const LoginScreen = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation()
  // const {recaptcha,recaptchaBanner,sendOtp,verifyOtp} = useFirebaseLogin({auth: auth,firebaseConfig:firebaseConfig});
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("")
  const [country, setCountry] = useState("");
  const [usePhone, setUsePhone] = useState(false)
  const { loading, setLoading } = useState(false);

  const handlePress = () => {
    loginWithPhoneNumber()
};

const handleTextChange = (value) => {
  if(usePhone){
    const phn = "+" + country + value
    setEmailOrPhone(phn);
  }else{
    setEmailOrPhone(value)
  }
};

  const loginWithPhoneNumber = async () => {
    console.log(emailOrPhone, password)
    if(emailOrPhone == "" || password == ""){
      Toast.show({
        text1: "All inputs must be filled",
        type: "error",
        position: "top"
      })
      return 
    }
    try {
      console.log(emailOrPhone)
      console.log(password)
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
         </Text>
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
        <Text style={{
          fontSize: 20,
          textAlign: 'center',
          marginBottom: 10,
          fontWeight: 'bold',
          color: theme.colors.Primary
        }}
        >Login To your Account</Text>
        {/* {recaptcha} */}

        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
       <>
       {usePhone ?
         <View>
           <LoginInput setCountry={setCountry} />
           <View style={{ marginTop: 30, width: "100%" }}>
             <Text style={[styles.title, { color: theme.colors.Text }]}>Phone</Text>
             <View style={[styles.countrySelect, { borderColor: theme.colors.grey2 }]}>
               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                 <TextInput
                   placeholder='Enter phone number'
                   onChangeText={handleTextChange}
                   style={{
                     width: "100%"
                   }}
                 />
               </View>
             </View>
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
               <Text>login with email</Text>
               <Switch 
                  onValueChange={() => setUsePhone(!usePhone)}
                  value={usePhone}
               />
             </View>
           </View>
         </View>
       :
         <View style={{ marginTop: 30, width: "100%" }}>
           <Text style={[styles.title, { color: theme.colors.Text, marginBottom: 10 }]}>Email or Phone</Text>
           <View style={[styles.countrySelect, { borderColor: theme.colors.grey2 }]}>
             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               <TextInput
                 placeholder='Email'
                 keyboardType='email-address'
                 onChangeText={handleTextChange}
                 style={{
                   width: "100%"
                 }}
               />
             </View>
           </View>
           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
             <Text>Login with phone</Text>
             <Switch 
                onValueChange={() => setUsePhone(!usePhone)}
                value={usePhone}
                thumbColor={theme.colors.Primary}
             />
           </View>
         </View>
       }
       </>
       

          <View style={{ marginTop: 30, width: "100%" }}>
            <Text style={[styles.title, { color: theme.colors.Text, marginBottom: 10 }]}>Password</Text>
            <View style={[styles.countrySelect, { borderColor: theme.colors.grey2 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  placeholder='*******'
                  secureTextEntry={true}
                  onChangeText={(value)=>{
                    setPassword(value)
                  }}
                  style={{
                    width: "100%"
                  }}
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
            title='Login'
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
          {/* {recaptchaBanner} */}
        </View>

        <View style={{
          flexDirection: "row",
          marginTop: 10
        }}>
          <Text>Don't yet have an account?</Text>
          <TouchableOpacity
            onPress={()=>{
              navigation.navigate('signUp')
            }}
          >
            <Text style={{
              color: theme.colors.Primary
            }}> Create one</Text>
          </TouchableOpacity>
        </View>

      </View>
      <StatusBar backgroundColor={'#BFD101'} />
    </View>
  )
}

export default LoginScreen

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
    width: "100%",
  },
})