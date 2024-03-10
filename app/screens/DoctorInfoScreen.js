import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../constants/theme';
import { Ionicons,Fontisto } from '@expo/vector-icons';

const DoctorInfoScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { doctor } = route.params;
  const handleGoBack = () => {
    navigation.goBack();
  };

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
          source={doctor.image? doctor.image : require('../../assets/doctor.png')}
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
              <Ionicons name="add" size={20} color="white" />
              <Text style={{color: theme.colors.White}} >follow</Text>
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
            >127</Text>
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
            >+5 years</Text>
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
            >24 Consults</Text>
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
            >Phone number</Text>
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
            >Email</Text>
            <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
            }}
            >{doctor.email}</Text>
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
            >Biography</Text>
            <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
            }}
            >Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</Text>
          </View>

        </View>

      </ScrollView>
    </View>
  );
};

export default DoctorInfoScreen;