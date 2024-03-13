import * as React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Card, List, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const plans = [
  {
    name: 'SmileDom Online',
    price: '2,000frs',
    features: [
      { title: 'Instant Online Consultation', icon: 'video' },
      { title: 'Instant Medical report', icon: 'file-document' },
    ],
  },
  {
    name: 'SmileDom Simple',
    price: '20,000frs',
    features: [
      { title: 'Instant Online Consultation', icon: 'video' },
      { title: 'Instant Medical report', icon: 'file-document' },
      { title: 'Medical Consultation at home', icon: 'home' },
    ],
  },
  {
    name: 'SmileDom Comfort (3 months)',
    price: '30,000frs',
    features: [
      { title: 'Instant Online Consultation', icon: 'video' },
      { title: 'Instant Medical report', icon: 'file-document' },
      { title: 'Medical Consultation at home', icon: 'home' },
      { title: 'Telemedicine', icon: 'phone' },
      { title: 'Psychological assistance', icon: 'head' },
      { title: 'Nutritional and sports support', icon: 'food' },
    ],
  },
  {
    name: 'SmileDom Relax',
    price: '25,000frs',
    features: [
      { title: 'Instant Online Consultation', icon: 'video' },
      { title: 'Instant Medical report', icon: 'file-document' },
      { title: 'Medical Consultation at home', icon: 'home' },
      { title: 'Telemedicine', icon: 'phone' },
      { title: 'Psychological assistance', icon: 'head' },
      { title: 'Nutritional and sports support', icon: 'food' },
      { title: 'Cardiovascular Disease Screening', icon: 'heart' },
    ],
  },
  {
    name: 'SmileDom Pro',
    price: '50,000frs',
    features: [
      { title: 'Instant Online Consultation', icon: 'video' },
      { title: 'Instant Medical report', icon: 'file-document' },
      { title: 'Medical Consultation at home', icon: 'home' },
      { title: 'Telemedicine', icon: 'phone' },
      { title: 'Psychological assistance', icon: 'head' },
      { title: 'Nutritional and sports support', icon: 'food' },
      { title: 'Cardiovascular Disease Screening', icon: 'heart' },
      { title: 'Baseline check-up (hepatitis B/C, HIV)', icon: 'needle' },
    ],
  },
];

const MembershipArea = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={{ backgroundColor: '#F5F5F5', padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Choose Your Plan
      </Text>
      {plans.map((plan) => (
        <TouchableOpacity key={plan.name} onPress={() => navigation.navigate('PaymentDetails', { plan })}>
          <Card style={{ marginBottom: 16 }}>
            <Card.Title title={plan.name} subtitle={plan.price} />
            <Card.Content>
              <List.Section>
                {plan.features.map((feature) => (
                  <List.Item
                    key={feature.title}
                    title={feature.title}
                    left={(props) => <List.Icon {...props} icon={feature.icon} />}
                  />
                ))}
              </List.Section>
            </Card.Content>
            <Card.Actions style={{ justifyContent: 'flex-end' }}>
              <Button onPress={() => navigation.navigate('PaymentDetails', { plan })}>Select Plan</Button>
            </Card.Actions>
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default MembershipArea;
