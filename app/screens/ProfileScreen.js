import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../constants/theme';
import { Ionicons,Fontisto } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

const ProfileScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  // const { user } = route.params;
  const u = useSelector((state) => state.user.user);
  const user = u ? u._j : {image: "", name: "", specialization: "", experience: ""};
  const handleGoBack = () => {
    navigation.goBack();
  };
  const i = user.image ? {uri: user.image} :require("../../assets/icon.png")

  const handleLogout = () => {

    signOut(auth)
      .then(() => {
        console.log("User signed out successfully!");
        // Expo.Util.reload();
      })
      .catch((error) => {
        console.error("Error signing out:", error);
        // Handle sign-out errors
      });
  }

  return (
    <View
    style={{
      flex: 1,
    }}
    >
      <View
      style={{
        flexDirection:'row',
        marginLeft: 13,
        marginTop: 10,
        marginBottom: 15,
      }}
      >
        <TouchableOpacity
         onPress={handleGoBack}
        >
         <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text
        style={{
          fontSize: 19,
          fontWeight: '400',
          marginLeft: 9,
        }}
        >{user.name}</Text>
        {console.log("Profile user: ", user)}
      </View>

      <ScrollView
      style={{
        paddingHorizontal: 15,
      }}
      >
        <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          marginBottom: 25
        }}
        >
          <Image
          source={i}
          style={{
            height: 198,
            width: 150,
          }} />

          <View
          style={{
            paddingHorizontal: 23,
            justifyContent: 'flex-end',
          }}
          >
            <Text
            style={{
              fontSize: 19,
              fontWeight: 'bold',
            }}
            >{user.name}</Text>
            <Text>{user.phoneNumber}</Text>

            <View
            style={{
              flexDirection: 'row',
              marginTop: 23,
            }}
            >
              <TouchableOpacity
              style={{
                height: 29,
                width: 82,
                borderRadius: 5,
                backgroundColor: theme.colors.accountText,
                marginRight: 17.55,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
              }}
              onPress={handleLogout}
              >
              {/* <Ionicons name="add" size={20} color="white" /> */}
              <MaterialCommunityIcons name="logout" size={20} color={'white'} />
              <Text style={{color: theme.colors.White}} >Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity
              style={{
                height: 29,
                width: 82,
                borderRadius: 5,
                backgroundColor: theme.colors.Primary,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
              }}
              >
              <Fontisto name="doctor" size={15} color="white" />
              <Text style={{color: theme.colors.White, marginLeft: 3}} >consult</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>

        {user.type === "doctor" &&
        <View
        style={{
          flexDirection:'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        >
          <View>
            <Text
            style={{
              fontSize: 14,
              color: theme.colors.Accent
            }}
            >Followers</Text>
            <Text
            style={{
              fontSize: 14,
              color: theme.colors.Accent,
              fontWeight: 'bold'
            }}
            >0</Text>
          </View>

          <View>
            <Text
            style={{
              fontSize: 14,
              color: theme.colors.Accent
            }}
            >Experience</Text>
            <Text
            style={{
              fontSize: 14,
              color: theme.colors.Accent,
              fontWeight: 'bold'
            }}
            >{user && user.experience ? user.experience : ""}</Text>
          </View>

          <View>
            <Text
            style={{
              fontSize: 14,
              color: theme.colors.Accent
            }}
            >Consultations</Text>
            <Text
            style={{
              fontSize: 14,
              color: theme.colors.Accent,
              fontWeight: 'bold'
            }}
            >{user.patients.length}</Text>
          </View>
        </View>}

        <View
        style={{
          marginTop: 30,
          marginLeft: 26,
        }}
        >

          <View
          style={{
            marginBottom: 20
          }}
          >
            <Text
            style={{
              fontSize: 12
            }}
            >Name</Text>
            <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
            }}
            >{user.name}</Text>
          </View>

          <View
          style={{
            marginBottom: 20
          }}
          >
            <Text
            style={{
              fontSize: 12
            }}
            >Username</Text>
            <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
            }}
            >{"@" + user.name}</Text>
          </View>

          {user.type === "doctor" && <View
          style={{
            marginBottom: 20
          }}
          >
            <Text
            style={{
              fontSize: 12
            }}
            >Speciality</Text>
            <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
            }}
            >{user.specialization}</Text>
          </View>}

          <View
          style={{
            marginBottom: 20
          }}
          >
            <Text
            style={{
              fontSize: 12
            }}
            >Gender</Text>
            <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
            }}
            >Male</Text>
          </View>

          <View
          style={{
            marginBottom: 20
          }}
          >
            <Text
            style={{
              fontSize: 12
            }}
            >Phone number</Text>
            <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
            }}
            >{user.phoneNumber}</Text>
          </View>

          <View
          style={{
            marginBottom: 20
          }}
          >
            <Text
            style={{
              fontSize: 12
            }}
            >Email</Text>
            <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
            }}
            >{user.email}</Text>
          </View>

          <View
          style={{
            marginBottom: 20
          }}
          >
            <Text
            style={{
              fontSize: 12
            }}
            >Town of residence</Text>
            <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
            }}
            >{user.name}</Text>
          </View>

          <View
          style={{
            marginBottom: 20
          }}
          >
            <Text
            style={{
              fontSize: 12
            }}
            >Biography</Text>
            <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
            }}
            >{user.bio ? user.bio : "No bio yet"}</Text>
          </View>

        </View>

      </ScrollView>
    </View>
  );
};

export default ProfileScreen;