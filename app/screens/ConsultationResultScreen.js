import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, PermissionsAndroid, } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper'; // Example using react-native-paper
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { auth } from '../config/firebaseConfig';

const ConsultationResults = ({ route, navigation }) => {
  const { data, doctor, patient } = route.params;
  const dat = data[0];
  const [loading, setLoading] = useState(false)
  console.log("Data: ", data)

  const pdfContent = `
  <h1>Consultation Results</h1>
  <p>Date: ${dat.appointment}</p>
  <p>Doctor: ${doctor.name}</p>
  `;

  const requestStoragePermissions = async () => {
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    const status1 = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    );
    console.log("Status: ", status, " ", status1)
    if (status !== 'granted') {
      console.error('Storage permissions not granted');
      // Handle permission denial (e.g., display a message to the user)
    } else {
      console.log('Storage permissions granted!');
      // Proceed with file download
    }
  };


  const generatePDF = async () => {
    const filePath = FileSystem.documentDirectory + `${!patient.patient ? auth.currentUser.displayName : patient.patient.name}consultation.pdf`;
    console.log(filePath)

    try {
      await FileSystem.writeAsStringAsync(filePath, pdfContent, { encoding: FileSystem.EncodingType.UTF8 });
      console.log('PDF generated successfully! ');
      // Provide option for user to download the PDF from filePath
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const downloadPDF = async () => {
    const fileName = `${!patient.patient ? auth.currentUser.displayName : patient.patient.name}consult.pdf`;
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    // const options = {
    //   from: FileSystem.documentDirectory + `${patient.patient.name}consultation.pdf`,
    //   to: fileUri,
    // };

    console.log(fileUri)
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    if (status === "granted") {
      try {
        // const downloadResult = await FileSystem.copyAsync(options);
        const downloadResult = await FileSystem.downloadAsync(fileUri, FileSystem.documentDirectory + fileName);
        console.log('Download started:', downloadResult);
      } catch (error) {
        console.error('Error downloading PDF:', error);
      }
    }
  };

  const handleDownload = async () => {
    setLoading(!loading)
    await requestStoragePermissions()
    await generatePDF();
    await downloadPDF();
    setLoading(!loading)
  }


  return (
    <ScrollView style={styles.container}>
      <Card style={styles.sectionCard}>
        <Card.Title title={`Consultation results for ${!patient.patient ? auth.currentUser.displayName : patient.patient.name}`} />
        <Card.Content>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{dat.appointment}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Doctor:</Text>
            <Text style={styles.value}>{doctor.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Contact:</Text>
            <Text style={styles.value}>{doctor.phoneNumber}</Text>
          </View>
          {/* ... other information fields */}
        </Card.Content>
      </Card>

      <Card style={styles.sectionCard}>
        <Card.Title title="Complaints" />
        <Card.Content>
          <FlatList
            data={dat.complains}
            renderItem={({ item }) => <Text style={styles.listItem}>- {item}</Text>}
          />
        </Card.Content>
      </Card>
      <Card style={styles.sectionCard}>
        <Card.Title title="Diagnosis" />
        <Card.Content>
          <FlatList
            data={dat.diagnosis}
            renderItem={({ item }) => <Text style={styles.listItem}>- {item}</Text>}
          />
        </Card.Content>
      </Card>
      <Card style={styles.sectionCard}>
        <Card.Title title="Examinations" />
        <Card.Content>
          <FlatList
            data={dat.examinations}
            renderItem={({ item }) => <Text style={styles.listItem}>- {item}</Text>}
          />
        </Card.Content>
      </Card>
      <Card style={styles.sectionCard}>
        <Card.Title title="Work ups" />
        <Card.Content>
          <FlatList
            data={dat.workups}
            renderItem={({ item }) => <Text style={styles.listItem}>- {item}</Text>}
          />
        </Card.Content>
      </Card>
      <Card style={styles.sectionCard}>
        <Card.Title title="Treatment" />
        <Card.Content>
          <FlatList
            data={dat.treatment}
            renderItem={({ item }) => <Text style={styles.listItem}>- {item}</Text>}
          />
        </Card.Content>
      </Card>

      <TouchableOpacity style={{ marginBottom: 35 }}>
        <Button icon="camera" mode="contained" onPress={() => navigation.navigate("membership")} color='#BFD101'>
          {!loading ? "Download pdf" : "Downloading..."}
        </Button>
      </TouchableOpacity>

      {/* ... other sections for diagnosis, workouts, history, examinations, treatments */}
    </ScrollView>
  );
};

export default ConsultationResults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Or a light gray for a paper-like background
    padding: 20,
  },

  sectionCard: {
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f5f5f5', // Slightly darker for card-like sections
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  label: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  value: {
    fontSize: 14,
  },

  listItem: {
    marginBottom: 5,
  },

  /* Additional styles for headings, text formatting, etc. */
});
