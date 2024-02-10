import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { useTheme } from '../constants/theme';
import CountryPicker from 'react-native-country-picker-modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LoginInput = ({setCountry}) => {
    const { theme } = useTheme();
    const [ctry, setCtry] = useState('');

    const includedCountries = ["US", "CM", "GB", "IN"];
    const exclude = ["AF", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BA", "BW", "BV", "BR", "IO", "VG", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "BQ", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CK", "CR", "HR", "CU", "CW", "CY", "CZ", "CD", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "SZ", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "HN", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "CI", "JM", "JP", "JE", "JO", "KZ", "KE", "XK", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "KP", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "CG", "RO", "RU", "RW", "RE", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "SA", "SN", "RS", "SC", "SL", "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "KR", "SS", "ES", "LK", "SD", "SR", "SJ", "SE", "CH", "SY", "ST", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA", "AE", "GB", "US", "UM", "VI", "UY", "UZ", "VU", "VA", "VE", "VN", "WF", "EH", "YE", "ZM", "ZW", "KI", "HK", "AX"]
    const uniqueElements = [...includedCountries.filter(x => !exclude.includes(x)), ...exclude.filter(x => !includedCountries.includes(x))];

    const handleSelect = (c) => {

        setCtry(c);
        setCountry(c.callingCode[0]);
        console.log(c)
    }
  return (
    <View style={{width:"100%"}}>
        <Text style={[styles.title,{color: theme.colors.Text}]}>Country</Text>
        <View style={[styles.countrySelect,{borderColor: theme.colors.grey2}]}>
            <View style={{flexDirection: 'row', alignItems: 'center', width:"100%" }}>
                <CountryPicker
                    excludeCountries={uniqueElements}
                    countryCode={ctry ? ctry.cca2 : ''}
                    withFlag={true}
                    withAlphaFilter={true}
                    withCallingCode={true}
                    onSelect={(value) => handleSelect(value)}
                    style={styles.countryPickerContainer}
                />
                <Text 
                    style={[styles.countryHolder,{color: theme.colors.Text, width: "100%"}]}
                >{ctry ? ctry.name : ''}</Text>
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
        width: "100%",
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