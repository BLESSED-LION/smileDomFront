import React, { useState, useEffect, useCallback } from 'react';
import { View, ActivityIndicator, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../constants/theme';
import { renderInputToolbar, renderActions, renderComposer, renderSend } from '../components/InputToolbar';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_NOTIFICATION, GET_CHAT_MESSAGE, SEND_MESSAGE } from '../constants/mutations';
import Toast from 'react-native-toast-message';

const PatientChatScreen = ({ route }) => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [sendingMessage, setSendingMessage] = useState(false);
    const { theme } = useTheme();
    const { doc } = route.params;
    const user = useSelector((state) => state.user);
    const { u } = user;
    const senderId = u && u.uuid;
    const receiverId = doc && doc.uuid;
    const navigation = useNavigation();

    const [sendMessage] = useMutation(SEND_MESSAGE);
    const [createNotification] = useMutation(CREATE_NOTIFICATION);

    const { loading: ld, data } = useQuery(GET_CHAT_MESSAGE, {
        variables: { senderId, receiverId },
        pollInterval: 3000, // Poll every 5 seconds
    });

    useEffect(() => {
        if (data && data.getChatMessages) {
            const formattedMessages = data.getChatMessages.map(message => ({
                _id: message.id,
                text: message.message,
                createdAt: parseInt(message.timestamp),
                user: {
                    _id: message.sender.uuid,
                    name: message.sender.name,
                    avatar: message.sender.profileImage
                }
            }));

            const sortedMessages = formattedMessages.sort((a, b) => b.createdAt - a.createdAt);
            setMessages(sortedMessages);
            setSendingMessage(false)
        }
    }, [data]);

    const onSend = useCallback(async (newMessages = []) => {
        const { _id, text } = newMessages[0];
        setSendingMessage(true)

        try {
            await Promise.all([
                sendMessage({ variables: { senderId, receiverId, message: text } }),
                createNotification({ variables: { input: { userId: doc.id, message: `New message from ${u && u.name}: ${text}` } } })
            ]);
        } catch (error) {
            console.error("Error sending message or creating notification:", error);
            Toast.show({
                text1: "Error sending message",
                type: "errpr", // Can be 'success', 'info', 'warning', or 'error'
                position: "top", // Can be 'top', 'center', or 'bottom'
                duration: 3000, // Duration in milliseconds
            });
        }

        setSendingMessage(false);
    }, [sendMessage, senderId, receiverId, createNotification]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image source={require("../../assets/icon.png")} style={styles.profileImage} />
                </TouchableOpacity>
                <View style={styles.userInfo}>
                    <TouchableOpacity style={styles.userName}>
                        <Text style={{ fontWeight: "500" }}>{doc.name}</Text>
                        <Text>Online</Text>
                    </TouchableOpacity>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity style={styles.tico}>
                            <FontAwesome name="search" size={24} color={theme.colors.yellow} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tico} onPress={() => navigation.navigate("videoCallScreen")}>
                            <FontAwesome name="video-camera" size={24} color={theme.colors.yellow} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tico} onPress={() => navigation.navigate("previousConsult", { patient: u, doctor: doc })}>
                            <FontAwesome name="book" size={24} color={theme.colors.yellow} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: "#fff", paddingBottom: 10 }}>
                {ld && <ActivityIndicator style={{ alignSelf: "center", marginTop: 50 }} />}
                <GiftedChat
                    messages={messages}
                    onSend={onSend}
                    text={text}
                    onInputTextChanged={setText}
                    alwaysShowSend
                    bottomOffset={26}
                    renderInputToolbar={renderInputToolbar}
                    renderActions={renderActions}
                    renderComposer={renderComposer}
                    renderSend={renderSend}
                    user={{ _id: user && user.user.uuid }}
                />
                {sendingMessage && <ActivityIndicator style={{ alignSelf: "center", marginTop: 50 }} />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 10
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

export default PatientChatScreen;
