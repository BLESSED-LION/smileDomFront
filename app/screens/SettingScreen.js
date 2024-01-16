import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';

export default function SettingsScreen() {
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#fff'
    }}>
    <List.Section
      style={{
        backgroundColor: "#fff"
      }}
    >
      <List.Accordion
        title="General"
        left={(props) => <List.Icon {...props} icon="folder" />}
      >
        <List.Item title="Notifications" />
        <List.Item title="Privacy" />
        <List.Item title="Terms of Service" />
      </List.Accordion>

      <List.Accordion
        title="Appearance"
        left={(props) => <List.Icon {...props} icon="folder" />}
      >
        <List.Item title="Theme" />
        <List.Item title="Font Size" />
      </List.Accordion>
    </List.Section>
    </View>
  );
}
