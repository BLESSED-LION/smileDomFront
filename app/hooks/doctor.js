import { collection, query, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";

export const useDoctor = (id) => {
    const [doctor, setDoctor] = useState([]);
    const [docId, setDocId] = useState("")
    const [loadiing, setLoading] = useState(true)

    
    useEffect(() => {
        const fetchDoctors = async () => {
            
        };
        fetchDoctors();
    }, []);

    const isDoctorFollower = async(userId) => {
        if (!doctor.followers) {
            return false;
        }
        return doctor.followers.includes(userId);
    }

    const followDoctor = async(userId) => {
        
    }

    const unFollowDoctor = async(userId) => {
        
    }

    return {doctor, docId, loadiing, isDoctorFollower, followDoctor, unFollowDoctor};
};
