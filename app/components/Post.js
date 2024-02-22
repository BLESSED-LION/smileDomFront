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
import { useDoctor } from "../hooks/doctor";

const Post = ({ post, onPress}) => {
  const { theme } = useTheme();
  const user = useSelector((state) => state.user.user);
  const { doctor, isDoctorFollower, followDoctor, unFollowDoctor } = useDoctor(1);
  const [isPosterFollow, setIsPosterFollower] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [userLiked, setUserLiked] = useState(post.hasLiked);
  const [commentsCount, setCommentsCount] = useState(2);
  const [showComment, setShowComment] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const [postDate, setPostDate] = useState("")

  useEffect(() => {
    let date = new Date(post.createdAt);
    setPostDate(date.toDateString());
    
    const fetchComments = async () => {
      const comments = await getComments();
      setPostComments(comments);
    };
  }, []);

  async function onPressFollow() {
    if (isDoctorFollower(user.uuid)) {
      unFollowDoctor(user.uuid);
    } else {
      followDoctor(user.uuid);
    }
  }

  function onLikePress() {
    if (userLiked) {
      unLikePost(user.uuid);
      setLikesCount(likesCount - 1);
      setUserLiked(false);
    } else {
      likePost(user.uuid);
      setLikesCount(likesCount + 1);
      setUserLiked(true);
    }
  }

  async function sharePost() {
    try {
      const result = await Share.share({
        message: `Hey, check out this post by ${post.author.name} on SmileDom`,
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
        await addComment(newComment, user.uuid, user._j.name);
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
            { post.author.image ?<Image
              source={{ uri: post.author.image }}
              style={{
                height: 45,
                width: 45,
                borderRadius: 50,
                marginRight: 12,
              }}
            />
            : <Image
              source={require("../../assets/SmileDom_1.png")}
              style={{
                height: 45,
                width: 45,
                borderRadius: 50,
                marginRight: 12,
              }}
            />}
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
                {post.author.name}
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
              {postDate}{" "}
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
          source={{ uri: post.image }}
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
