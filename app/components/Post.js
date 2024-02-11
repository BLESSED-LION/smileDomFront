import { View, Text, Image, TouchableOpacity, Share } from 'react-native'
import { useTheme } from '../constants/theme';
import React, { useState } from 'react'
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import CompleteModal from './Modal/Modal';
import usePost from '../hooks/post';

const Post = ({PostId, DoctorName, postImage, DoctorPhoto, likes, comments, PostPublishDate, onPress, onPressFollow, commentPress }) => {
    const { theme } = useTheme();
    const user = useSelector((state) => state.user.user);
    const { post, loading, likePost, unLikePost, hasLikedPost } = usePost(PostId);
    const [likesCount, setLikesCount] = useState(likes);
    const [userLiked, setUserLiked] = useState(hasLikedPost(user._j.id));

    // console.log(post)

    function onLikePress() {
        if(userLiked){
            unLikePost(user._j.id)
            setLikesCount(likesCount - 1)
            setUserLiked(false)
        }else{
            likePost(user._j.id)
            setLikesCount(likesCount + 1)
            setUserLiked(true)
        }
    }

    async function sharePost(){
        try {
            const result = await Share.share({
                message: `Hey, check out this post by ${DoctorName} on SmileDom`
            })

        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <View
            style={{
                height: 431,
                width: '100%',
                marginVertical: 10,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: theme.colors.Background
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                        onPress={onPress}
                    >
                        <Image source={{ uri: DoctorPhoto }}
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
                            justifyContent: 'space-between',
                        }}
                    >
                        <TouchableOpacity
                            onPress={onPress}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: '500',
                                    color: theme.colors.Text,
                                }}
                            >{DoctorName}</Text>
                        </TouchableOpacity>
                        <Text
                            style={{
                                fontSize: 10,
                                fontWeight: '400',
                                color: theme.colors.Accent,
                            }}
                        > {PostPublishDate} </Text>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={onPressFollow}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: theme.colors.tabActive
                        }}
                    >+ Follow</Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Image
                    source={{ uri: postImage}}
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: theme.colors.Black
                    }}
                    resizeMode='cover'
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
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <TouchableOpacity
                        style={{
                            marginRight: 10,
                            flexDirection: 'row',
                            width: 100,
                            height: 40,
                            borderRadius: 20,
                            justifyContent: 'center',
                            backgroundColor: theme.colors.grey,
                            alignItems: 'center'
                        }}
                        onPress={onLikePress}
                    >
                        {
                            userLiked ? <MaterialCommunityIcons name="cards-heart" size={30} color={'red'} /> :
                            <MaterialCommunityIcons name="cards-heart-outline" size={30} color={theme.colors.Accent} />
                        }
                        <Text
                            style={{
                                marginLeft: 10,
                                fontSize: 14,
                                fontWeight: 'bold',
                                lineHeight: 17,
                                color: 'red'
                            }}
                        >{likesCount}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            marginRight: 10,
                            flexDirection: 'row',
                            width: 100,
                            height: 40,
                            borderRadius: 20,
                            justifyContent: 'center',
                            backgroundColor: theme.colors.grey,
                            alignItems: 'center'
                        }}
                        onPress={commentPress}
                    >
                        <FontAwesome5 name="comment-dots" size={24} color={theme.colors.accountText} />
                        <Text
                            style={{
                                marginLeft: 10,
                                fontSize: 14,
                                fontWeight: 'bold',
                                lineHeight: 17,
                                color: theme.colors.accountText
                            }}
                        >{comments}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={sharePost}
                        style={{
                            marginRight: 10,
                            flexDirection: 'row',
                            width: 100,
                            height: 40,
                            borderRadius: 20,
                            justifyContent: 'center',
                            backgroundColor: theme.colors.grey,
                            alignItems: 'center',
                        }}
                    >
                        <FontAwesome5 name="paper-plane" size={24} color={theme.colors.Accent} />
                        <Text
                            style={{
                                marginLeft: 10,
                                fontSize: 14,
                                fontWeight: '400',
                                lineHeight: 17,
                                color: theme.colors.Accent
                            }}
                        >Share</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </View>
    )
}

export default Post