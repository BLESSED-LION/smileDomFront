import * as React from 'react';
import { ScrollView } from 'react-native';
import { Card, List, Text } from 'react-native-paper';

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

export default function MembershipArea() {
  return (
    <ScrollView>
      <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 16 }}>
        SmileDom Membership Plans
      </Text>
      <Text style={{ fontSize: 18, marginHorizontal: 16, marginBottom: 8 }}>
        Upgrade to unlock the full smilecom experience!
      </Text>
      {plans.map((plan) => (
        <Card style={{ margin: 16, elevation: 4 }}>
          <Card.Title
            title={plan.name}
            subtitle={plan.price}
            style={{ backgroundColor: '#FFEB3B' }}
          />
          <Card.Content>
            {plan.features.map((feature) => (
              <List.Item
                title={feature.title}
                left={(props) => <List.Icon {...props} icon={feature.icon} />}
              />
            ))}
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}
