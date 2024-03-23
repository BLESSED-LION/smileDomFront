import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import { GET_NOTIFICATIONS } from '../constants/mutations';
import { useSelector } from 'react-redux';
import { formatTime } from '../constants/helpers';
import { markNotificationAsRead } from '../constants/markNotificationsAsRead';

export default Notifications = () => {
  const u = useSelector((state) => state.user);
  const [nots, setNots] = useState([]);
  const { user } = u;
  const { loading, error, data } = useQuery(GET_NOTIFICATIONS, {
    variables: { userId: user._id },
    pollInterval: 5000
  });

  useEffect(() => {
    if (data && data.notifications) {
      const sortedNots = [...data.notifications].reverse();
      setNots(sortedNots)
    }
  }, [data]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error! {error.message}</Text>;

  return (
    <FlatList
      style={styles.root}
      data={nots}
      ItemSeparatorComponent={() => {
        return <View style={styles.separator} />
      }}
      keyExtractor={item => {
        return item.id
      }}
      renderItem={item => {
        const Notification = item.item
        let attachment = <View />
        const handleNotificationPress = () => {
          // Assuming you have a function to mark notifications as read
          markNotificationAsRead(Notification.id);
        };

        let mainContentStyle
        if (Notification.attachment) {
          mainContentStyle = styles.mainContent
          attachment = <Image style={styles.attachment} source={{ uri: Notification.attachment }} />
        }
        return (
          <TouchableOpacity style={styles.container} onPress={handleNotificationPress}>
            {/* <Image source={{ uri: Notification.image }} style={styles.avatar} /> */}
            <View style={styles.content}>
              <View style={mainContentStyle}>
                <View style={styles.text}>
                  <Text style={styles.name}>{Notification.message}</Text>
                  <Text>{Notification.message}</Text>
                </View>
                <Text style={styles.timeAgo}>{formatTime(parseFloat(Notification.createdAt))}</Text>
              </View>
              {attachment}
            </View>
          </TouchableOpacity>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
  },
  mainContent: {
    marginRight: 60,
  },
  img: {
    height: 50,
    width: 50,
    margin: 0,
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  timeAgo: {
    fontSize: 12,
    color: '#696969',
  },
  name: {
    fontSize: 16,
    color: '#1E90FF',
  },
})
