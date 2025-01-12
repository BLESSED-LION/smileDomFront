/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { InputToolbar, Actions, Composer, Send } from 'react-native-gifted-chat';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../constants/theme';
import * as DocumentPicker from 'expo-document-picker';

export const renderInputToolbar = (props) => (
    <InputToolbar
        {...props}
        containerStyle={{
            // backgroundColor: '#222B45',
            paddingTop: 6,
            borderBottomColor: "white"
        }}
        primaryStyle={{ alignItems: 'center' }}
    />
);

export const renderActions = (props) => {
    const [selectedFileUri, setSelectedFileUri] = useState(null);

    const pickFile = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
            if (!result.cancelled) {
                const fileUri = result.uri;
                setSelectedFileUri(fileUri);
            }
        } catch (error) {
            console.error('Error picking file:', error);
        }
    };

    const sendFileMessage = () => {
        if (selectedFileUri) {
            const message = {
                _id: Math.round(Math.random() * 1000000).toString(),
                text: selectedFileUri, // Use file URI as the message content
                createdAt: new Date(),
                user: {
                    _id: props.user._id,
                },
                // You can add additional properties if needed
            };
            props.onSend([message]); // Send the message
            setSelectedFileUri(null); // Reset selected file URI
        }
    };

    return (
        <Actions
            {...props}
            containerStyle={{
                width: 44,
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 4,
                marginRight: 4,
                marginBottom: 0,
            }}
            icon={() => (
                <TouchableOpacity onPress={pickFile}>
                    <FontAwesome name="paperclip" size={24} color="black" />
                </TouchableOpacity>
            )}
            options={{
                'Choose From Library': () => {
                    console.log('Choose From Library');
                },
                Cancel: () => {
                    console.log('Cancel');
                },
            }}
            optionTintColor="#222B45"
        />
    );
}

export const renderComposer = (props) => (

    <Composer
        {...props}
        textInputStyle={{
            color: '#222B45',
            backgroundColor: '#EDF1F7',
            borderWidth: 1,
            borderRadius: 15,
            borderColor: '#E4E9F2',
            paddingTop: 8.5,
            paddingHorizontal: 12,
            marginLeft: 0,
        }}
    />
);

export const renderSend = (props) => (
    <Send
        {...props}
        disabled={!props.text}
        containerStyle={{
            width: 44,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 4,
        }}
    >
        {/* <TouchableOpacity> */}
        <FontAwesome name="send" size={24} color="black" />
        {/* </TouchableOpacity> */}
    </Send>
);