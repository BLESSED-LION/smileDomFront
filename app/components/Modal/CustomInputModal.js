import React, { useState } from 'react';
import { View, TextInput, Button, Modal, StyleSheet } from 'react-native';

const CustomInputModal = ({ value, showModal, onClose, onConfirm }) => {
    const [inputValue, setInputValue] = useState(value);

    const handleConfirm = () => {
        onConfirm(inputValue);
        setInputValue('');
        onClose(null);
    };

    const handleClose = () => {
        setInputValue('');
        onClose(null);
    };

    return (
        <Modal
            visible={showModal}
            animationType="slide"
            transparent={true}
            onRequestClose={handleClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TextInput
                        // placeholder={placeholder}
                        value={inputValue}
                        onChangeText={setInputValue}
                        style={styles.input}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Confirm" onPress={handleConfirm} />
                        <Button title="Cancel" onPress={handleClose} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default CustomInputModal;
