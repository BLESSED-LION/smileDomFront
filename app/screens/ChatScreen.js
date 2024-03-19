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
import { useMutation, useQuery } from '@apollo/client';
import { GET_CHAT_MESSAGE, SEND_MESSAGE } from '../constants/mutations';
import { useSelector } from 'react-redux';

const ChatScreen = ({ route, navigation }) => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();
    const [call, setCall] = useState(false);
    const user = useSelector((state) => state.user);
    const { patient } = route.params;
    const { user: doctor } = user;
    const senderId = user.user.uuid;
    const receiverId = patient.uuid;

    const [sendMessage] = useMutation(SEND_MESSAGE);

    const { loading: ld, error: err, data, refetch } = useQuery(GET_CHAT_MESSAGE, {
        variables: { senderId, receiverId },
        pollInterval: 5000, // Poll every 5 seconds
    });

    useEffect(() => {
        if (data && data.getChatMessages) {
            // Map retrieved messages to format expected by GiftedChat
            const formattedMessages = data.getChatMessages.map(message => ({
                _id: message.id,
                text: message.message,
                createdAt: parseInt(message.timestamp),
                user: {
                    _id: message.sender.uuid,
                    name: message.sender.name,
                    // avatar: message.sender.profileImage
                }
            }));

            const sortedMessages = formattedMessages.sort((a, b) => b.createdAt - a.createdAt);
            setMessages(sortedMessages);
        }
    }, [data]);

    const onSend = useCallback(async (newMessages = []) => {
        const { _id, createdAt, text, user } = newMessages[0];

        // Update UI immediately with the new message
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, newMessages)
        );

        try {
            // Send the message to the server
            await sendMessage({
                variables: {
                    senderId: senderId,
                    receiverId: receiverId,
                    message: text,
                }
            });
        } catch (error) {
            console.error("Error sending message:", error);
            // Handle error if needed
        }
    }, [sendMessage]);

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
                    user={{
                        _id: doctor.uuid, // Current user's ID
                    }}
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
