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
    const nameParts = fullName.split(' '); // Split the full name into an array of parts
    const lastName = nameParts[nameParts.length - 1]; // Get the last part of the name array
    return lastName;
  }
  
export function extractAllButLastName(fullName) {
    const nameParts = fullName.split(' '); // Split the full name into an array of parts
    const allButLastName = nameParts.slice(0, -1).join(' '); // Join the first name parts together
    return allButLastName;
  }

  