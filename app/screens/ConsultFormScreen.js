import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { TextInput, IconButton } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { db } from '../config/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import Toast from 'react-native-toast-message';

const ConsultationForm = ({ navigation, route }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [inputFields, setInputFields] = useState([[{}], [{}], [{}], [{}], [{}], [{}], [{}], [{}]]);
    const [fieldValues, setFieldValues] = useState(
        inputFields[activeTab].map((field) => ({ ...field, value: '' }))
    );
    const [formData, setFormData] = useState({});
    const { patient, doctor } = route.params;
    const [selectedDate, setSelectedDate] = useState('');
    const [loading, setLoading] = useState(false)

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
        console.log(selectedDate)
    };
    const markedDates = {};
    markedDates[selectedDate] = { selected: true };

    const handleTabPress = (tab) => {
        setActiveTab(tab);
        console.log("Active tab is: ", activeTab)
        console.log("Tabs: ", inputFields)
    };

    const handleSubmit = () => {
        setLoading(true)
        const complains = inputFields[0].map((field, index) => field.value);
        const history = inputFields[1].map((field, index) => field.value);
        const examinations = inputFields[2].map((field, index) => field.value);
        const diagnosis = inputFields[3].map((field, index) => field.value);
        const workups = inputFields[4].map((field, index) => field.value);
        const treatment = inputFields[5].map((field, index) => field.value);
        const appointment = selectedDate;

        const appointmentData = {
            complains,
            history,
            examinations,
            diagnosis,
            workups,
            treatment,
            appointment,
            doctor: doctor.id,
            patient: patient.patient.id
        }
        const appointmentsCollectionRef = collection(db, "appointments");
        addDoc(appointmentsCollectionRef, appointmentData)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                setLoading(false)
                Toast.show({
                    text1: 'Consultation made...',
                    type: 'success', // Can be 'success', 'info', 'warning', or 'error'
                    position: 'top', // Can be 'top', 'center', or 'bottom'
                    duration: 3000, // Duration in milliseconds
                });
                navigation.goBack()
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                setLoading(false)
                Toast.show({
                    text1: 'There was an error',
                    type: 'error', // Can be 'success', 'info', 'warning', or 'error'
                    position: 'top', // Can be 'top', 'center', or 'bottom'
                    duration: 3000, // Duration in milliseconds
                });
            });
        console.log(appointmentData)
    };


    const handleAddField = () => {
        console.log("Adding field...")
        const newFields = [...inputFields];
        newFields[activeTab].push({ placeholder: "Enter text" }); // Add a new empty object for the field
        setInputFields(newFields);
    };

    const handleDeleteField = (fieldIndex) => {
        const newFields = [...inputFields];
        newFields[activeTab].splice(fieldIndex, 1);
        setInputFields(newFields);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={20} color="black" />
                    </TouchableOpacity>
                    <Image source={require("../../assets/doctors/2.png")} style={styles.profilePicture} />
                </TouchableOpacity>
                <Text style={styles.patientName}>Consultation by {doctor.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, flexWrap: "wrap" }}>
                <TouchableOpacity onPress={() => handleTabPress(0)}>
                    <Text style={[{
                        color: activeTab === 0 ? '#5fbae8' : '#fff',
                        backgroundColor: activeTab === 0 ? '#fff' : '#5fbae8',
                        padding: 12,
                        borderRadius: 15,
                        fontWeight: "700",
                        fontSize: 12
                    }]}>Complains</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabPress(1)}>
                    <Text style={[{
                        color: activeTab === 1 ? '#5fbae8' : '#fff',
                        backgroundColor: activeTab === 1 ? '#fff' : '#5fbae8',
                        padding: 12,
                        borderRadius: 15,
                        fontWeight: "700",
                        fontSize: 12
                    }]}>Medical History</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabPress(2)}>
                    <Text style={[{
                        color: activeTab === 2 ? '#5fbae8' : '#fff',
                        backgroundColor: activeTab === 2 ? '#fff' : '#5fbae8',
                        padding: 12,
                        borderRadius: 15,
                        fontWeight: "700",
                        fontSize: 12
                    }]}>Examinations</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabPress(3)}>
                    <Text style={[{
                        color: activeTab === 3 ? '#5fbae8' : '#fff',
                        backgroundColor: activeTab === 3 ? '#fff' : '#5fbae8',
                        padding: 12,
                        borderRadius: 15,
                        fontWeight: "700",
                        fontSize: 12,
                        marginTop: 10
                    }]}>Diagnosis</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabPress(4)}>
                    <Text style={[{
                        color: activeTab === 4 ? '#5fbae8' : '#fff',
                        backgroundColor: activeTab === 4 ? '#fff' : '#5fbae8',
                        padding: 12,
                        borderRadius: 15,
                        fontWeight: "700",
                        fontSize: 12,
                        marginTop: 10
                    }]}>Work Ups</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabPress(5)}>
                    <Text style={[{
                        color: activeTab === 5 ? '#5fbae8' : '#fff',
                        backgroundColor: activeTab === 5 ? '#fff' : '#5fbae8',
                        padding: 12,
                        borderRadius: 15,
                        fontWeight: "700",
                        fontSize: 12,
                        marginTop: 10
                    }]}>Treatment</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabPress(6)}>
                    <Text style={[{
                        color: activeTab === 6 ? '#5fbae8' : '#fff',
                        backgroundColor: activeTab === 6 ? '#fff' : '#5fbae8',
                        padding: 12,
                        borderRadius: 15,
                        fontWeight: "700",
                        fontSize: 12,
                        marginTop: 10
                    }]}>Appointment</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[{
                        color: activeTab === 'Report PDF' ? '#e00000' : '#fff',
                        backgroundColor: activeTab === 'Report PDF' ? '#5fbae8' : '#e00000',
                        padding: 12,
                        borderRadius: 15,
                        fontWeight: "700",
                        fontSize: 12,
                        marginTop: 10
                    }]}>Report PDF</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAddField}>
                    <Text style={[{
                        color: activeTab === 'New Field' ? '#e00000' : '#fff',
                        backgroundColor: activeTab === 'New Field' ? '#BFD101' : '#BFD101',
                        padding: 12,
                        borderRadius: 15,
                        fontWeight: "700",
                        fontSize: 12,
                        marginTop: 10
                    }]}>+ New Field</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "#fff" }}>
                {activeTab != 6 ? inputFields[activeTab].map((field, index) => (
                    <TextInput
                        key={index}
                        placeholder={"Enter text"}
                        style={{
                            borderWidth: 1,
                            borderColor: 'gray',
                            padding: 10,
                            borderTopWidth: 0,
                            borderLeftWidth: 0,
                            borderRightWidth: 0,
                        }}
                        right={
                            <TextInput.Icon
                                name="close"
                                onPress={() => handleDeleteField(index)}
                            />}
                        value={inputFields[activeTab][index].value ? inputFields[activeTab][index].value : ""}
                        onChangeText={(newValue) => {
                            const fields = [...inputFields];
                            fields[activeTab][index] = { value: newValue };
                            setInputFields(fields);
                        }
                        }
                    />
                )) : <Calendar
                    onDayPress={handleDayPress}
                    markedDates={markedDates}
                />}
                <TouchableOpacity onPress={handleSubmit} style={{
                    backgroundColor: '#5fbae8',
                    padding: 10,
                }}>
                    <Text style={{ textAlign: 'center', backgroundColor: "#5fbae8", color: "#fff" }}>{!loading ? "SUBMIT FORM" : "SUBMITTING..."}</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
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
    btn: {
        backgroundColor: '#F5F5F5',
    },
});

export default ConsultationForm;
