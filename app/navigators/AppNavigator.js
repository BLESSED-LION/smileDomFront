import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import VerifyOtpScreen from '../screens/VerifyOtpScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../constants/theme';
import DoctorNavigator from './DoctorNavigator';
import SessonsScreen from '../screens/SessonsScreen';
import { useDispatch, useSelector } from 'react-redux';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { useNavigation } from '@react-navigation/native';
import SettingsScreen from '../screens/SettingScreen';
import { logout } from '../store/userSlice';
import ConsultScreenHome from '../screens/ConsultScreenHome';
import PatientListScreen from '../screens/PatientsListScreen';
import { Entypo } from '@expo/vector-icons';
import { useQuery } from '@apollo/client';
import { GET_NOTIFICATIONS } from '../constants/mutations';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
let no_nots = 0;

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
  const user = useSelector((state) => state.user.user);
  const navigation = useNavigation()
  const { theme } = useTheme();
  const [notifications, setNotification] = useState(1);

  const { loading, error, data } = useQuery(GET_NOTIFICATIONS, {
    variables: { userId: user && user._id },
    pollInterval: 5000
  });

  useEffect(() => {
    if(data && data.notifications){
      const unreadCount = data.notifications.reduce((count, notification) => {
        if (!notification.read) {
          return count + 1;
        }
        return count;
      }, 0);
      setNotification(unreadCount)
      no_nots = unreadCount;
    }
  }, [data]);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("login"); 
  }

  return (
    <View style={[styles.headerRight, { justifyContent: 'center', alignItems: 'center' }]}>
      <TouchableOpacity style={[{ marginRight: 5 }]} onPress={handleLogout}>
        {/* <MaterialCommunityIcons name="logout" size={30} color={theme.colors.Text} /> */}
        <Entypo name="log-out" size={30} color={theme.colors.Text} />
      </TouchableOpacity>
      <TouchableOpacity style={[{ marginRight: 5 }]} onPress={() => navigation.navigate("notifications")}>
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
      }]} onPress={() => {navigation.navigate("profile", {userInfor: user ? user : {}})}}>
        <MaterialCommunityIcons name="account-outline" size={25} color={theme.colors.White} />
      </TouchableOpacity>
    </View>
  );
};


const AppNavigator = ({ type, messages }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [isLogged, setUserLogged] = useState(false);
  const user = useSelector((state) => state.user);
  const isDoctor = user.user ? user.user.isDoctor : false;
  console.log("User ", user, "isDoctor", isDoctor)
  // console.log("User ", user, "isDoctor", isDoctor);
  // dispatch(getDoctorInfo(doctors));

  useEffect(() => {
    if(user.isLoggedIn){
      setUserLogged(true)
    }else{
      setUserLogged(false)
    }
  }, [user]);


  if (!isLogged) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="signUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="verify" component={VerifyOtpScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    )
  }

  if (isLogged) {
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
        {user.isLoggedIn && isDoctor ?
          // {user && extractLastName(user.user.displayName) === "doctor" ?
          <Tab.Screen name="Patients" component={PatientListScreen}
            options={{
              headerShown: false,
              headerTitleAlign: 'center',
              tabBarBadge: no_nots,
              headerStyle: {
                backgroundColor: theme.colors.Background,
              },
              headerTitleStyle: {
                color: theme.colors.LoadingBG,
              },
            }}
          /> :
          <Tab.Screen name="Consult" component={ConsultScreenHome}
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
          {user.isLoggedIn && !isDoctor &&
        <Tab.Screen name="Sessions" component={SessonsScreen}
          options={({ route }) => ({
            tabBarBadge: no_nots,
            headerShown: false,
            tabBarLabel: 'Sessions',
            tabBarVisible: false,
          })}
        />}
        <Tab.Screen name="Setting" component={SettingsScreen} options={{ headerShown: false, headerTitleAlign:"center" }} />
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