import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../constants/theme';

import HomeScreen from '../screens/HomeScreen';
import DoctorInfoScreen from '../screens/DoctorInfoScreen'
import ChatScreen from '../screens/ChatScreen';
import PatientChatScreen from '../screens/PatientChatScreen';
import ConsultationResultScreen from '../screens/ConsultationResultScreen';
import PreviousConsultationsScreen from '../screens/PreviousConsultationScreen';
import ConsultationForm from '../screens/ConsultFormScreen';
import CallScreen from '../screens/CallScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import VideoCallScreen from '../screens/VideoCallScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import MembershipArea from '../screens/MembershipArea';
import CreatePost from '../screens/CreatePostScreen';
import PaymentsScreen from '../screens/PaymentScreen';
import ConsultationResults from '../screens/ConsultationResultScreen';

const Stack = createStackNavigator();

const DoctorNavigator = () => {
    const { theme } = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen name="docHome" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="doctor" component={DoctorInfoScreen} options={{ headerShown: false }} />
      <Stack.Screen name="profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="chatDoctor" component={ChatScreen} options={{ headerShown: false }} />
      <Stack.Screen name="previousConsult" component={PreviousConsultationsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="notifications" component={NotificationsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="consultForm" component={ConsultationForm} options={{ headerShown: false }} />
      <Stack.Screen name="createPost" component={CreatePost} options={{ headerShown: false }} />
      <Stack.Screen name="conResult" component={ConsultationResults} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default DoctorNavigator