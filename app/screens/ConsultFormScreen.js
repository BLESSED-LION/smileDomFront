import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import Toast from 'react-native-toast-message';
import CustomInputModal from '../components/Modal/CustomInputModal'; // Assuming this is your custom modal component
import useCreateConsultation from '../constants/consultationMutation';

const ConsultationForm = ({ navigation, route }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [ld, setLD] = useState(false);
    const [inputFields, setInputFields] = useState([[{}], [{}], [{}], [{}], [{}], [{}], [{}], [{}]]);
    const [tabHeadings, setTabHeadings] = useState(['Complains', 'Medical History', 'Examinations', 'Diagnosis', 'Work Ups', 'Treatment', 'Appointment']);
    const { patient, doctor } = route.params;
    const [selectedDate, setSelectedDate] = useState('');
    const [editingTabIndex, setEditingTabIndex] = useState(null); // Track the index of the tab being edited
    const [createConsultationHandler, loading, error] = useCreateConsultation();

    function organizeConsultationData(inputFields, headings) {
        const consultationData = {};

        // Loop through headings
        for (let i = 0; i < headings.length; i++) {
            const heading = headings[i];
            const fieldValues = inputFields[i]; // Get corresponding input fields for the heading

            // Check if any value exists for the current heading
            if (fieldValues && fieldValues.length > 0) {
                // Extract content, handling empty fields:
                consultationData[heading] = fieldValues.map(field => field.value || ''); // Default empty value to ''
            } else {
                consultationData[heading] = []; // Set an empty array for headings without input
            }
        }

        return consultationData;
    }

    if (error) {
        console.warn(error)
    }

    const handleSubmit = async () => {
        setLD(true)
        const dat = organizeConsultationData(inputFields, tabHeadings);
        const keys = Object.keys(dat);
        const values = Object.values(dat).map(array => array[0]);
        const consultationData = {
            patient: patient.id,
            doctor: doctor && doctor._id,
            // date: Date.now,
            headings: keys,
            content: values,
        };

        try {
            const createdConsultation = await createConsultationHandler(consultationData);

            if (createdConsultation) {
                console.log(createdConsultation)
                Toast.show({
                    text1: "Consultation updated succesfully",
                    type: "info", // Can be 'success', 'info', 'warning', or 'error'
                    position: "top", // Can be 'top', 'center', or 'bottom'
                    duration: 3000, // Duration in milliseconds
                  });
                  navigation.navigate("previousConsult", {
                    patient,
                    doctor
                  })
                // setInputFields([[{}], [{}], [{}], [{}], [{}], [{}], [{}], [{}]]);

            } else if (error) {
                console.warn(error)
            }
            setLD(false)
        } catch (error) {
            console.warn(error)
            setLD(false)
        }
    };
    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
    };
    const markedDates = {};
    markedDates[selectedDate] = { selected: true };

    const handleTabPress = (tab) => {
        setActiveTab(tab);
        setEditingTabIndex(null); // Clear editing state when switching tabs
    };

    const handleEditTabHeading = (index) => {
        setEditingTabIndex(index); // Set the index of the tab to be edited
    };

    const handleSaveEditedTabHeading = (newHeading) => {
        if (newHeading.trim() === '') {
            alert('Please enter a valid heading.');
            return;
        }

        const newHeadings = [...tabHeadings];
        newHeadings[editingTabIndex] = newHeading;
        setTabHeadings(newHeadings);
        setEditingTabIndex(null); // Clear editing state after saving
    };

    const handleAddField = () => {
        const newFields = [...inputFields];
        newFields.push([{}]); // Add a new field
        setInputFields(newFields);

        const newHeadings = [...tabHeadings];
        newHeadings.push('New Field'); // Add a new default heading
        setTabHeadings(newHeadings);
    };

    const handleDeleteField = (fieldIndex) => {
        const newFields = [...inputFields];
        newFields.splice(fieldIndex, 1);
        setInputFields(newFields);

        const newHeadings = [...tabHeadings];
        newHeadings.splice(fieldIndex, 1);
        setTabHeadings(newHeadings);
    };


    return (
        <View style={{ flex: 1 }}>
            {/* Header and tab buttons */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.patientName}>Consultation by {doctor.name}</Text>
            </View>
            <View style={styles.tabButtons}>
                {tabHeadings.map((heading, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleTabPress(index)}
                        onLongPress={() => handleEditTabHeading(index)}
                    >
                        {editingTabIndex === index ? (
                            <CustomInputModal // Use your custom modal component here
                                value={heading}
                                placeholder="Enter new heading"
                                onClose={setEditingTabIndex} // Clear editing state on close
                                onConfirm={handleSaveEditedTabHeading}
                            />
                        ) : (
                            <Text style={[styles.tabButton, {
                                color: activeTab === index ? '#5fbae8' : '#fff',
                                backgroundColor: activeTab === index ? '#fff' : '#5fbae8',
                            }]}>{heading}</Text>
                        )}
                    </TouchableOpacity>
                ))}
                <TouchableOpacity onPress={handleAddField}>
                    <Text style={[styles.tabButton, {
                        color: '#fff',
                        backgroundColor: '#BFD101',
                    }]}>+ New Field</Text>
                </TouchableOpacity>
            </View>
            {/* Input fields or calendar */}
            <ScrollView style={styles.tabContent}>
                {activeTab !== 6 ? (
                    inputFields[activeTab].map((field, index) => (
                        <TextInput
                            key={index}
                            multiline={true}
                            numberOfLines={9}
                            editable={true}
                            placeholder={tabHeadings[activeTab]}
                            style={{ backgroundColor: "#F5F5F5" }}
                            right={<TextInput.Icon name="close" onPress={() => handleDeleteField(index)} />}
                            value={inputFields[activeTab][index].value ? inputFields[activeTab][index].value : ''}
                            onChangeText={(newValue) => {
                                const fields = [...inputFields];
                                fields[activeTab][index] = { value: newValue };
                                setInputFields(fields);
                            }}
                        />
                    ))
                ) : (
                    <Calendar
                        onDayPress={handleDayPress}
                        markedDates={markedDates}
                    />
                )}
            </ScrollView>
            {/* Submit button */}
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                {!ld && <Text style={styles.submitButtonText}>SUBMIT FORM</Text>}
                {ld && <ActivityIndicator size="large" color={"#BFD101"} />}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    backButton: {
        marginRight: 10,
    },
    patientName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    tabButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        flexWrap: 'wrap',
    },
    tabButton: {
        padding: 12,
        borderRadius: 15,
        fontWeight: '700',
        fontSize: 12,
        marginTop: 10,
    },
    tabContent: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    submitButton: {
        backgroundColor: '#5fbae8',
        padding: 10,
    },
    submitButtonText: {
        textAlign: 'center',
        color: '#fff',
    },
});

export default ConsultationForm;
