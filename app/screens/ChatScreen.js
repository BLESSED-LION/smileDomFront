import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../constants/theme';
import { renderInputToolbar, renderActions, renderComposer, renderSend } from '../components/InputToolbar';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../config/firebaseConfig';
import { addDoc, collection, doc, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';
import WebView from 'react-native-webview';

const ChatScreen = ({ route, navigation }) => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();
    const [call, setCall] = useState(false);
    const { patient, doctor } = route.params;
    // const patient = pat ? patient : {profileImage: "", patient: {id: ""}, name: ""};
    console.log("The patient: ", patient)
    // const doctor = doct ? doct : {id: "", name: ""};
    const messagesCollectionRef = collection(db, 'messages');

    // useEffect(() => {
    //     const q = query(messagesCollectionRef, 
    //         orderBy('createdAt', 'desc'), 
    //         where('senderId', 'in', [auth.currentUser.uid, patient.patient.id]),
    //         where('receiverId', 'in', [auth.currentUser.uid, patient.patient.id]),
    //         where('chatId', '==', patient.patient.id + auth.currentUser.uid)
    //         );
          
    //     const unsubscribe = onSnapshot(q, querySnapshot => {
    //         const msgs = querySnapshot.docs.map((doc) => doc.data())
    //         console.log("snapshot: ", msgs)
    //         setMessages(
    //             querySnapshot.docs.map(doc => ({
    //                 _id: doc.data().id,
    //                 createdAt: doc.data().createdAt.toDate(),
    //                 text: doc.data().mesage,
    //                 senderId: doc.data().senderId,
    //                 receiverId: doc.data().receiverId,
    //                 user: auth.currentUser.uid === doc.data().senderId ? doctor : patient.patient
    //             }))
    //         );
    //         console.log("Messages: ", messages)
    //         setLoading(false)
    //     });

    //     return () => unsubscribe();
    // }, []);

    const onSend = useCallback((messages = []) => {
        console.log("checking messages...: ", messages)
        const { _id, createdAt, text, user } = messages[0];
        console.log(text)
        // try {
        //     addDoc(collection(db, 'messages'), {
        //         _id,
        //         createdAt,
        //         mesage: text,
        //         senderId: auth.currentUser.uid,
        //         receiverId: patient.patient.id,
        //         chatId: patient.patient.id + auth.currentUser.uid
        //     })
        //     console.log("Message added")
        // } catch (error) {
        //     console.error(error)
        //     Toast.show({
        //         text1: 'An error occured while sending message',
        //         // text2: 'Additional text can go here',
        //         type: 'error', // Can be 'success', 'info', 'warning', or 'error'
        //         position: 'top', // Can be 'top', 'center', or 'bottom'
        //         duration: 3000, // Duration in milliseconds
        //     });
        // }
    }, [messages]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={patient && patient.profileImage} style={styles.profileImage} />
                </TouchableOpacity>
                <View style={styles.userInfo}>
                    <TouchableOpacity style={styles.userName}>
                        <Text style={{ fontWeight: "500" }}>{patient && patient.name}</Text>
                        <Text>Online</Text>
                    </TouchableOpacity>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity style={styles.tico}>
                            <FontAwesome name="search" size={24} color={theme.colors.yellow} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tico} onPress={() => setCall(true)}>
                            <FontAwesome name="video-camera" size={24} color={theme.colors.yellow} />
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.tico} onPress={() => navigation.navigate("videoCallScreen")}>
                            <FontAwesome name="video-camera" size={24} color={theme.colors.yellow} />
                        </TouchableOpacity> */}
                        <TouchableOpacity style={styles.tico} onPress={() => navigation.navigate("previousConsult", {
                            patient,
                            doctor,
                        })}>
                            <FontAwesome name="heartbeat" size={24} color={theme.colors.yellow} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {call && <WebView source={{ uri: 'https://dlvryy.web.app' }} style={{ flex: 1 }} />}
            <View style={{ flex: 1, backgroundColor: "#fff", paddingBottom: 10 }}>
            {loading && <View style={{alignSelf:"center", marginTop: 50}}><ActivityIndicator /></View>}
                { <GiftedChat
                    messages={messages}
                    onSend={newMessages => onSend(newMessages)}
                    text={text}
                    onInputTextChanged={setText}
                    alwaysShowSend
                    bottomOffset={26}
                    renderInputToolbar={renderInputToolbar}
                    renderActions={renderActions}
                    renderComposer={renderComposer}
                    renderSend={renderSend}
                    user={doctor}
                />}
            </View>
            <StatusBar backgroundColor={'#BFD101'} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userInfo: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    input: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        padding: 8,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#ccc',
    },
    tico: {
        padding: 5
    },
});

export default ChatScreen;
