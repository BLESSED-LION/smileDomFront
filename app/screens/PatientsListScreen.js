import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';

const PatientListScreen = ({ navigation }) => {
    const user = useSelector((state) => state.user);
    const {user: u} = user;

    const patients = [
        { id: '1', name: 'Patient 1', avatar: require('../../assets/doctors/1.png'), lastMessage: 'Hi', lastMessageTime: '10:30 AM', unreadMessages: 2 },
        { id: '2', name: 'Patient 2', avatar: require('../../assets/doctors/2.png'), lastMessage: 'Hello', lastMessageTime: 'Yesterday', unreadMessages: 0 },
        { id: '3', name: 'Patient 3', avatar: require('../../assets/doctors/3.png'), lastMessage: 'Good morning', lastMessageTime: '2 days ago', unreadMessages: 1 },
        // Add more patients as needed
    ];

    const renderPatientItem = ({ item }) => (
        <TouchableOpacity
            style={styles.patientItem}
            onPress={() => navigation.navigate('chatDoctor', { patient: item, doctor: u })}
        >
            <Image source={item.avatar} style={styles.avatar} />
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
                <Text style={styles.lastMessageTime}>{item.lastMessageTime}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={patients}
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
        marginTop: 30,
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
