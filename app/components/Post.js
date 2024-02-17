import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Share,
  TextInput,
  Button,
} from "react-native";
import { useTheme } from "../constants/theme";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import CompleteModal from "./Modal/Modal";
import usePost from "../hooks/post";
import { useDoctor } from "../hooks/doctor";

const Post = ({
  PostId,
  posterId,
  DoctorName,
  postImage,
  DoctorPhoto,
  likes,
  comments,
  PostPublishDate,
  onPress,
}) => {
  const { theme } = useTheme();
  const user = useSelector((state) => state.user.user);
  const {
    post,
    loading,
    likePost,
    unLikePost,
    hasLikedPost,
    getComments,
    addComment,
  } = usePost(PostId);
  const { doctor, isDoctorFollower, followDoctor, unFollowDoctor } = useDoctor(posterId);
  const [isPosterFollow, setIsPosterFollower] = useState(false)
  const [likesCount, setLikesCount] = useState(likes);
  const [userLiked, setUserLiked] = useState(hasLikedPost(user._j.id));
  const [commentsCount, setCommentsCount] = useState(comments);
  const [showComment, setShowComment] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  useEffect(() => {
    console.log(isDoctorFollower(user._j.id)._j);
    const fetchComments = async () => {
      const comments = await getComments();
      setPostComments(comments);
    };
    fetchComments(user._j.id);
    setIsPosterFollower(isDoctorFollower()._j)
  }, []);

  async function onPressFollow() {
    if (isDoctorFollower(user._j.id)) {
      unFollowDoctor(user._j.id);
    } else {
      followDoctor(user._j.id);
    }
  }

  function onLikePress() {
    if (userLiked) {
      unLikePost(user._j.id);
      setLikesCount(likesCount - 1);
      setUserLiked(false);
    } else {
      likePost(user._j.id);
      setLikesCount(likesCount + 1);
      setUserLiked(true);
    }
  }

  async function sharePost() {
    try {
      const result = await Share.share({
        message: `Hey, check out this post by ${DoctorName} on SmileDom`,
      });
    } catch (error) {
      alert(error.message);
    }
  }

  async function commentPress() {
    setShowComment(!showComment);
  }

  async function addNewComment() {
    try {
      if (newComment.length > 0) {
        setAddingComment(true);
        await addComment(newComment, user._j.id, user._j.name);
        const comments = await getComments();
        setPostComments(comments);
        setCommentsCount(comments.length);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error adding comment: ", error);
    } finally {
      setAddingComment(false);
    }
  }

  return (
    <View
      style={{
        height: 431,
        width: "100%",
        marginVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 10,
          paddingHorizontal: 15,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: theme.colors.Background,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={onPress}>
            <Image
              source={{ uri: DoctorPhoto }}
              style={{
                height: 45,
                width: 45,
                borderRadius: 50,
                marginRight: 12,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={onPress}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: theme.colors.Text,
                }}
              >
                {DoctorName}
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 10,
                fontWeight: "400",
                color: theme.colors.Accent,
              }}
            >
              {" "}
              {PostPublishDate}{" "}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={onPressFollow}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: theme.colors.tabActive,
            }}
          >
            + Follow
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={{ uri: postImage }}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: theme.colors.Black,
          }}
          resizeMode="cover"
        />
      </View>
      <View
        style={{
          marginHorizontal: 15,
          marginTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              marginRight: 10,
              flexDirection: "row",
              width: 100,
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              backgroundColor: theme.colors.grey,
              alignItems: "center",
            }}
            onPress={onLikePress}
          >
            {userLiked ? (
              <MaterialCommunityIcons
                name="cards-heart"
                size={30}
                color={"red"}
              />
            ) : (
              <MaterialCommunityIcons
                name="cards-heart-outline"
                size={30}
                color={theme.colors.Accent}
              />
            )}
            <Text
              style={{
                marginLeft: 10,
                fontSize: 14,
                fontWeight: "bold",
                lineHeight: 17,
                color: "red",
              }}
            >
              {likesCount}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginRight: 10,
              flexDirection: "row",
              width: 100,
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              backgroundColor: theme.colors.grey,
              alignItems: "center",
            }}
            onPress={commentPress}
          >
            <FontAwesome5
              name="comment-dots"
              size={24}
              color={theme.colors.accountText}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 14,
                fontWeight: "bold",
                lineHeight: 17,
                color: theme.colors.accountText,
              }}
            >
              {commentsCount}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginRight: 10,
              flexDirection: "row",
              width: 100,
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              backgroundColor: theme.colors.grey,
              alignItems: "center",
            }}
            onPress={commentPress}
          >
            <FontAwesome5
              name="comment-dots"
              size={24}
              color={theme.colors.accountText}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 14,
                fontWeight: "bold",
                lineHeight: 17,
                color: theme.colors.accountText,
              }}
            >
              {commentsCount}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={sharePost}
            style={{
              marginRight: 10,
              flexDirection: "row",
              width: 100,
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              backgroundColor: theme.colors.grey,
              alignItems: "center",
            }}
          >
            <FontAwesome5
              name="paper-plane"
              size={24}
              color={theme.colors.Accent}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 14,
                fontWeight: "400",
                lineHeight: 17,
                color: theme.colors.Accent,
              }}
            >
              Share
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {showComment && (
        <View
          style={{
            marginHorizontal: 15,
            marginTop: 10,
          }}
        >
          <Text>Comments:</Text>
          {postComments.map((comment, i) => (
            <View key={i} style={{ margin: 10 }}>
              <Text style={{ fontWeight: "bold" }}>{comment.name}</Text>
              <Text>{comment.body}</Text>
            </View>
          ))}

          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
            }}
            onChangeText={(text) => setNewComment(text)}
            value={newComment}
            placeholder="Write a comment..."
          />
          <View
            style={{
              marginTop: 10,
              alignSelf: "flex-end",
            }}
          >
            {!addingComment ? (
              <TouchableOpacity
                style={{
                  backgroundColor: "#007bff",
                  borderRadius: 25,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                }}
                onPress={addNewComment}
              >
                <Text
                  style={{
                    fontSize: 10,
                    color: "#ffffff",
                    textAlign: "center",
                  }}
                >
                  Add Comment
                </Text>
              </TouchableOpacity>
            ) : (
              <Text
                style={{
                  backgroundColor: "#007bff",
                  borderRadius: 25,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  color: "#ffffff",
                }}
              >
                adding ..
              </Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default Post;
