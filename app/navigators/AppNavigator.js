import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import VerifyOtpScreen from '../screens/VerifyOtpScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../constants/theme';
import DoctorNavigator from './DoctorNavigator';
import ConsultScreen from '../screens/ConsultScreen';
import PrinscribesScreen from '../screens/PrinscribesScreen';
import SessonsScreen from '../screens/SessonsScreen';
import SettingScreen from '../screens/SettingScreen';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, loginSuccess, logout } from '../store/actions';
import SignUpScreen from '../screens/SignUpScreen';
import { auth, db } from '../config/firebaseConfig';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { extractLastName } from '../constants/helpers';
import PatientsScreen from '../screens/PatientsScreen';
import { signOut } from 'firebase/auth';
// import { useDispatch } from 'react-redux';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AnimatedTabBarIcon = ({ iconName, focused }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.iconContainer}>
      <MaterialCommunityIcons
        name={iconName}
        size={focused ? 30 : 25}
        color={focused ? theme.colors.Primary : theme.colors.tabActive}
      />
    </View>
  );
};

const ActiveTabIndicator = () => {
  const { theme } = useTheme();
  return (
    <View style={styles.activeTabIndicator}>
      <View style={[styles.semiCircle, { backgroundColor: theme.colors.Background }]} />
    </View>
  );
};

const LogoImage = () => {
  // Replace 'logo.png' with the actual path to your logo image
  return (
    <Image
      source={require('../../assets/SmileDom_1.png')}
      style={styles.logo}
    />
  );
};

const HeaderRightIcons = () => {
  const dispatch = useDispatch()
  const [forceRerender, setForceRerender] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [r, sR] = useState(0)

  const handleLogout = () => {

    signOut(auth)
      .then(() => {
        console.log("User signed out successfully!");
        sR(1)
        // Handle successful logout (e.g., redirect to login page)
      })
      .catch((error) => {
        console.error("Error signing out:", error);
        // Handle sign-out errors
      });
  }

  const { theme } = useTheme();
  const [notifications, setNotifications] = useState(1);

  return (
    <View style={[styles.headerRight, { justifyContent: 'center', alignItems: 'center' }]}>
      <TouchableOpacity style={[{ marginRight: 5 }]} onPress={() => {/* Handle search icon click */ }}>
        <MaterialCommunityIcons name="magnify" size={30} color={theme.colors.Text} />
      </TouchableOpacity>
      <TouchableOpacity style={[{ marginRight: 5 }]} onPress={() => handleLogout()}>
        <MaterialCommunityIcons name="bell-outline" size={30} color={theme.colors.Text} />
        {/* Add a badge component or indicator here */}
        {notifications > 0 && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              backgroundColor: 'red',
              borderRadius: 10,
              width: 20,
              height: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {notifications}
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={[{
        width: 40,
        height: 40,
        backgroundColor: theme.colors.Primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
      }]} onPress={() => {/* Handle user profile click */ }}>
        <MaterialCommunityIcons name="account-outline" size={25} color={theme.colors.White} />
      </TouchableOpacity>
    </View>
  );
};


const AppNavigator = ({ type }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  if (!auth.currentUser) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="sighUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="verify" component={VerifyOtpScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    )
  }

  if (auth.currentUser) {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;

            switch (route.name) {
              case "Home":
                iconName = 'home';
                break;
              case "Consult":
                iconName = 'doctor';
                break;
              case "Patients":
                iconName = 'doctor';
                break;
              case "Admin":
                iconName = 'note-text';
                break;
              case "Prescribes":
                iconName = 'note-text';
                break;
              case "Sessions":
                iconName = 'notebook-edit';
                break;
              case "Setting":
                iconName = 'cog';
                break;
              default:
                iconName = focused
                  ? "ios-information-circle"
                  : "ios-information-circle-outline";
            }

            return (
              <View style={styles.tabBarItem}>
                <AnimatedTabBarIcon iconName={iconName} focused={focused} />
                {focused && <ActiveTabIndicator />}
              </View>
            );
          },
          tabBarActiveTintColor: theme.colors.tabActive,
          tabBarStyle: {
            height: 60,
            backgroundColor: theme.colors.Background,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 5,
          },
        })}
      >
        <Tab.Screen name="Home" component={DoctorNavigator} options={{
          headerStyle: {
            backgroundColor: theme.colors.Background,
          },
          headerTitle: '',
          headerLeft: () => <LogoImage />,
          headerRight: () => <HeaderRightIcons />,
          statusBarStyle: "auto",
        }}
        />
        {type === "doctor" ?
          // {user && extractLastName(user.user.displayName) === "doctor" ?
          <Tab.Screen name="Patients" component={PatientsScreen}
            options={{
              headerShown: false,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: theme.colors.Background,
              },
              headerTitleStyle: {
                color: theme.colors.LoadingBG,
              },
            }}
          /> :
          <Tab.Screen name="Consult" component={ConsultScreen}
            options={{
              headerShown: false,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: theme.colors.Background,
              },
              headerTitleStyle: {
                color: theme.colors.LoadingBG,
              },
            }}
          />}
        {type === "doctor" ?
          // {user && extractLastName(user.user.displayName) === "doctor" ?
          <Tab.Screen name="Admin" component={PrinscribesScreen}
            options={({ route }) => ({
              tabBarBadge: 0,
              headerShown: false,
              tabBarLabel: 'Admin',
              tabBarVisible: true,
            })}
          /> :
          <Tab.Screen name="Prescribes" component={PrinscribesScreen}
            options={{
              headerShown: false,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: theme.colors.Background,
              },
              headerTitleStyle: {
                color: theme.colors.LoadingBG,
              },
            }}
          />}
        <Tab.Screen name="Sessions" component={SessonsScreen}
          options={({ route }) => ({
            tabBarBadge: 0,
            headerShown: false,
            tabBarLabel: 'Sessions',
            tabBarVisible: false,
          })}
        />
        <Tab.Screen name="Setting" component={SettingScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    );
  }
}


const styles = StyleSheet.create({
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
  },
  activeTabIndicator: {
    position: 'absolute',
    top: -15,
    width: '100%',
    alignItems: 'center',
  },
  semiCircle: {
    width: 60, // Adjust the size as needed
    height: 30, // Adjust the size as needed
    borderTopLeftRadius: 60, // Make it a semicircle
    borderTopRightRadius: 60, // Make it a semicircle
    position: 'absolute',
    zIndex: -10
  },
  logo: {
    width: 95, // Adjust the width as needed
    height: 25, // Adjust the height as needed
    marginLeft: 15,
  },
  headerRight: {
    flexDirection: 'row', // Align icons horizontally
    marginRight: 16, // Adjust the spacing as needed
  },
});

export default AppNavigator;
