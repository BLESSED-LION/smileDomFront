import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, Image, View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { GET_CONSULTATIONS_BY_DOCTOR, GET_CONSULTATIONS_FOR_PATIENT } from '../constants/mutations';
import Toast from 'react-native-toast-message';
import { formatTime, formatTimestampLikeWhatsApp } from '../constants/helpers';

const PreviousPatient = ({ route }) => {
    const { patient, doctor } = route.params;
    const navigation = useNavigation();
    const [consultations, setConsultations] = useState([]);
    const { loading, error, data } = useQuery(GET_CONSULTATIONS_FOR_PATIENT, {
        variables: { patientId: patient._id }
    });

    useEffect(() => {
        if (data && data.consultationsForPatient) {
            setConsultations(data.consultationsForPatient);
            console.log(data)
            Toast.show({
                text1: "Loaded succesfully",
                type: "info", // Can be 'success', 'info', 'warning', or 'error'
                position: "top", // Can be 'top', 'center', or 'bottom'
                duration: 3000, // Duration in milliseconds
              });
        }
    }, [data]);

    const renderConsultationItem = ({ item, index }) => (
        <TouchableOpacity 
            style={styles.consultationCard} 
            onPress={() => navigation.navigate("conResult", {
                consultation: item,
                patient,
                doctor
            })}
        >
            <Ionicons name="medkit" style={styles.consultationIcon} size={40} color={'#2FA8E5'} />
            <View>
                <Text style={styles.consultationName}>{index} {item.doctor.name}</Text>
                <Text style={styles.consultationDate}>{formatTime(parseFloat(item.date))}</Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) return <ActivityIndicator size="large" color={"#BFD101"} />;
    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={20} color="black" />
                </TouchableOpacity>
                <Image source={{ uri: patient.image }} style={styles.profilePicture} />
                <Text style={styles.patientName}>{patient.name}</Text>
            </View>
            <FlatList
                data={consultations}
                renderItem={renderConsultationItem}
                keyExtractor={(item) => item.id}
            />
            {doctor.isDoctor &&
            <TouchableOpacity style={[styles.consultationCard, { backgroundColor: '#BFD101' }]} onPress={() => navigation.navigate("consultForm", {
                patient,
                doctor
            })}>
                <Ionicons name="medkit" style={[styles.consultationIcon]} size={40} color={'#fff'} />
                <View>
                    <Text style={[styles.consultationName, { color: "#fff" }]}>New Consultation</Text>
                </View>
            </TouchableOpacity>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 15,
        marginTop: 30
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 17
    },

    profilePicture: {
        width: 30,
        height: 30,
        borderRadius: 25,
    },

    patientName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },

    consultationCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 15,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },

    consultationIcon: {
        width: 50,
        height: 50,
        marginRight: 5,
    },

    consultationName: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    consultationDate: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
});

export default PreviousPatient;
