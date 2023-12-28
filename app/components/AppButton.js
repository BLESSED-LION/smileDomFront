import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from '../constants/theme';

function AppButton({ title, onPress, bgColor, color }) { // Changed 'color' prop to be separate
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor }]} // Removed curly braces around bgColor
      onPress={onPress}
    >
      <Text style={[styles.text, { color: color }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
