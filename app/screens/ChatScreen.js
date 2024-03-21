import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CHAT_MESSAGE, SEND_MESSAGE } from '../constants/mutations';
import { useSelector } from 'react-redux';
import { useTheme } from '../constants/theme';
import { renderActions, renderComposer, renderInputToolbar, renderSend } from '../components/InputToolbar';

const ChatScreen = ({ route, navigation }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [call, setCall] = useState(false);
    const [sendingMessage, setSendingMessage] = useState(false); // State to track if a message is being sent
    const user = useSelector((state) => state.user);
    const { patient } = route.params;
    const { user: doctor } = user;
    const senderId = user.user.uuid;
    const receiverId = patient.uuid;
    const { theme } = useTheme()

    const [sendMessage] = useMutation(SEND_MESSAGE);

    const { loading: ld, error: err, data, refetch } = useQuery(GET_CHAT_MESSAGE, {
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
                }
            }));

            // Sort messages in ascending order based on createdAt timestamp
            const sortedMessages = formattedMessages.sort((a, b) => b.createdAt - a.createdAt);

            setMessages(sortedMessages);
            setSendingMessage(false);
        }
    }, [data]);

    const onSend = useCallback(async (newMessages = []) => {
        const { _id, createdAt, text, user } = newMessages[0];

        // Set sendingMessage state to true to display loading indicator
        setSendingMessage(true);

        try {
            await sendMessage({
                variables: {
                    senderId: senderId,
                    receiverId: receiverId,
                    message: text,
                }
            });
        } catch (error) {
            console.error("Error sending message:", error);
        }

        // Set sendingMessage state to false after message is sent
    }, [sendMessage, senderId, receiverId]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require("../../assets/doctor.png")} style={styles.profileImage} />
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
                        <TouchableOpacity style={styles.tico} onPress={() => navigation.navigate("previousConsult", {
                            patient,
                            doctor,
                        })}>
                            <FontAwesome name="heartbeat" size={24} color={theme.colors.yellow} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: "#fff", paddingBottom: 10 }}>
                {ld && <ActivityIndicator style={{alignSelf:"center", marginTop: 50}} />}
                <GiftedChat
                    messages={messages}
                    onSend={onSend}
                    alwaysShowSend
                    user={{
                        _id: doctor.uuid, // Current user's ID
                    }}
                    renderInputToolbar={renderInputToolbar} // Use custom input toolbar
                    renderActions={renderActions} // Use custom actions component
                    renderComposer={renderComposer} // Use custom composer component
                    renderSend={renderSend} // Use custom send component
                />
                {/* Display loading indicator while sending message */}
                {sendingMessage && <ActivityIndicator style={{alignSelf:"center", marginTop: 50}} />}
            </View>
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
    tico: {
        padding: 5
    },
});

export default ChatScreen;
