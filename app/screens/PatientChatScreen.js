import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, StatusBar } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../constants/theme';
import { renderInputToolbar, renderActions, renderComposer, renderSend } from '../components/InputToolbar';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
import useDoctors from '../hooks/getDoctors';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CHAT_MESSAGE, SEND_MESSAGE } from '../constants/mutations';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PatientChatScreen = ({ route }) => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const { theme } = useTheme();
    const { doc } = route.params;
    const user = useSelector((state) => state.user);
    const senderId = user.user.uuid
    const receiverId = doc.uuid
    const navigation = useNavigation()
    const [loading, setLoading] = useState(true);
    const u = useSelector((state) => state.user.user);

    const [sendMessage] = useMutation(SEND_MESSAGE);

    const { loading: ld, error: err, data } = useQuery(GET_CHAT_MESSAGE, {
        variables: { senderId, receiverId },
        fetchPolicy: 'network-only',
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
                    avatar: message.sender.profileImage
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
                <TouchableOpacity>
                    <Image source={doc.image ? { uri: doc.image } : require("../../assets/icon.png")} style={styles.profileImage} />
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
                        <TouchableOpacity style={styles.tico} onPress={() => navigation.navigate("previousConsult", {
                            patient: u,
                            doctor: user,
                        })}>
                            <FontAwesome name="book" size={24} color={theme.colors.yellow} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: "#fff", paddingBottom: 10 }}>
                {/* {loading && <ActivityIndicator style={{ alignSelf: "center", marginTop: 50 }} />} */}
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
                    user={{
                        _id: user.user.uuid, // Current user's ID
                    }}
                />
            </View>
            {/* <StatusBar translucent backgroundColor="transparent" /> */}
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