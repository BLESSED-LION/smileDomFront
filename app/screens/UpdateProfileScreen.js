import React, { useState, useEffect } from 'react';
import { View, Platform, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import {
  Avatar,
  TextInput,
  Card,
  Title,
  Paragraph,
  Button
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { auth, db, storage } from '../config/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import Toast from 'react-native-toast-message';


const UpdateProfileScreen = ({route}) => {
  const [user, setUser] = useState(route.params.user);
  const u = user ? user : null;
  const type = u ? u.type : "patient";
  const [profileImage, setProfileImage] = useState(u != null && u.image ? u.image : null);
  const [name, setName] = useState(u != null && u.name ? u.name : "");
  const [email, setEmail] = useState(u != null && u.email ? u.email : "");
  const [bio, setBio] = useState(u != null && u.bio ? u.bio : "");
  const [specialization, setSpecialization] = useState(u != null && u.specialization ? u.specialization : "");
  const [experience, setExperience] = useState(u != null && u.experience ? u.experience : "");
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(false);

  const updateUserProfile = () => {
    setLoading(true);
  
    const user = auth.currentUser;

    console.log(user.uid)
  
    let profileImageUrl;
  
    if (profileImage) {
      const imageRef = ref(storage, `profileImages/${user.uid}.jpg`);
      const uploadTask = uploadBytes(imageRef, profileImage);
  
      uploadTask
        .then(() => getDownloadURL(imageRef))
        .then(url => {
          profileImageUrl = url;
          return updateProfile(user, {
            photoURL: profileImageUrl,
            displayName: name,
          });
        })
        .then(() => updateUserDatabase(user.uid, {
          email,
          bio,
          specialization,
          experience,
          image: profileImageUrl,
        }))
        .then(() => {
          console.log('Profile updated successfully!');
          Toast.show({
            text1: 'Profile updated',
            type: 'success',
            position: 'top',
            duration: 50000,
          });
        })
        .catch(error => {
          console.error('Error updating profile:', error);
        })
        .finally(() => setLoading(false));
    } else {
      updateProfile(user, { displayName: name })
        .then(() => updateUserDatabase(user.uid, {
          email,
          bio,
          specialization,
          experience,
        }))
        .then(() => {
          console.log('Profile updated successfully!');
          Toast.show({
            text1: 'Profile updated',
            type: 'success',
            position: 'top',
            duration: 50000,
          });
        })
        .catch(error => {
          console.error('Error updating profile:', error);
        })
        .finally(() => setLoading(false));
    }
  };
  
  
  const updateUserDatabase = async (userId, data) => {
    try {
      const q = query(collection(db, 'users'), where("id", "==", userId));
      let ud;
      getDocs(q)
        .then((snapshot) => {
          if (snapshot.docs.length > 0) {
            const userDoc = snapshot.docs[0];
            ud = {...userDoc.data(), _id: userDoc.id};
            setPerson(ud)
            console.log("User data:", ud);
          } else {
            console.log("User not found");
          }
        })
      
      console.log(person)
      const userDocRef = doc(collection(db, 'users'), person._id);
      await updateDoc(userDocRef, data);
      console.log('User data updated in Firestore:', data);
    } catch (error) {
      console.error('Error updating Firestore:', error);
    }
  };

  useEffect(() => {
    
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (result && !result.cancelled && result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (e) {
      // console.error(E);
    }
  };
  
  

  return (
    <Card style={{flex:1}}>
      <Card.Content>
        <Title>Update Profile</Title>
        <ScrollView>
        <TouchableOpacity onPress={pickImage} style={{ alignItems: 'center' }}>
          <Avatar.Image
            source={profileImage ? {uri: profileImage.uri} : require("../../assets/onboard1.png")}
            size={150}
            style={{ marginBottom: 20 }}
          />
        </TouchableOpacity >
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          theme={{ colors: { primary: 'blue' } }} // Optional: Set theme color
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={{marginTop: 10}}
        />
        <TextInput
          label="Bio"
          value={bio}
          onChangeText={setBio}
          style={{marginTop: 10}}
        />
        {u.type === "doctor" &&
        <TextInput
          label="Specialization"
          value={specialization}
          onChangeText={setSpecialization}
          style={{marginTop: 10}}
        />}
        {type === "doctor" &&
        <TextInput
          label="Years of experience"
          value={experience}
          onChangeText={setExperience}
          style={{marginTop: 10}}
        />}
        </ScrollView>
      </Card.Content>
      <Card.Actions style={{width: "100%", padding: 18}}>
        <Button 
            onPress={updateUserProfile} 
            mode="contained" 
            color={"#BFD101"}
            style={{width: "100%"}}
        >
            {loading ? "Updating" : "Save"}
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default UpdateProfileScreen;
