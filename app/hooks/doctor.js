import { collection, query, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";

export const useDoctor = (id) => {
    const [doctor, setDoctor] = useState([]);
    const [docId, setDocId] = useState("")
    const [loadiing, setLoading] = useState(true)

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("type", "==", "doctor"), where("id", "==", id));

    useEffect(() => {
        const fetchDoctors = async () => {
            const querySnapshot = await getDocs(q);
            const doc1 = querySnapshot.docs[0]
            const docs = doc1.data()
            setDoctor(docs);
            setDocId(doc1.id);
            setLoading(false);
        };
        fetchDoctors();
    }, []);

    return {doctor, docId, loadiing};
};
