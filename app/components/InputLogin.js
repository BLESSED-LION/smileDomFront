import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react';
import { useTheme } from '../constants/theme';

const InputLogin = ({onPhoneNumberSubmit, ititle, handleInput}) => {
  const { theme } = useTheme();
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const handleTextChange = (value) => {
    setPhoneNumber(value);
    if(handleInput){
      handleInput(value)
    }
  };

  return (
    <View style={{marginTop: 30}}>
        <Text style={[styles.title,{color: theme.colors.Text}]}>{ititle ? ititle : "Phone"}</Text>
        <View style={[styles.countrySelect,{borderColor: theme.colors.grey2}]}>
            <View style={{flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                placeholder={ititle ? `Enter ${ititle}` : "Enter phone number"}
                onChangeText={handleTextChange}
                value={phoneNumber}
               />
            </View>
        </View>
    </View>
  )
}

export default InputLogin

const styles = StyleSheet.create({
  countrySelect:{
      flexDirection: 'row',
      borderBottomWidth: 1,
      width: 240,
  },
})