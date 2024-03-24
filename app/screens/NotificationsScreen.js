import { useQuery, useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { GET_NOTIFICATIONS, MARK_NOTIFICATION_AS_READ } from '../constants/mutations'; // Assuming you have the mutation for marking notifications as read
import { useSelector } from 'react-redux';
import { formatTime, truncateString } from '../constants/helpers';

export default Notifications = () => {
  const u = useSelector((state) => state.user);
  const [nots, setNots] = useState([]);
  const { user } = u;
  const { loading, error, data } = useQuery(GET_NOTIFICATIONS, {
    variables: { userId: user && user._id },
    pollInterval: 5000
  });
  const [markNotificationAsRead] = useMutation(MARK_NOTIFICATION_AS_READ);

  useEffect(() => {
    if (data && data.notifications) {
      const sortedNots = [...data.notifications].reverse();
      setNots(sortedNots)
    }
  }, [data]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error! {error.message}</Text>;

  const handleNotificationPress = (notificationId) => {
    markNotificationAsRead({ variables: { notificationId } });
  };

  const renderItem = ({ item }) => {
    const { id, message, createdAt, read, attachment } = item;
    let mainContentStyle = styles.mainContent;
    let backgroundColor = read ? '#FFFFFF' : '#F0F8FF'; // Different background color for read and unread notifications

    return (
      <TouchableOpacity style={[styles.container, { backgroundColor }]} onPress={() => handleNotificationPress(id)}>
        <View style={styles.content}>
          <View style={mainContentStyle}>
            <View style={styles.text}>
              <Text style={styles.name}>{truncateString(message)}</Text>
              <Text>{message}</Text>
            </View>
            <Text style={styles.timeAgo}>{formatTime(parseFloat(createdAt))}</Text>
          </View>
          {attachment && <Image style={styles.attachment} source={{ uri: attachment }} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={styles.root}
      data={nots}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'flex-start',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainContent: {
    marginRight: 60,
  },
  attachment: {
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
});
