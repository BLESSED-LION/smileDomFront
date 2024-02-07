import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // You can use any icon library here

const FloatingButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Ionicons name="ios-add" size={36} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 16,
    marginRight: 16,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
});

export default FloatingButton;
