import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useTheme } from '../constants/theme';
import React from 'react'
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import CompleteModal from './Modal/Modal';

const Post = ({ DoctorName, postImage, DoctorPhoto, likes, comments, PostPublishDate, onPress, onPressFollow }) => {
    const { theme } = useTheme();
    
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
                        <Image source={DoctorPhoto}
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
                    source={postImage}
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
                    >
                        <MaterialCommunityIcons name="cards-heart-outline" size={30} color={theme.colors.Accent} />
                        <Text
                            style={{
                                marginLeft: 10,
                                fontSize: 14,
                                fontWeight: 'bold',
                                lineHeight: 17,
                                color: 'red'
                            }}
                        >{likes}</Text>
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