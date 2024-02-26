import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // You can use any icon library here
import { lightTheme } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

const FloatingButton = () => {
  const navigation = useNavigation();
  function onPress() {
    navigation.navigate('createPost');
    console.log('Floating button pressed');
  }
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={()=>{onPress()}}>
        <Ionicons name="add" size={36} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: lightTheme.colors.Primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
});

export default FloatingButton;
