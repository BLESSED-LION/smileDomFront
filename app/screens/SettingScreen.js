import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../constants/theme';
import { useSelector } from 'react-redux';

const SettingsScreen = ({navigation}) => {
  const theme = useTheme()
  const u = useSelector((state) => state.user.user)
  const user = u != null ? u._j : {image: "", name: "", specialization: "", experience: "", type:""};
  console.log("User: ", user)
  const i = user != null && user.image ? {uri: user.image} :require("../../assets/icon.png")

  const handleEditPress = () => {
    navigation.navigate("updateProfile", {user})
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.coverPhoto}
          source={require("../../assets/onboard1.png")}
        />
        <View style={styles.profileContainer}>
          <Image
            style={styles.profilePhoto}
            source={i}
          />
          <Text style={styles.nameText}>{user != null && user.name ? user.name : "Your name"}</Text>
        </View>
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.bioText}>
          {user != null && user.bio ? user.bio : "If you update your bio it will be displayed here"}
        </Text>
      </View>

      {u.type === "doctor" &&
      <View style={styles.statsContainer}>
        <View style={styles.statContainer}>
          <Text style={styles.statCount}>0</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statCount}>0</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statCount}>0</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>}
      <TouchableOpacity style={[styles.button, {backgroundColor: "#BFD101"}]} onPress={handleEditPress}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
  },
  coverPhoto: {
    width: '100%',
    height: 200,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -50,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  bioContainer: {
    padding: 15,
  },
  bioText: {
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  statContainer: {
    alignItems: 'center',
    flex: 1,
  },
  statCount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
    color: '#999',
  },
  button: {
    backgroundColor: '#0066cc',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
};

export default SettingsScreen;