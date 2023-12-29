import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../constants/theme';
import { renderInputToolbar, renderActions, renderComposer, renderSend } from '../components/InputToolbar';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../config/firebaseConfig';
import { addDoc, collection, getDocs, orderBy, query, where, FieldPath, FieldValue, onSnapshot } from 'firebase/firestore';
import { useSelector } from 'react-redux';

const PatientChatScreen = (route) => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [error, setError] = useState(null);
    const { theme } = useTheme();
    console.log(route)
    const { user } = route.route.params;
    const senderId = auth.currentUser.uid
    const receiverId = user.id
    console.log(user)
    const navigation = useNavigation()
    const messagesCollectionRef = collection(db, 'messages');
    const u = useSelector((state) => state.user.user);

    // const onSend = (newMessages = []) => {
    //     setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    // };

    useEffect(() => {
        const q = query(messagesCollectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, where('senderId', '==', senderId) ||
          where(
            'receiverId', '==', senderId
          ), querySnapshot => {
            const msgs = querySnapshot.docs.map((doc) => doc.data())
            console.log("snapshot: ", msgs)
            setMessages(
                querySnapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().mesage,
                    senderId: doc.data().senderId,
                    receiverId: doc.data().receiverId,
                    user: u
                }))
            );
            console.log(messages)
        });

        return () => unsubscribe();
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages)
        );
        const { _id, createdAt, text, user } = messages[0];
        console.log(text)
        addDoc(collection(db, 'messages'), {
            _id,
            createdAt,
            mesage: text,
            senderId: senderId,
            receiverId,
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image source={user.image ? user.image : require("../../assets/icon.png")} style={styles.profileImage} />
                </TouchableOpacity>
                <View style={styles.userInfo}>
                    <TouchableOpacity style={styles.userName}>
                        <Text style={{ fontWeight: "500" }}>{user.name}</Text>
                        <Text>Online</Text>
                    </TouchableOpacity>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity style={styles.tico}>
                            <FontAwesome name="search" size={24} color={theme.colors.yellow} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tico}>
                            <FontAwesome name="video-camera" size={24} color={theme.colors.yellow} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tico} onPress={() => navigation.navigate("conResult")}>
                            <FontAwesome name="book" size={24} color={theme.colors.yellow} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <GiftedChat
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
                user={auth.currentUser}
            />
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

export default PatientChatScreen;
