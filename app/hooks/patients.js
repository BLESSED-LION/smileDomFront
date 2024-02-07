import { collection, query, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db, auth } from "../config/firebaseConfig";

export const usePatients = (id) => {
    const [patientData, setPatientData] = useState([]);
    const [loading, setLoading] = useState(true);

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("type", "==", "doctor"), where("id", "==", id));

    useEffect(() => {
        const fetchPatients = async () => {
            const querySnapshot = await getDocs(q);
            const doc1 = querySnapshot.docs[0];
            const docs = doc1.data();
            console.log("The patients are: ", docs)
            setPatientData(docs.patientsData);
            setLoading(false)
        };
        fetchPatients();
    }, []);

    return patientData;
};
