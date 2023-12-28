import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const data = [
  // { id: 1, name: 'John Doe', specialty: 'Software Engineer', image: require('../../assets/doctors/1.png') },
  { id: 1, name: 'Jane Smith', specialty: 'GP', image: require('../../assets/doctors/2.png') },
  { id: 2, name: 'Mary Skrill', specialty: 'GP', image: require('../../assets/doctors/2.png') },
  { id: 3, name: 'Dirty Diana', specialty: 'GP', image: require('../../assets/doctors/2.png') },
  { id: 4, name: 'Smooth Skillz', specialty: 'GP', image: require('../../assets/doctors/2.png') },
  // Add more user data here
];

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

const DoctorList = () => {
  const navigation = useNavigation();
  // <ScrollView>
  return (
    <View style={styles.container}>
      {data.map(user => (
        <UserCard
          key={user.id}
          name={user.name}
          specialty={user.specialty}
          image={user.image}
          onPress={() => navigation.navigate("chatPatient", {user})}
        />
      ))}
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
