import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'

export default Notifications = () => {
  const data = [
    {
      id: 3,
      image: 'https://bootdey.com/img/Content/avatar/avatar7.png',
      name: 'SmileDom Admin',
      text: 'Welcome to smiledom, your all in one medical app',
      attachment: 'https://via.placeholder.com/100x100/FFB6C1/000000',
    },
  ]

  const [comments, setComments] = useState(data)

  return (
    <FlatList
      style={styles.root}
      data={comments}
      ItemSeparatorComponent={() => {
        return <View style={styles.separator} />
      }}
      keyExtractor={item => {
        return item.id
      }}
      renderItem={item => {
        const Notification = item.item
        let attachment = <View />

        let mainContentStyle
        if (Notification.attachment) {
          mainContentStyle = styles.mainContent
          attachment = <Image style={styles.attachment} source={{ uri: Notification.attachment }} />
        }
        return (
          <TouchableOpacity style={styles.container}>
            <Image source={{ uri: Notification.image }} style={styles.avatar} />
            <View style={styles.content}>
              <View style={mainContentStyle}>
                <View style={styles.text}>
                  <Text style={styles.name}>{Notification.name}</Text>
                  <Text>{Notification.text}</Text>
                </View>
                <Text style={styles.timeAgo}>A while ago</Text>
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