import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Share,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { useTheme } from "../constants/theme";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useDoctor } from "../hooks/doctor";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_COMMENTS = gql`
  query GetComments($postId: String!) {
    getComments(postId: $postId) {
      content,
      createdAt
      user {
        id,
        email
      }
    }
  }
`

const CREATE_COMMENT = gql`
  mutation CreateComment($puid: ID!, $content: String!) {
    createComment(puid: $puid, content: $content) {
      id
    }
  }
`

const CREATE_LIKE = gql`
  mutation CreateLike($puid: String!) {
    createLike(puid: $puid) {
      id
    }
  }
`


const Post = ({ post, onPress}) => {
  const { theme } = useTheme();
  const user = useSelector((state) => state.user.user);
  const { doctor, isDoctorFollower, followDoctor, unFollowDoctor } = useDoctor(1);
  const [isPosterFollow, setIsPosterFollower] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [userLiked, setUserLiked] = useState(post.hasLiked);
  const [addingComment, setAddingComment] = useState(false);
  const [postDate, setPostDate] = useState("")

  const [commentsCount, setCommentsCount] = useState(0);
  const [showComment, setShowComment] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const { loading: commentsLoading, error: commentsError, data: commentsData } = useQuery(GET_COMMENTS, {variables: {postId: post.puid}});
  const [createComment, { error: mutationError }] = useMutation(CREATE_COMMENT);
  const [createLike, {error: mutationLikeError}] = useMutation(CREATE_LIKE)

  useEffect(() => {
    let date = new Date(post.createdAt);
    setPostDate(date.toDateString());

    if(!commentsLoading && !commentsError){
      setPostComments(commentsData.getComments)
      setCommentsCount(commentsData.getComments.length)
    }
  }, [commentsData]);

  async function onPressFollow() {
    if (post.hasFollowedAuthor) {
      unFollowDoctor(user.uuid);
    } else {
      followDoctor(user.uuid);
    }
  }

  async function onLikePress()  {
    if (userLiked) {
      //TODO: add unlike post
      // await createLike({ variables: { puid: post.puid } });
      setLikesCount(likesCount - 1);
      setUserLiked(false);
    } else {
      setLikesCount(likesCount + 1);
      setUserLiked(true);
      await createLike({ variables: { puid: post.puid } });
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
        await createComment({ variables: { puid: post.puid, content: newComment } });
        setNewComment("");
        setCommentsCount(commentsCount + 1);
        setPostComments([...postComments, { content: newComment, user: { email: user.email } }]);
      }
    } catch (error) {
      //
    } finally {
      setAddingComment(false);
    }
  }

  return (
    <View
      style={{
        minHeight: 431,
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
        { user && !user.hasFollowedAuthor ?
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
          : 
          <TouchableOpacity onPress={onPressFollow}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: theme.colors.tabActive,
              }}
            >
             Unfollow
            </Text>
          </TouchableOpacity>
        }
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
            height: 390,
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
              <Text style={{ fontWeight: "bold" }}>{comment.user.email}</Text>
              <Text>{comment.content}</Text>
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
