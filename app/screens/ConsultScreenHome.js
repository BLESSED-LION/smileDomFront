import React from "react";
import ConsultScreen from "./ConsultScreen";
import MembershipArea from "./MembershipArea";
import ChatScreen from "./ChatScreen";
import PatientChatScreen from "./PatientChatScreen";
import ConsultationResults from "./ConsultationResultScreen";
import PreviousConsultationsScreen from "./PreviousConsultationScreen";
import ConsultationForm from "./ConsultFormScreen";
import CallScreen from "./CallScreen";
import { createStackNavigator } from "@react-navigation/stack";
import PaymentsScreen from "./PaymentScreen";
import { useSelector } from "react-redux";
import VideoCallScreen from "./VideoCallScreen";

const Stack = createStackNavigator();

function ConsultScreenHome() {
  const user = useSelector((state) => state.user);
  const free = user.user && user.user.duration === "free";

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeMainScreen" component={ConsultScreen} />
      <Stack.Screen name="membership" component={MembershipArea} options={{ headerShown: false, tabBarVisible: true }} />
      <Stack.Screen name="chatPatient" component={ !free ? MembershipArea  :PatientChatScreen} options={{ headerShown: true, tabBarVisible: false, title: "Chat" }} />
      <Stack.Screen name="conResult" component={ConsultationResults} options={{ headerShown: false }} />
      <Stack.Screen name="previousConsult" component={PreviousConsultationsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="consultForm" component={ConsultationForm} options={{ headerShown: false }} />
      <Stack.Screen name="callScreen" component={CallScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PaymentDetails" component={PaymentsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="videoCallScreen" component={VideoCallScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default ConsultScreenHome;
