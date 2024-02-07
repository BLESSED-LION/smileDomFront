import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { extractAllButLastName } from '../constants/helpers';
import LoadingComponent from './LoadingComponent';

const UserCard = ({ name, specialty, image, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <Image source={image} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.specialty}>{specialty}</Text>
    </TouchableOpacity>
  )
};

const DoctorList = ({ data }) => {
  const navigation = useNavigation();
  const v = JSON.stringify(data) === JSON.stringify([]) ? true : false
  console.log("V: ", data)
  // <ScrollView>
  return (
    <View style={styles.container}>
      {data.map(user => {
        return (
          <UserCard
            key={user.id}
            name={extractAllButLastName(user.name)}
            specialty={user.specialization === "general practitioner" ? "GP" : user.specialization}
            image={user.image ? {uri: user.image} : require("../../assets/icon.png")}
            onPress={() => {console.log(user); navigation.navigate("chatPatient", { user })}}
          />
        )
      })}
      {v && <Text style={{fontSize: 16}}>Cannot load data at the current moment</Text>}

    </View>
  )
  // </ScrollView>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    padding: 20,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
    // maxWidth: 190
  },
  image: {
    width: 100,
    height: 100,
    // borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  specialty: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
});

export default DoctorList;
