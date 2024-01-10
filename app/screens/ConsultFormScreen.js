import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { Ionicons, Fontisto } from '@expo/vector-icons';

const ConsultationForm = () => {
    const [activeTab, setActiveTab] = useState('Complains');
    const [complaint, setComplaint] = useState('');

    const handleTabPress = (tab) => {
        setActiveTab(tab);
    };

    const handleSubmit = () => {
        // Submit form data
    };

    return (
        <View style={{ flex: 1 }}>
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
                <Text style={styles.patientName}>01 Consultation for gastric</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, flexWrap: "wrap" }}>
                <TouchableOpacity onPress={() => handleTabPress('Complains')}>
                    <Text style={[{ 
                        color: activeTab === 'Complains' ? '#5fbae8' : '#fff', 
                        backgroundColor: activeTab === 'Complains' ? '#fff' : '#5fbae8',
                        padding: 12,
                        borderRadius: 15,
                        fontWeight: "700",
                        fontSize: 12
                        }]}>Complains</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabPress('Medical History')}>
                    <Text style={[{ 
                        color: activeTab === 'Medical History' ? '#5fbae8' : '#fff', 
                        backgroundColor: activeTab === 'Medical History' ? '#fff' : '#5fbae8',
                        padding: 12,
                        borderRadius: 15,
                        fontWeight: "700",
                        fontSize: 12
                        }]}>Medical History</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabPress('Examinations')}>
                    <Text style={[{ 
                        color: activeTab === 'Examinations' ? '#5fbae8' : '#fff', 
                        backgroundColor: activeTab === 'Examinations' ? '#fff' : '#5fbae8',
                        padding: 12,
                        borderRadius: 15,
                        fontWeight: "700",
                        fontSize: 12
                        }]}>Examinations</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabPress('Diagnosis')}>
                    <Text style={[{ 
                        color: activeTab === 'Diagnosis' ? '#5fbae8' : '#fff', 
                        backgroundColor: activeTab === 'Diagnosis' ? '#fff' : '#5fbae8',
                        padding: 12,
                        borderRadius: 15,
                        fontWeight: "700",
                        fontSize: 12,
                        marginTop: 10
                        }]}>Diagnosis</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabPress('Work Ups')}>
                    <Text style={[{ 
                        color: activeTab === 'Work Ups' ? '#5fbae8' : '#fff', 
                        backgroundColor: activeTab === 'Work Ups' ? '#fff' : '#5fbae8',
                        padding: 12,
                        borderRadius: 15,
                        fontWeight: "700",
                        fontSize: 12,
                        marginTop: 10
                        }]}>Work Ups</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabPress('Treatment')}>
                    <Text style={[{ 
                        color: activeTab === 'Treatment' ? '#5fbae8' : '#fff', 
                        backgroundColor: activeTab === 'Treatment' ? '#fff' : '#5fbae8',
                        padding: 12,
                        borderRadius: 15,
                        fontWeight: "700",
                        fontSize: 12,
                        marginTop: 10
                        }]}>Treatment</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabPress('Appointment')}>
                    <Text style={[{ 
                        color: activeTab === 'Appointment' ? '#5fbae8' : '#fff', 
                        backgroundColor: activeTab === 'Appointment' ? '#fff' : '#5fbae8',
                        padding: 12,
                        borderRadius: 15,
                        fontWeight: "700",
                        fontSize: 12,
                        marginTop: 10
                        }]}>Appointment</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabPress('Signature')}>
                    <Text style={[{ 
                        color: activeTab === 'Signature' ? '#5fbae8' : '#fff', 
                        backgroundColor: activeTab === 'Signature' ? '#fff' : '#5fbae8',
                        padding: 12,
                        borderRadius: 15,
                        fontWeight: "700",
                        fontSize: 12,
                        marginTop: 10
                        }]}>Signature</Text>
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
                <TouchableOpacity>
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
            <View style={{ padding: 10, flex:1 }}>
                {activeTab === 'Complains' && (
                    <View>
                        <Text style={{ marginBottom: 10, marginTop: 20, fontWeight: 700, fontSize: 18 }}>Complain</Text>
                        <TextInput 
                            value={complaint} 
                            onChangeText={setComplaint} 
                            style={{ 
                                borderWidth: 1, 
                                borderColor: 'gray', 
                                padding: 10,
                                borderTopWidth: 0,
                                borderLeftWidth: 0,
                                borderRightWidth: 0,
                            }}
                            placeholder='Enter complain'
                            />
                    </View>
                )}
                {/* Add other forms here */}
            </View>
            <TouchableOpacity onPress={handleSubmit} style={{ 
                backgroundColor: '#5fbae8', 
                padding: 10, 
            }}>
                <Text style={{ textAlign: 'center', backgroundColor:"#5fbae8", color:"#fff" }}>SUBMIT FORM</Text>
            </TouchableOpacity>
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
