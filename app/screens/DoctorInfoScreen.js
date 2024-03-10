import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useTheme } from '../constants/theme';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { gql, useMutation } from '@apollo/client';

const FOLLOW_USER_MUTATION = gql`
  mutation FollowUser($id: ID!) {
    followUser(id: $id)
  }
`;

const DoctorInfoScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { doctor } = route.params;
  const handleGoBack = () => {
    navigation.goBack();
  };

  const [followUserMutation, { data, loading, error }] = useMutation(FOLLOW_USER_MUTATION);

  const followUser = async (userId) => {
    try {
      await followUserMutation({ variables: { id: userId } });
    } catch (e) {
      console.error("Error following doctor:", e);
    }
  };


  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
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
        >{doctor.name}</Text>
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
            source={doctor.image ? doctor.image : require('../../assets/doctor.png')}
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
            >{doctor.name}</Text>
            <Text>{doctor.name}</Text>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 23,
              }}
            >
              <TouchableOpacity
                onPress={() => { followUser(doctor.uuid) }}
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
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <>
                    <Ionicons name="add" size={20} color="white" />
                    <Text style={{ color: theme.colors.White }}>follow</Text>
                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { navigation.navigate('Consult', { doctor }) }}
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
                <Text style={{ color: theme.colors.White, marginLeft: 3 }} >consult</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>


        <View
          style={{
            flexDirection: 'row',
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
            >{doctor.followersCount}</Text>
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
            >+{doctor.yearsOfExperience} years</Text>
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
            >{doctor.consultationsDone} Consults</Text>
          </View>
        </View>

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
            >{doctor.name}</Text>
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
            >{doctor.username}</Text>
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
            >Speciality</Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >{doctor.specialisation}</Text>
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
            >Gender</Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
              }}
            ></Text>
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
            >{doctor.phoneNumber}</Text>
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
            >{doctor.userData.email}</Text>
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
            >{doctor.address}</Text>
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
            >
              {doctor.biography}
            </Text>
          </View>

        </View>

      </ScrollView>
    </View>
  );
};

export default DoctorInfoScreen;