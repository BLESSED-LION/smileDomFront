import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, TextInput, Image } from 'react-native';
import { useMutation, gql } from '@apollo/client';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { membership } from '../store/userSlice';
import { CREATE_NOTIFICATION } from '../constants/mutations';

// Define your Mesomb GraphQL mutation
const INITIATE_PAYMENT = gql`
  mutation InitializePayment($amount: String!, $payer: String) {
    initializePayment(amount: $amount, payer: $payer) {
      success
      paymentUrl
      message
    }
  }
`;

// Utility function to convert price string to number
const convertPriceToNumber = (priceString) => {
    const cleanedPriceString = priceString.replace(/,/g, '').replace('frs', '');
    const priceNumber = parseFloat(cleanedPriceString);
    return isNaN(priceNumber) ? null : priceNumber.toString();
};

// Function to check if phone number belongs to MTN or Orange network
const getNetworkLogo = (phoneNumber, setLoading) => {
    const mtnPrefixes = ['677', '674', '678', '679', '690', '691', '694', '695', '696', '697', '698', '699', '683', '682'];
    const orangePrefixes = ['655', '656', '657', '658', '659', '660', '661', '662', '663', '664', '665', '666', '667', '668', '669'];
    const prefix = phoneNumber.substring(0, 3);
    setLoading(true);
    setTimeout(() => {
        setLoading(false); // Simulate loading delay
    }, 1000); // Simulate network request delay
    if (mtnPrefixes.includes(prefix)) {
        return require('../../assets/mtn-logo.jpg'); // Replace with your actual MTN logo image path
    } else if (orangePrefixes.includes(prefix)) {
        return require('../../assets/orange-logo.png'); // Replace with your actual Orange logo image path
    } else {
        return require('../../assets/favicon.png');
    }
};

const PaymentsScreen = ({ route, navigation }) => {
    const { plan } = route.params;
    const { name, price, features } = plan;
    const amount = convertPriceToNumber(price);
    const [initiatePayment] = useMutation(INITIATE_PAYMENT);
    const [paymentUrl, setPaymentUrl] = useState(null);
    const [processingPayment, setProcessingPayment] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [networkLogo, setNetworkLogo] = useState(require('../../assets/favicon.png')); // Store network logo
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const user = useSelector((state) => state.user);
    const id = user.user && user.user._id;
    const dispatch = useDispatch();

    const [createNotification] = useMutation(CREATE_NOTIFICATION);

    useEffect(() => {
        if (phoneNumber) {
            setNetworkLogo(getNetworkLogo(phoneNumber, setLoading)); // Update network logo on phone number change
        }
        if(paymentConfirmed){
            createNotification({ variables: { input: { userId: id, message: `Congrats, you have subscribed to ${name}` } } }).
            then((data) => console.log("Notification success ", data)).catch(error => console.log(error))
            dispatch(membership({bundle: name}))
            navigation.navigate("HomeMainScreen");
        }
    }, [phoneNumber, paymentConfirmed]);

    const handlePaymentInitiation = async () => {
        try {
            // Check if the phone number is valid
            if (!validatePhoneNumber(phoneNumber)) {
                Toast.show({
                    text1: 'Please enter a valid phone number',
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                });
                return;
            }
    
            setProcessingPayment(true);
            const { data } = await initiatePayment({
                variables: { amount },
            });
    
            if (data.initializePayment.success) {
                const paymentUrl = data.initializePayment.paymentUrl;
                setPaymentUrl(paymentUrl);
                setPaymentConfirmed(true);
                Toast.show({
                    text1: 'Redirecting to payment portal...',
                    type: 'info',
                    position: 'top',
                    duration: 10000,
                });
            } else {
                const errorMessage = data.initializePayment.message || 'Error initializing payment';
                Toast.show({
                    text1: errorMessage,
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                });
                console.error(data.initializePayment.message)
            }
        } catch (error) {
            console.error('Error initiating payment:', error.message);
            Toast.show({
                text1: 'Error initiating payment',
                type: 'error',
                position: 'top',
                duration: 10000,
            });
        } finally {
            setProcessingPayment(false);
        }
    };
    
    const validatePhoneNumber = (phoneNumber) => {
        return /^[6][0-9]{8}$/.test(phoneNumber);
    };       

    return (
        <SafeAreaView style={styles.container}>
            <>
                <Text style={styles.header}>Payment Details</Text>
                <Text style={styles.planName}>{name}</Text>
                <Text style={styles.price}>Price: {amount}frs</Text>
                <View style={styles.featuresContainer}>
                    <Text style={styles.featuresHeader}>Features:</Text>
                    {features.map((feature, index) => (
                        <Text key={index} style={styles.featureItem}>
                            - {feature.title}
                        </Text>
                    ))}
                </View>
                <View style={styles.inputContainer}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#999" style={styles.loadingIndicator} />
                    ) : (
                        <Image source={networkLogo} style={styles.networkLogo} />
                    )}
                    <TextInput
                        style={styles.input}
                        onChangeText={setPhoneNumber}
                        value={phoneNumber}
                        placeholder="Enter Phone Number"
                    />
                </View>
                <View style={styles.paymentStatusContainer}>
                    {/* {processingPayment && <ActivityIndicator size="small" color="#999" style={styles.loadingIndicator} />} */}
                    {paymentConfirmed && <Text style={styles.paymentSuccess}>Payment Confirmed <Text style={styles.successIcon}>✔️</Text></Text>}
                </View>
                <TouchableOpacity
                    style={styles.initiateButton}
                    onPress={handlePaymentInitiation}
                    disabled={processingPayment}
                >
                    {processingPayment ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text style={styles.initiateButtonText}>Initiate Payment</Text>
                    )}
                </TouchableOpacity>
            </>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F5F5F5',
        paddingTop: 30
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    planName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    price: {
        fontSize: 16,
        marginBottom: 16,
    },
    featuresContainer: {
        marginBottom: 16,
    },
    featuresHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    featureItem: {
        fontSize: 16,
        marginLeft: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    networkLogo: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    initiateButton: {
        backgroundColor: '#BFD101',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    initiateButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingIndicator: {
        marginRight: 10,
    },
});

export default PaymentsScreen;
