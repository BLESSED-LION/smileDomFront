// SID SK28488c5e61e4397b1a8e5791b007584e
// Secret nlxxS77UrEDOLW49BsrDpiy989AfV90F
import { TwilioVideo } from 'react-native-twilio-video-webrtc';
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

export default function () {
    TwilioVideo.initialize(accessToken);

    const connectRoom = () => {
        // Connect to a video room
        TwilioVideo.connect({ roomName: 'myRoom', accessToken: accessToken }).then(() => {
            // Local video track
            TwilioVideo.createLocalVideoTrack().then(track => {
                // Publish local video track to the room
                TwilioVideo.publishLocalVideoTrack(track);
            });
        });

    }

    return (
        <View>
            <Button onPress={connectRoom}>Connect to room</Button>
        </View>
    )
}