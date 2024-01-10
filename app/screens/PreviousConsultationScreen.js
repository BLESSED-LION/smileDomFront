import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, Image, View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { useTheme } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

const PreviousConsultationsScreen = () => {
    const [consultations, setConsultations] = useState([
        {
            name: "01 Consultation for gastric",
            date: "01/02/2023"
        },
        {
            name: "02 Consultation for fever",
            date: "04/02/2023"
        },
        {
            name: "03 Consultation for malaria",
            date: "29/04/2023"
        }
    ]);
    const theme = useTheme()
    const navigation = useNavigation()

    const renderConsultationItem = ({ item }) => (
        <TouchableOpacity style={styles.consultationCard}>
            <Ionicons name="medkit" style={styles.consultationIcon} size={40} color={'#2FA8E5'} />
            <View>
                <Text style={styles.consultationName}>{item.name}</Text>
                <Text style={styles.consultationDate}>{item.date}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <TouchableOpacity>
                        <Ionicons name="arrow-back" size={20} color="black" />
                    </TouchableOpacity>
                    <Image source={require("../../assets/doctors/2.png")} style={styles.profilePicture} />
                </TouchableOpacity>
                <Text style={styles.patientName}>Adeline</Text>
            </View>
            <FlatList
                data={consultations}
                renderItem={renderConsultationItem}
                keyExtractor={(item) => item.id}
            />
            <TouchableOpacity style={[styles.consultationCard, {backgroundColor: '#BFD101'}]} onPress={() => navigation.navigate("consultForm")}>
                <Ionicons name="medkit" style={[styles.consultationIcon]} size={40} color={'#fff'} />
                <View>
                    <Text style={[styles.consultationName, {color: "#fff"}]}>New Consultation</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Fill the entire screen
        backgroundColor: '#F5F5F5', // Adjust background color as needed
        padding: 15,
        // paddingTop: 30, 
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 17
        // justifyContent: 'space-between',
    },

    backButton: {
        // Adjust styles for the back button icon and container
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
        backgroundColor: '#FFFFFF', // Adjust card background color
        borderRadius: 10,
        marginBottom: 15,
        padding: 15,
        // paddingLeft: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },

    consultationIcon: {
        width: 50,
        height: 50,
        marginRight: 5,
    },

    consultationDetails: {
        flex: 1,
    },

    consultationName: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    consultationDate: {
        fontSize: 14,
        color: '#888', // Adjust text color for date
        marginTop: 5,
    },
});

export default PreviousConsultationsScreen;
