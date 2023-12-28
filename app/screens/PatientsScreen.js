import { TextInput, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const PatientsScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation()
  const users = [
    { name: 'User 1', profileImage: require('../../assets/doctors/1.png'), lastMessage: 'Hello', unreadMessages: 2, lastMessageTime: '10:30 AM' },
    { name: 'User 2', profileImage: require('../../assets/doctors/2.png'), lastMessage: 'Hey there', unreadMessages: 0, lastMessageTime: 'Yesterday' },
    { name: 'User 3', profileImage: require('../../assets/doctors/3.png'), lastMessage: 'What\'s up?', unreadMessages: 5, lastMessageTime: '2 days ago' }
  ];

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
          placeholderTextColor="#888"
        />
      </View>
    )
  }

  return (
    <View style={[{
      flex: 1,
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

      <View>
        {users.map((user, index) => (
          <TouchableOpacity style={styles.userContainer} key={index} onPress={() => navigation.navigate("chatDoctor")}>
            <Image source={user.profileImage} style={styles.profileImage} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.lastMessage}>{user.lastMessage}</Text>
            </View>
            {user.unreadMessages > 0 && (
              <View>
                <Badge>{user.unreadMessages}</Badge>
                <Text style={styles.lastMessageTime}>{user.lastMessageTime}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

    </View>
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
