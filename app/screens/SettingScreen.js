import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../constants/theme';

const SettingScreen = () => {
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
      >SETTINGS</Text>
    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({})