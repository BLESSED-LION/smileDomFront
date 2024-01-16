import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../constants/theme';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import { ActivityIndicator, List } from 'react-native-paper';

const SessonsScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Chats');
  const [chats, setChats] = useState([])
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()

  const tabs = ['Chats', 'Complains', 'Medical History', 'Examinations', 'Diagnosis']

  useEffect(async () => {
    const messagesRef = collection(db, 'messages');
    const complainsRef = collection(db, 'appointments');
    const querySnapshot = await getDocs(query(messagesRef, where('senderId', '==', auth.currentUser.uid), where('receiverId', '==', auth.currentUser.uid)));
    const querySnapshot1 = await getDocs(query(complainsRef, where('patient', '==', auth.currentUser.uid)));

    const groupedMessages = querySnapshot.docs.reduce((acc, doc) => {
      const messageData = doc.data();
      const chatId = messageData.chatId;
      acc[chatId] = acc[chatId] || []; // Initialize group if it doesn't exist
      acc[chatId].push(messageData);
      return acc;
    }, {});
    const apps = querySnapshot1.docs.map((doc) => doc.data())
    const groupedMessagesArray = Object.values(groupedMessages);
    setApps(apps)
    setChats(groupedMessagesArray)
    console.log("Grouped Messages: ", groupedMessagesArray)
    console.log("Appointments: ", apps)
    setLoading(false)

  }, [])

  return (
    <View
      style={{
        marginTop: 50,
      }}
    >
      <ScrollView horizontal>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedTab(tab)}
            style={{
              borderTopColor: theme.colors.Background,
              borderLeftColor: theme.colors.Background,
              borderRightColor: theme.colors.Background,
              borderBottomColor: tab === selectedTab ? "#2FA8E5" : theme.colors.Background,
              borderWidth: 3,
            }}
          >
            <Text style={{ padding: 10, fontWeight: "500" }}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {loading && <View style={{alignSelf:"center", marginTop: 50}}><ActivityIndicator /></View>}
      {!loading && chats == [] ? <View style={{alignSelf:"center", marginTop: 50}}>
        <Text style={{fontSize:16, fontWeight:"900"}}>No data to display. Consult to get results</Text>
      </View>:
      <View style={{ padding: 20 }}>
        {selectedTab === 'Chats' && (
          <List.Section>
            {chats.map((chat) => (
              <List.Item
                key={chat._id}
                title={chat[0].mesage}
                description={chat[1] ? chat[1].mesage : chat[0].mesage}
                left={(props) => (
                  // <List.Icon {...props} icon={chat.unread ? 'email' : 'email-read'} />
                  <List.Icon {...props} icon={'email'} />
                )}
              />
            ))}
          </List.Section>
        )}
        {selectedTab === 'Complains' && (
          <List.Section>
          {apps.map((arr, index) => (
            <List.Item
              key={index}
              title={arr.complains[0]}
              description={arr.complains[0]}
              left={(props) => <List.Icon {...props} icon="alert-circle" />}
            />
          ))}
        </List.Section>
        )}
        {selectedTab === 'Medical History' && (
          <List.Section>
          {apps.map((arr, index) => (
            <List.Item
              key={index}
              title={arr.history[0]}
              description={arr.history[0]}
              left={(props) => <List.Icon {...props} icon="alert-circle" />}
            />
          ))}
        </List.Section>
        )}
        {selectedTab === 'Examinations' && (
          <List.Section>
          {apps.map((arr, index) => (
            <List.Item
              key={index}
              title={arr.examinations[0]}
              description={arr.examinations[0]}
              left={(props) => <List.Icon {...props} icon="alert-circle" />}
            />
          ))}
        </List.Section>
        )}
        {selectedTab === 'Diagnosis' && (
          <List.Section>
          {apps.map((arr, index) => (
            <List.Item
              key={index}
              title={arr.diagnosis[0]}
              description={arr.diagnosis[0]}
              left={(props) => <List.Icon {...props} icon="alert-circle" />}
            />
          ))}
        </List.Section>
        )}
      </View>}
    </View>
  );
};

export default SessonsScreen;
