import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_CHATS } from '../constants/mutations';
import { useNavigation } from '@react-navigation/native';
import { formatTime } from '../constants/helpers';
import { useTheme } from '../constants/theme';

const PatientListScreen = () => {
  const { loading, error, data } = useQuery(GET_CHATS);
  const navigation = useNavigation();
  const { theme } = useTheme();

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorContainer message={`Error: ${error.message}`} />;
  }

  const { userChats } = data;

  const renderPatientItem = ({ item }) => (
    <PatientItem item={item} navigation={navigation} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={userChats}
        renderItem={renderPatientItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.patientList}
      />
    </SafeAreaView>
  );
};

const PatientItem = ({ item, navigation }) => (
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
      <Text style={styles.lastMessageTime}>{formatTime(parseFloat(item.lastMessageTime))}</Text>
    </View>
  </TouchableOpacity>
);

const LoadingIndicator = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={theme.primary} />
    <Text>Loading patients...</Text>
  </View>
);

const ErrorContainer = ({ message }) => (
  <View style={styles.errorContainer}>
    <Text>{message}</Text>
  </View>
);

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
