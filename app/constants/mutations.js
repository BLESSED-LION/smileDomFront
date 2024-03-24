import { gql } from "@apollo/client"

export const SEND_MESSAGE = gql`
mutation sendMessage($senderId: String!, $receiverId: String!, $message: String!) {
    sendMessage(senderId: $senderId, receiverId: $receiverId, message: $message) {
        message
        receiver{
            name
            uuid
        }
    }
    }
`;
export const GET_CHAT_MESSAGE = gql`
query getChatMessages($senderId:String!, $receiverId:String!){
    getChatMessages(senderId:$senderId, receiverId:$receiverId){
      message
      timestamp
      receiver{
        name
        username
        image
        uuid
      }
      sender{
        name
        username
        image
        uuid
      }
    }
  }
`;
export const GET_CHATS = gql`
query userChats{
  userChats{
    id
    name
    image
    lastMessageTime
    lastMessage
    unreadMessages
    uuid
    }
  }
`;

export const GET_CONSULTATIONS_BY_DOCTOR = gql`
  query GetConsultationsByDoctor($doctorId: ID!) {
    consultationsByDoctor(doctorId: $doctorId) {
      id
      patient {
        id
        name
      }
      date
      headings
      content
    }
  }
`;
export const GET_CONSULTATIONS_FOR_PATIENT = gql`
  query GetConsultationsForPatient($patientId: ID!) {
    consultationsForPatient(patientId: $patientId) {
      id
      patient {
        id
        name
      }
      doctor {
        id
        name
      }
      date
      headings
      content
    }
  }
`;

export const GET_NOTIFICATIONS = gql`
  query GetNotifications($userId: ID!) {
    notifications(userId: $userId) {
      id
      message
      userId
      read
      createdAt
    }
  }
`;

export const MARK_NOTIFICATION_AS_READ = gql`
  mutation MarkNotificationAsRead($notificationId: ID!) {
    markNotificationAsRead(notificationId: $notificationId) {
      id
      read
    }
  }
`;

export const CREATE_NOTIFICATION = gql`
  mutation CreateNotification($input: CreateNotificationInput!) {
    createNotification(input: $input) {
      id
      userId
      message
      read
      createdAt
    }
  }
`;