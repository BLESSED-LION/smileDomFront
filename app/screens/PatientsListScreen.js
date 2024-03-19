import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_CHATS } from '../constants/mutations';
import { useNavigation } from '@react-navigation/native';
import { formatTime } from '../constants/helpers';

const PatientListScreen = () => {
  const { loading, error, data } = useQuery(GET_CHATS);
  const navigation = useNavigation();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading patients...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const { userChats } = data;

  const renderPatientItem = ({ item }) => (
    <TouchableOpacity
      style={styles.patientItem}
      onPress={() => navigation.navigate('chatDoctor', { patient: item })}
    >
      <Image source={!item.avatar ? require("../../assets/doctor.png") : {uri: item.avatar}} style={styles.avatar} />
            <View style={styles.patientInfo}>
                <Text style={styles.patientName}>{item.name}</Text>
                <View style={styles.lastMessageContainer}>
                    <Text style={styles.lastMessage}>{item.lastMessage}</Text>
                </View>
            </View>
            <View>
                {item.unreadMessages > 0 && (
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadCount}>{item.unreadMessages}</Text>
                    </View>
                )}
                {console.log(formatTime(parseFloat(item.lastMessageTime)))}
                <Text style={styles.lastMessageTime}>{formatTime(parseFloat(item.lastMessageTime))}</Text>
            </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={userChats}
        renderItem={renderPatientItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.patientList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 10,
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  patientList: {
    paddingVertical: 10,
  },
  patientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lastMessage: {
    fontSize: 14,
    color: '#555',
  },
  lastMessageTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    color: '#fff',
    fontSize: 12,
  },
});

export default PatientListScreen;
