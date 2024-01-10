import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../constants/theme';
import { renderInputToolbar, renderActions, renderComposer, renderSend } from '../components/InputToolbar';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../config/firebaseConfig';
import { doc, addDoc, collection, orderBy, query, where, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

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

    useEffect(() => {
        const q = query(messagesCollectionRef, orderBy('createdAt', 'desc'), where('senderId', 'in', [auth.currentUser.uid, user.id]),
            where('receiverId', 'in', [auth.currentUser.uid, user.id]),);

        const unsubscribe = onSnapshot(q, querySnapshot => {
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
        const uRef = doc(db, "users", route.route.params.user.__id);
        const newData = auth.currentUser.uid

        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages)
        );
        console.log("checking messages...: ", messages)
        const { _id, createdAt, text, user } = messages[0];
        console.log(text)
        try {
            addDoc(collection(db, 'messages'), {
                _id,
                createdAt,
                mesage: text,
                senderId: senderId,
                receiverId,
            }).then(() => {
                updateDoc(uRef, {
                    patients: arrayUnion(newData)
                  })
                    .then(() => {
                        console.log("Document updated successfully");
                    })
                    .catch((error) => {
                        console.error("Error updating document: ", error);
                    });
            })
        } catch (error) {
            Toast.show({
                text1: 'An error occured while updating',
                // text2: 'Additional text can go here',
                type: 'error', // Can be 'success', 'info', 'warning', or 'error'
                position: 'top', // Can be 'top', 'center', or 'bottom'
                duration: 3000, // Duration in milliseconds
            });
        }
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
                        <TouchableOpacity style={styles.tico} onPress={() => navigation.navigate("callScreen")}>
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
