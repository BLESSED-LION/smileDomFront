import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { useTheme } from '../constants/theme';
import CountryPicker from 'react-native-country-picker-modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LoginInput = ({setCountry}) => {
    const { theme } = useTheme();
    const [ctry, setCtry] = useState('');

    const handleSelect = (c) => {

        setCtry(c);
        setCountry(c.callingCode[0]);
        console.log(c)
    }
  return (
    <View style={{width:"100%"}}>
        <Text style={[styles.title,{color: theme.colors.Text}]}>Country</Text>
        <View style={[styles.countrySelect,{borderColor: theme.colors.grey2}]}>
            <View style={{flexDirection: 'row', alignItems: 'center' }}>
                <CountryPicker
                    countryCode={ctry ? ctry.cca2 : ''}
                    withFlag={true}
                    withAlphaFilter={true}
                    withCallingCode={true}
                    onSelect={(value) => handleSelect(value)}
                    style={styles.countryPickerContainer}
                />
                <Text style={[styles.countryHolder,{color: theme.colors.Text}]}>{ctry ? ctry.name : ''}</Text>
            </View>
        </View>
    </View>
  )
}

export default LoginInput

const styles = StyleSheet.create({
    title:{
        fontSize: 12,
    },
    countrySelect:{
        flexDirection: 'row',
        borderBottomWidth: 1,
        width: 240,
    },
    countryHolder:{
        fontSize: 16,
        marginLeft: 9,
    },
    countryPickerContainer: {
       backgroundColor: '#ffffff',
       paddingHorizontal: 10,
       paddingVertical: 5,
       borderRadius: 5,
    },
})