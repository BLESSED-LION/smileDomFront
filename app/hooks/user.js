// import { collection, query, where, getDocs } from "firebase/firestore";
// import { useState, useEffect } from "react";
// import { auth, db } from "../config/firebaseConfig";

// const usersRef = collection(db, "users");
// const q = query(usersRef, where("type", "==", "doctor"));

// export const useUser = () => {
//     const [user, setUSer] = useState({});
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchDoctors = async () => {
//             const q = query(collection(db, "users"), where("id", "==", auth.currentUser.uid));
//             getDocs(q)
//                 .then((snapshot) => {
//                     if (snapshot.docs.length > 0) {
//                         const userDoc = snapshot.docs[0];
//                         const userData = userDoc.data();
//                         setUSer(userData)
//                         console.log("User data:", userData);
//                         setLoading(false)
//                     } else {
//                         console.log("User not found");
//                         setLoading(false)
//                     }
//                 })
//                 .catch((error) => {
//                     console.error("Error getting user:", error);
//                 });
//         };
//         fetchDoctors();
//     }, []);

//     return { user, loading };
// };
