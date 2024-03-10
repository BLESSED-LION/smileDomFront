import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../constants/theme';
import React from 'react';
import dummyData from '../constants/dummyData';
import { useSelector } from 'react-redux';
import { auth } from '../config/firebaseConfig';
import { extractAllButLastName } from '../constants/helpers';
import useDoctors from '../hooks/getDoctors';
import { useNavigation } from '@react-navigation/native';

const DoctorsNearYou = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  const {doctors, loading} = useDoctors();

  function DoctorList({doctor, photo, DoctorName, online }) {
    return (
      <TouchableOpacity
      onPress={() => {
        navigation.navigate('doctor', { doctor });
      }}
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
        Doctors near you
      </Text>

      {/* Doctors List */}
      <FlatList
        data={doctors} // Use the Doctors array from dummyData
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.email.toString()} // Use unique IDs for keys
        renderItem={({ item }) => (
          <DoctorList
          doctor = {item}
           photo={item.image ? item.image : require('../../assets/doctor.png')}
           DoctorName={item.name ? item.name : 'Anonymous'}
           online={false} // TODO: Implement online status
            />
        )}
        contentContainerStyle={{ paddingVertical: 7, }} // Adjust spacing as needed
      />
    </View>
  );
};

export default DoctorsNearYou;