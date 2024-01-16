import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, Image, View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { useTheme } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { collection, query, orderBy, where, onSnapshot } from "firebase/firestore";
import { auth, db } from '../config/firebaseConfig';
import { ActivityIndicator } from 'react-native-paper';


const PreviousConsultationsScreen = ({ route }) => {
    const [consultations, setConsultations] = useState();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const appointmentsCollectionRef = collection(db, "appointments");
    const navigation = useNavigation()
    const { patient, doctor } = route.params;
    const pid = !patient.patient ? auth.currentUser.uid : patient.patient.id;
    const name = !patient.patient ? auth.currentUser.displayName : patient.patient.name;

    useEffect(async () => {
        const q = query(appointmentsCollectionRef,
            where('patient', '==', pid),
        );
        const unsubscribe = onSnapshot(q, querySnapshot => {
            const consults = querySnapshot.docs.map((doc) => doc.data())
            console.log("snapshot: ", consults)
            setConsultations(
                querySnapshot.docs.map(doc => ({
                    _id: doc.data().id,
                    date: doc.data().appointment,
                    name: `Consultation for ${doc.data().complains[0]}`,
                }))
            );
            setData(consults);
            setLoading(false)
        });

        return () => unsubscribe();
    }, []);

    const renderConsultationItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.consultationCard} 
            onPress={() => navigation.navigate("conResult", {
                data,
                doctor,
                patient
            })}
        >
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
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={20} color="black" />
                    </TouchableOpacity>
                    <Image source={patient.profileImage ? patient.profileImage : require("../../assets/doctors/1.png")} style={styles.profilePicture} />
                </TouchableOpacity>
                <Text style={styles.patientName}>{patient.patient ? patient.patient.name : name}</Text>
            </View>
            <FlatList
                data={consultations}
                renderItem={renderConsultationItem}
                keyExtractor={(item) => item.id}
            />
            {loading && <ActivityIndicator style={{marginTop: 30}} />}
            {patient.patient &&
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
