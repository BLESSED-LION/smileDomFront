import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../constants/theme';

const PrinscribesScreen = () => {
  const { theme } = useTheme();
  return (
    <View style={[{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.Background,
    }]}>
      <Text
      style={{
        fontSize: 30,
      }}
      >PRESCRIPTIONS</Text>
    </View>
  )
}

export default PrinscribesScreen

const styles = StyleSheet.create({})