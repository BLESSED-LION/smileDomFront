import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';

const Button = ({ title, onPress, textColor, buttonColor }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonColor }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '100%',
    height: 53,
    marginVertical: 10,
    zIndex: 8000,

    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    fontSize: 20,
  },
});