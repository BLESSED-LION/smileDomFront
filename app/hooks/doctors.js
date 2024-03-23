// import { collection, query, where, getDocs } from "firebase/firestore";
// import { useState, useEffect } from "react";
// import { db } from "../config/firebaseConfig";

// const usersRef = collection(db, "users");
// const q = query(usersRef, where("type", "==", "doctor"));

// export const useDoctors = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       const querySnapshot = await getDocs(q);
//       const docs = querySnapshot.docs.map((doc) => {
//         const data = doc.data();
//         data.did = doc.id; // Add document ID as a new property
//         return data;
//       });
      
//       setDoctors(docs);
//       setLoading(false);
//     };
//     fetchDoctors();
//   }, []);

//   return {doctors, loading};
// };
