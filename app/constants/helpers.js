import { FontAwesome } from '@expo/vector-icons';

export function formatTime(milliseconds) {
  const currentTime = new Date();
  const timeDiff = (currentTime - new Date(milliseconds)) / 1000;

  if (timeDiff < 60) {
      return "just now";
  } else if (timeDiff < 3600) {
      const minutes = Math.floor(timeDiff / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (timeDiff < 86400) {
      return new Date(milliseconds).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  } else {
      const messageDate = new Date(milliseconds);
      const daysDiff = Math.floor((currentTime - messageDate) / (1000 * 60 * 60 * 24));

      if (daysDiff === 1) {
          return "yesterday";
      } else if (daysDiff === 2) {
          return "saturday";
      } else {
          const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          return days[messageDate.getDay()];
      }
  }
}

export function generateRandomGravatarUrl() {
  // Generate a random 8-character MD5 hash
  const randomHash = Math.random().toString(36).substring(2, 10);

  // Construct the Gravatar URL with desired size and default image
  return `https://www.gravatar.com/avatar/${randomHash}?s=200&d=identicon`;
}

export function generateRandomString(length) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

export function extractLastName(fullName) {
  const nameParts = fullName && fullName.split(' '); // Split the full name into an array of parts
  const lastName = nameParts ? nameParts[nameParts.length - 1] : ""; // Get the last part of the name array
  return lastName;
}

export function extractAllButLastName(fullName) {
  const nameParts = fullName && fullName.split(' '); // Split the full name into an array of parts
  const allButLastName = nameParts ? nameParts.slice(0, -1).join(' ') : ""; // Join the first name parts together
  return allButLastName;
}

export function formatTimestampLikeWhatsApp(timestamp, userTimezone = "Africa/Bamenda") {
  const timestampDate = new Date(timestamp); // Convert timestamp to Date object in UTC
  const userNow = new Date(); // Get current time in user's time zone
  userNow.setMinutes(userNow.getMinutes() + userTimezone.split("/")[1] * 60); // Adjust for user's time zone

  const delta = Math.abs(userNow - timestampDate) / 1000; // Calculate time difference in seconds

  if (delta < 5) {
    return "Just now";
  } else if (delta < 3600) {
    const minutes = Math.floor(delta / 60);
    return `${minutes} minutes ago`;
  } else if (userNow.toDateString() === timestampDate.toDateString()) {
    // Format for current day in user's time zone
    return timestampDate.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });
  } else if (userNow.toDateString() === new Date(timestampDate.getTime() + 86400000).toDateString()) {
    return "Yesterday";
  } else {
    // Format for other days in user's time zone
    return timestampDate.toLocaleDateString([], { month: "short", day: "numeric" });
  }
}

export function convertTimeToWhatsAppStyle(timeString) {
  const date = new Date(timeString);

  // Get components for relative time calculation
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  // Determine appropriate format based on time difference
  const differenceInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (differenceInDays === 0) {
    // Today
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  } else if (differenceInDays === 1) {
    // Yesterday
    return "Yesterday";
  } else {
    // Month and day
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    return `${month} ${day}`;
  }
}

export function sortMessagesByCreatedAt(messages) {
  return messages.sort((a, b) => {
    // Parse the "createdAt" strings into Date objects
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    // Compare the dates in descending order
    return dateB - dateA; // Swap a and b for ascending order
  });
}

export const actions = [
  {
    text: 'Create Post',
    icon: <FontAwesome name="edit" size={24} color="black" />,
    name: 'post',
    color: '#3F51B5',
    position: 1,
    onPress: () => {
      // Handle post creation
    },
  },
  {
    text: 'Upload Image',
    icon: <FontAwesome name="microphone" size={24} color="black" />,
    name: 'image',
    color: '#3F51B5',
    position: 2,
    onPress: () => {
      // Handle image upload
    },
  },
  {
    text: 'Record Video',
    icon: <FontAwesome name="upload" size={24} color="black" />,
    name: 'video',
    color: '#3F51B5',
    position: 3,
    onPress: () => {
      // Handle video recording
    },
  },
];

export function filterUniqueAndSortByCreatedAt(arr) {
  const uniqueAndSortedObjects = arr;

  // Sort the unique objects by createdAt in ascending order
  uniqueAndSortedObjects.sort((a, b) => {
    // Calculate a single timestamp for comparison
    const timestampA = a.createdAt.seconds * 1e9 + a.createdAt.nanoseconds;
    const timestampB = b.createdAt.seconds * 1e9 + b.createdAt.nanoseconds;

    return timestampA - timestampB;
  });

  return uniqueAndSortedObjects;
}
