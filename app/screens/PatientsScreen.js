import { TextInput, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../config/firebaseConfig';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { formatTimestampLikeWhatsApp } from '../constants/helpers';

const PatientsScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation()
  const [doctor, setDoctor] = useState({})
  const [patients, setPatients] = useState([])
  const [msgs, setMsgs] = useState([])
  const users = [
    { name: 'User 1', profileImage: require('../../assets/doctors/1.png'), lastMessage: 'Hello', unreadMessages: 2, lastMessageTime: '10:30 AM' },
    { name: 'User 2', profileImage: require('../../assets/doctors/2.png'), lastMessage: 'Hey there', unreadMessages: 0, lastMessageTime: 'Yesterday' },
    { name: 'User 3', profileImage: require('../../assets/doctors/3.png'), lastMessage: 'What\'s up?', unreadMessages: 5, lastMessageTime: '2 days ago' }
  ];

  async function getPatientsAndMessages() {
    try {
      // Get the patients' IDs for the doctor
      const uid = auth.currentUser.uid;

      // Query Firestore with UID
      const q = query(collection(db, "users"), where("id", "==", uid));
      // const docRef = collection(db, "users", uid);
      getDocs(q)
        .then((snapshot) => {
          if (snapshot.docs.length > 0) {
            const userDoc = snapshot.docs[0];
            const userData = userDoc.data();
            setDoctor({...userData, __id: userDoc.id})
            console.log("Doctor data:", userData);
          } else {
            console.log("User not found");
          }
        })
        .catch((error) => {
          console.error("Error getting user:", error);
        });

      // Get the patient data and messages for each patient
      const patientsAndMessages = [];
      for (const patientId of doctor.patients) {
        const patientRef = query(collection(db, "users"), where("id", "==", patientId));
        const patientSnapshot = await getDocs(patientRef);

        const patientData = patientSnapshot.docs[0].data();
        const patientName = patientData.name;
        const patientPhoto = patientData.photo ? patientData.photo : require("../../assets/happy_icon.png");

        const messagesRef = query(
          collection(db, "messages"),
          where("senderId", "in", [auth.currentUser.uid, patientId]),
          where("receiverId", "in", [auth.currentUser.uid, patientId]),
          orderBy("createdAt", "desc"),
          limit(10) // Optional: Limit the number of messages fetched
        );
        const messagesSnapshot = await getDocs(messagesRef);
        const messages = messagesSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log("Messages: ", messages)
        setMsgs(messages)
        console.log("messages: ", msgs)

        patientsAndMessages.push({
          patientId: patientId,
          name: patientName,
          profileImage: patientPhoto,
          messages: messages,
          lastMessage: messages[0] ? messages[0].mesage : "No messages",
          unreadMessages: 1,
          lastMessageTime: messages[0] ? formatTimestampLikeWhatsApp(messages[0].createdAt) : "Last time"
        });
        setPatients(patientsAndMessages)
      }

      console.log(patientsAndMessages); // Output the fetched data
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPatientsAndMessages();
  }, [])

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
        {patients.map((user, index) => (
          <TouchableOpacity style={styles.userContainer} key={index} onPress={() => navigation.navigate("chatDoctor", {
            patient: user,
            messages: msgs
          })}>
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
