import { useMutation } from '@apollo/client';
import { MARK_NOTIFICATION_AS_READ } from './mutations';

export const markNotificationAsRead = async (notificationId) => {
    const [markNotificationAsReadMutation, {loading, error}] = useMutation(MARK_NOTIFICATION_AS_READ);

    try {
        await markNotificationAsReadMutation({
            variables: {
                notificationId,
            },
        });
        if(error){
            console.log(error.message)
        }
    } catch (error) {
        console.error("Error marking notification as read:", error);
    }
};
