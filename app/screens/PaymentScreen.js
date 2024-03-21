import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useMutation, gql } from '@apollo/client';
import Toast from 'react-native-toast-message';
import { WebView } from 'react-native-webview';

const INITIATE_PAYMENT = gql`
  mutation InitializePayment($amount: Float!) {
    initializePayment(amount: $amount) {
      success
      paymentUrl
      errorMessage
    }
  }
`;

const convertPriceToNumber = (priceString) => {
    const cleanedPriceString = priceString.replace(/,/g, '').replace('frs', '');
    const priceNumber = parseFloat(cleanedPriceString);
    return isNaN(priceNumber) ? null : priceNumber;
};

const PaymentsScreen = ({ route, navigation }) => {
    const { plan } = route.params;
    const { name, price, features } = plan;
    const amount = convertPriceToNumber(price);
    const [initiatePayment] = useMutation(INITIATE_PAYMENT);
    const [paymentUrl, setPaymentUrl] = useState(null);

    const handlePaymentInitiation = async () => {
        try {
            const { data } = await initiatePayment({
                variables: { amount },
            });

            if (data.initializePayment.success) {
                const paymentUrl = data.initializePayment.paymentUrl;
                console.log(paymentUrl)
                setPaymentUrl(paymentUrl);
                // Redirect the user to the payment portal
                // You may use a WebView or Linking.openURL depending on your use case
                // For simplicity, we'll just show a message here
                Toast.show({
                    text1: 'Redirecting to payment portal...',
                    type: 'info',
                    position: 'top',
                    duration: 10000,
                });
            } else {
                Toast.show({
                    text1: data.initializePayment.errorMessage,
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                });
            }
        } catch (error) {
            console.error('Error initiating payment:', error.message);
            Toast.show({
                text1: 'Error initiating payment',
                type: 'error',
                position: 'top',
                duration: 3000,
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {paymentUrl ? (
                <WebView source={{ uri: paymentUrl }} />
            ) : (
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
                    <TouchableOpacity style={styles.initiateButton} onPress={handlePaymentInitiation}>
                        <Text style={styles.initiateButtonText}>Initiate Payment</Text>
                    </TouchableOpacity>
                </>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F5F5F5',
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
    initiateButton: {
        backgroundColor: '#BFD101',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    initiateButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PaymentsScreen;
