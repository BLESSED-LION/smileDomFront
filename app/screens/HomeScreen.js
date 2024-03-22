import { FlatList, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '../constants/theme';
import { DoctorsNearYou, Post } from '../components';
import { useSelector } from 'react-redux';
import { Portal } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar';
import FloatingButton from '../components/FloatingAction';
import usePosts from '../hooks/posts';

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const user = useSelector((state) => state.user);

  const { user: u } = user;
  const isDoctor = u ? u.isDoctor : false;

  const allPosts = usePosts()

  // Sorting the posts by publishDate
  const sortedPosts = [...allPosts].reverse();

  return (
    <PaperProvider>
        <Portal style={{ flex: 1}}>
          <View style={{ position: 'absolute', bottom: 20, zIndex: 1000, right: 20}}>
            {isDoctor && <FloatingButton/>}
          </View>
          <FlatList
            ListHeaderComponent={<DoctorsNearYou />}
            data={sortedPosts}
            keyExtractor={(item) => item.puid}
            renderItem={({ item }) => (
              <Post
                post = {item}
                onPress={() => navigation.navigate('doctor', { doctorInfo: item })}
              />
            )}
            style={{
              flex: 1,
              backgroundColor: theme.colors.Background,
              paddingBottom: 500,
            }}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </Portal>
        <StatusBar backgroundColor={'#BFD101'} />
    </PaperProvider>
  )
}

export default HomeScreen