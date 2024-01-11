import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './app/constants/theme';
import AppNavigator from "./app/navigators/AppNavigator";
import { Provider } from 'react-redux';
import store from './app/store';
import Toast from 'react-native-toast-message';
import { useEffect, useState } from 'react';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from './app/config/firebaseConfig';
import { StatusBar } from 'expo-status-bar';
// import { TwilioVideo } from 'react-native-twilio-video-webrtc';

export default function App() {
  const [userRole, setUserRole] = useState('');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;

      // Query Firestore with UID
      const q = query(collection(db, "users"), where("id", "==", uid));
      // const docRef = collection(db, "users", uid);
      getDocs(q)
        .then((snapshot) => {
          if (snapshot.docs.length > 0) {
            const userDoc = snapshot.docs[0];
            const userData = userDoc.data();
            setUserRole(userData.type)
            console.log("User data:", userData);
          } else {
            console.log("User not found");
            setUserRole("patient")
          }
        })
        .catch((error) => {
          console.error("Error getting user:", error);
        });
    } else {
      // User is not authenticated
      // Handle unauthenticated state (e.g., redirect to sign-in)
    }
  });

  return (
    <ThemeProvider >
      <Provider store={store}>
      <StatusBar backgroundColor={'#BFD101'}/>
        <NavigationContainer>
          <AppNavigator type={userRole === '' ? 'patient' : userRole} />
          <Toast />
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
}