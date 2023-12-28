import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../constants/theme';
import React from 'react';
import dummyData from '../constants/dummyData';
import { useSelector } from 'react-redux';
import { auth } from '../config/firebaseConfig';
import { extractAllButLastName } from '../constants/helpers';

const DoctorsNearYou = ({onPress}) => {
  const { theme } = useTheme();
  const user = useSelector((state) => state.auth.user);

  function DoctorList({ photo, DoctorName, online, onPress }) {
    return (
      <TouchableOpacity
      onPress={() => onPress({ photo, DoctorName, online })}
        style={{
          alignItems: 'center',
          marginRight: 12,
        }}
      >
        <Image
          source={photo}
          style={{
            height: 81,
            width: 81,
            borderRadius: 60,
            borderWidth: online ? 3 : 0,
            borderColor: online ? theme.colors.Primary : 'transparent',
          }}
        />
        <Text
          style={{
            fontSize: 12,
            fontWeight: '400',
            color: theme.colors.White,
            marginTop: 4,
          }}
        >
          {DoctorName}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={{
        height: 152,
        width: '100%',
        backgroundColor: theme.colors.grey4,
        paddingLeft: 11,
        paddingVertical: 6,
        justifyContent:'center',
      }}
    >
      <Text
        style={{
          fontSize: 15,
          fontWeight: '400',
          lineHeight: 18,
          color: theme.colors.Primary,
        }}
      >
        Doctors near {auth.currentUser.displayName && extractAllButLastName(auth.currentUser.displayName)}
        {console.log(user)}
      </Text>

      {/* Doctors List */}
      <FlatList
        data={dummyData.Doctors} // Use the Doctors array from dummyData
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()} // Use unique IDs for keys
        renderItem={({ item }) => (
          <DoctorList
           photo={item.photo}
           DoctorName={item.name}
           online={item.online}
           onPress={(doctorInfo) => onPress(doctorInfo)}
            />
        )}
        contentContainerStyle={{ paddingVertical: 7, }} // Adjust spacing as needed
      />
    </View>
  );
};

export default DoctorsNearYou;