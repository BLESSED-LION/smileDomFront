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

 export  function formatTimestampLikeWhatsApp(timestamp, userTimezone = "Africa/Bamenda") {
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
  
  