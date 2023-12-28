import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../constants/theme';

const DummyText = ({text}) => {
  return (
    <Text style={{
      alignSelf: "center",
      fontSize: 24,
      fontWeight: "800"
    }}>
      {text}
    </Text>
  );
};

const SessonsScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Chats');
  const {theme} = useTheme()

  const tabs = ['Chats', 'Complains', 'Medical History', 'Examinations', 'Diagnosis'];

  const SearchBar=()=>{
    return(
      <View
      style={{
        width: 252,
        backgroundColor: '#D9D9D9',
        borderRadius: 27,
        paddingVertical: 11,
        paddingLeft: 19.5,
      }}
      >
      <TextInput
        placeholder='Search'
        style={{
          fontSize: 14,
          zIndex: 1000,
          marginLeft: 10,
        }}
        placeholderTextColor="#888"
      />
      </View>
    )
  }

  return (
    <View>
      <View
      style={{
        flexDirection:'row',
        paddingTop:45,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingBottom: 16,
        alignItems: 'center',
        marginBottom: 12,
      }}
      >
        <Image
        source={require('../../assets/happy_icon.png')}
        resizeMode='contain'
        style={{
          height: 34,
          width: 36.52,
        }} />

        <SearchBar />

        <View
        style={{
          justifyContent: 'center',
          alignItems:'center'
        }}
        >
          <MaterialCommunityIcons name="note-text" size={25} color={theme.colors.accountText} />
          <Text
          style={{
            fontSize:8.26,
          }}
          >Reports</Text>
        </View>
      </View>
      <ScrollView horizontal>
        {tabs.map((tab, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => setSelectedTab(tab)}
            style = {{
              borderTopColor: theme.colors.Background,
              borderLeftColor: theme.colors.Background,
              borderRightColor: theme.colors.Background,
              borderBottomColor: tab === selectedTab ? "#2FA8E5" : theme.colors.Background,
              borderWidth: 3,
            }}
          >
            <Text style={{ padding: 10, fontWeight: "500" }}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={{ padding: 20 }}>
        {selectedTab === 'Chats' && <DummyText text={"Chats"} />}
        {selectedTab === 'Complains' && <DummyText text={"Complains"} />}
        {selectedTab === 'Medical History' && <DummyText text={"Medical history"} />}
        {selectedTab === 'Examinations' && <DummyText text={"Examinations"} />}
        {selectedTab === 'Diagnosis' && <DummyText text={"Diagnosis"} />}
      </View>
    </View>
  );
};

export default SessonsScreen;
