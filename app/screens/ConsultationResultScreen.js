import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Alert, ActivityIndicator, Image } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const ConsultationResultScreen = ({ route }) => {
  const { consultation, patient, doctor } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [path, setPath] = useState('');

  const generatePDF = async () => {
    setIsLoading(true);
    try {
      // Define styles
      const styles = `
        body {
          font-family: Arial, sans-serif;
          color: #333;
          margin: 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .logo {
          width: 100px;
          height: auto;
          margin-bottom: 10px;
        }
        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: rgba(0, 0, 0, 0.1);
          font-size: 100px;
          font-weight: bold;
          opacity: 0.5;
          pointer-events: none;
        }
        .section {
          margin-bottom: 20px;
        }
        .heading {
          font-size: 20px;
          font-weight: bold;
          color: #BFD101;
          text-align: center;
          margin-bottom: 5px;
        }
        .content {
          font-size: 16px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 10px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        .signature {
          margin-top: 50px;
          text-align: center;
        }
        .signature img {
          width: 150px;
          height: auto;
        }
      `;

      // Generate HTML content
      let htmlContent = `
        <html>
          <head>
            <style>${styles}</style>
          </head>
          <body>
            <div class="header">
              <img src="https://i.postimg.cc/FzKLG5k6/Smile-Dom-1.png" alt="Logo" class="logo" />
              <div class="watermark">
                <img src="https://i.postimg.cc/FzKLG5k6/Smile-Dom-1.png" alt="" />
              </div>
              <p>Patient: ${patient.name}</p>
              <p>Email: ${patient.email}</p>
            </div>
      `;

      // Add consultation data
      consultation.headings.forEach((heading, index) => {
        if (heading && consultation.content[index]) {
          htmlContent += `
            <div class="section">
              <h2 class="heading">${heading}</h2>
              <table>
                <tbody>
                  ${consultation.content[index].split('\n').map((line, idx) => `
                    <tr>
                      <td>${idx + 1}</td>
                      <td>${line}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `;
        }
      });

      htmlContent += `
            <div class="signature">
              <p>${doctor.name}</p>
              <img src="https://example.com/signature.png" alt="Signature" />
            </div>
          </body>
        </html>
      `;

      const pdfPath = await Print.printToFileAsync({ html: htmlContent });
      setPath(pdfPath)

      await Sharing.shareAsync(pdfPath.uri);
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error generating PDF. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#BFD101" />
        ) : (
          <>
            <View style={styles.consultationData}>
              {consultation.headings.map((heading, index) => (
                <View key={index} style={styles.section}>
                  {heading && consultation.content[index] && (
                    <>
                      <Text style={styles.heading}>{heading}</Text>
                      <Text style={styles.content}>
                        {consultation.content[index].split('\n').map((line, idx) => (
                          <Text key={idx}>
                            {idx + 1}. {line}
                          </Text>
                        ))}
                      </Text>
                    </>
                  )}
                </View>
              ))}
            </View>
            {path && <Text>{path}</Text>}
            <Button 
              color={"#BFD101"} 
              title="Generate PDF" 
              onPress={generatePDF} 
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  consultationData: {
    marginTop: 20,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#BFD101',
    textAlign: 'center',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
  },
});

export default ConsultationResultScreen;
