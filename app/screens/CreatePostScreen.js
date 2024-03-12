import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator
} from "react-native";
import { Button } from "react-native-paper";
import { gql, useMutation } from "@apollo/client";
import { lightTheme } from "../constants/theme";
import AppButton from "../components/Button";
import { useTheme } from "../constants/theme";
import * as ImagePicker from "expo-image-picker";

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($title: String!, $content: String!, $image: String!) {
    createPost(title: $title, content: $content, image: $image) {
      id
    }
  }
`;

const CreatePost = () => {
  const { theme } = useTheme();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const [createPost, { data, loading, error }] =
    useMutation(CREATE_POST_MUTATION);

  const handleSubmit = () => {
    console.log("okay ");
    if (!title.trim() || !content.trim() || !image) {
      Alert.alert("Please fill in all fields");
      return;
    }
    createPost({ variables: { title, content, image } });

    // clear all fields
    setTitle("");
    setContent("");
    setImage("");

  };

  if (loading) {
    return (
        <View style={styles.containerFlex}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Adding...</Text>
        </View>
    )
  }

  if (error) {
    return (
        <View style={styles.containerFlex}>
            <Text>There was a problem adding post</Text>
        </View>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              color: lightTheme.colors.Primary,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Create Post
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              color: lightTheme.colors.Primary,
              marginBottom: 16,
            }}
          >
            Fill the form below with the post information
          </Text>
        </View>
        <Text
          style={[
            styles.title,
            { color: theme.colors.Primary, marginBottom: 6 },
          ]}
        >
          Post Title
        </Text>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <Text
          style={[
            styles.title,
            { color: theme.colors.Primary, marginBottom: 6 },
          ]}
        >
          Post Content
        </Text>
        <TextInput
          placeholder="Content"
          multiline={true}
          numberOfLines={4}
          value={content}
          onChangeText={setContent}
          style={{
            ...styles.input,
            height: 200,
            textAlignVertical: "top",
          }}
        />
        <Button
          mode="text"
          onPress={pickImage}
          style={{
            color: lightTheme.colors.Primary,
          }}
        >
          Select Image
        </Button>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 200, marginBottom: 10 }}
          />
        )}
        <Button
          mode="contained"
          onPress={() => {
            handleSubmit();
          }}
          style={{ backgroundColor: lightTheme.colors.Primary }}
        >
          Create
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFF",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 10,
    // borderColor: lightTheme.colors.Primary,
  },
  containerFlex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreatePost;
