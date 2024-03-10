import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const UserCard = ({ name, specialty, image, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={image} style={styles.image} />
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.specialty}>{specialty}</Text>
  </TouchableOpacity>
);

const DoctorList = ({ data }) => {
  const navigation = useNavigation();
  
  if (!data || data.length === 0) {
    return <Text style={styles.noData}>Cannot load data at the moment.</Text>;
  }

  const navigateToDoctor = (doc) => {
    navigation.navigate("chatPatient", { doc });
  };

  return (
    <View style={styles.container}>
      {data.map((doc) => (
        <UserCard
          key={doc.uuid}
          name={doc.name}
          specialty={doc.specialization === "general practitioner" ? "GP" : doc.specialization}
          image={doc.image ? { uri: doc.image } : require("../../assets/icon.png")}
          onPress={() => navigateToDoctor(doc)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  card: {
    padding: 20,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  specialty: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  noData: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DoctorList;
