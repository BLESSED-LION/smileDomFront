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