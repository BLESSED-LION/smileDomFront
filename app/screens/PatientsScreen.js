import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useTheme } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator, Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { filterUniqueAndSortByCreatedAt } from '../constants/helpers';
import { useSelector } from 'react-redux';

const PatientsScreen = ({route}) => {
  const { theme } = useTheme();
  const navigation = useNavigation()
  const [patients, setPatients] = useState([])
  const [msgs, setMsgs] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const u = useSelector((state) => state.user.user);
  const us = u._j ? u._j : {patientsData: []}
  const p = filterUniqueAndSortByCreatedAt(us.patientsData);
  console.log("Docs patients data: ", p)
  const [loading, setLoading] = useState(false)
  console.log("Loading... ", loading)

  const filteredPatients = useMemo(() => {
    if (!searchQuery) {
      return patients; // Return all patients if no search query
    }
  
    return patients.filter((patient) => {
      const searchTerm = searchQuery.toLowerCase();
      const patientName = patient.name.toLowerCase();
      return patientName.includes(searchTerm);
    });
  }, [patients, searchQuery]);

  const SearchBar = () => {
    return (
      <View
        style={{
          width: 252,
          backgroundColor: '#D9D9D9',
          borderRadius: 27,
          paddingVertical: 11,
          paddingLeft: 19.5,
        }}
      >
        <TextInput
          placeholder='Search'
          style={{
            fontSize: 14,
            zIndex: 1000,
            marginLeft: 10,
          }}
          value={searchQuery} 
          onChangeText={setSearchQuery}
        />
      </View>
    )
  }

  return (
    <ScrollView style={[{
      flex: 1,
      backgroundColor: "#fff"
    }]}>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 45,
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          paddingBottom: 16,
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <Image
          source={require('../../assets/happy_icon.png')}
          resizeMode='contain'
          style={{
            height: 34,
            width: 36.52,
          }} />

        <SearchBar />

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <MaterialCommunityIcons name="note-text" size={25} color={theme.colors.accountText} />
          <Text
            style={{
              fontSize: 8.26,
            }}
          >Reports</Text>
        </View>
      </View>
      {loading && <View style={{alignSelf:"center", marginTop: 50}}><ActivityIndicator /></View>}

      <View>
        {p.map((user, index) => {console.log(user); return(
          <TouchableOpacity style={styles.userContainer} key={index} onPress={() => navigation.navigate("chatDoctor", {
            patient: user,
            messages: msgs,
            doctor: user
          })}>
            <Image source={user.profileImage ? {uri: user.profileImage} : require("../../assets/icon.png")} style={styles.profileImage} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.lastMessage}>{user.lastMessage}</Text>
            </View>
            {/* {user.unreadMessages > 0 && (
              <View>
                <Badge>{user.unreadMessages}</Badge>
                <Text style={styles.lastMessageTime}>{user.lastMessageTime}</Text>
              </View>
            )} */}
          </TouchableOpacity>
        )})}
      </View>

    </ScrollView>
  )
}

export default PatientsScreen

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500'
  },
  lastMessage: {
    color: '#666',
    fontSize: 10,
    fontWeight: '400'
  },
  badge: {
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center'
  },
  unreadCount: {
    color: 'white',
    fontWeight: 'bold'
  },
  lastMessageTime: {
    color: '#666',
    fontSize: 12,
    marginTop: 5
  }
});
