import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import { lightTheme } from './theme';

export const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 20,
        alignContent: 'center',
        // paddingTop: 60
        justifyContent: 'center'
    },
    title: {
        textAlign: 'left',
        fontSize: 20,
        marginStart: 20,
        fontWeight: 'bold'
    },
    subTitle: {
        textAlign: 'center',
        fontSize: 14,
        marginStart: 20,
        marginTop: 10
    },
    codeFieldRoot: {
        marginTop: 40,
        width: '90%',
        marginLeft: 20,
        marginRight: 20,
    },
    cellRoot: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    cellText: {
        color: '#000',
        fontSize: 28,
        textAlign: 'center',
    },
    focusCell: {
        borderBottomColor: '#007AFF',
        borderBottomWidth: 2,
    },

    button: {
        marginTop: 20,
        backgroundColor: lightTheme.colors.Primary,
    },
    resendCode: {
        color: lightTheme.colors.Primary,
        marginStart: 20,
        marginTop: 40,
    },
    resendCodeText: {
        marginStart: 20,
        marginTop: 40,
    },
    resendCodeContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 35,
    },
    intro: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 800
    },
})