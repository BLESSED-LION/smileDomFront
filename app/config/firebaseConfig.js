import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { where, query, getDocs } from "firebase/firestore";
import Toast from "react-native-toast-message";

const firebaseConfig = {
  apiKey: "AIzaSyANZC3iDhTitpMHl1A_Owl99jjxDgk_PXU",
  authDomain: "smiledom2.firebaseapp.com",
  projectId: "smiledom2",
  storageBucket: "smiledom2.appspot.com",
  messagingSenderId: "466549108195",
  appId: "1:466549108195:web:54c569ee9f8758143c04d6"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBKoKLzUtymtin32VCBfyrscd8Fxk2hvqg",
//   authDomain: "lala-825bd.firebaseapp.com",
//   projectId: "lala-825bd",
//   storageBucket: "lala-825bd.appspot.com",
//   messagingSenderId: "191714858299",
//   appId: "1:191714858299:web:cbe7488288a2aca4c8931e"
// };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})

const addUser = async (userDetails) => {
  try {

    // Add user data to Firestore using the user's UID as the document ID
    await addDoc(collection(db, "users"), {
      ...userDetails,
    });

    console.log("User added successfully");
  } catch (error) {
    console.error("Error adding user:", error);
    Toast.show({
      text1: 'An erro occured while updating',
      // text2: 'Additional text can go here',
      type: 'error', // Can be 'success', 'info', 'warning', or 'error'
      position: 'top', // Can be 'top', 'center', or 'bottom'
      duration: 3000, // Duration in milliseconds
    });
  }
};

const getUser = async () => {
  const user = auth.currentUser;
  const uid = user.uid;

  const docRef = collection(db, "users");
  const q = query(docRef, where("id", "==", uid));

  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot) {
      const firstDoc = querySnapshot.docs[0];
      const firstDocData = firstDoc.data();
      console.log(firstDocData)

      return firstDocData
    } else {
      console.log("Document does not exist")
      return null
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

export { auth, app, db, addUser, getUser }