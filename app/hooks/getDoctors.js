import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_ALL_DOCTORS = gql`
  query {
    listAllDoctors {
      uuid
      specialisation
      image
      username
      address,
      biography,
      consultationsDone,
      yearsOfExperience,
      followersCount
      userData {
        _id
        uuid
        email
        name
        biography,
        phone
      }
    }
  }
`;

const useDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  
  const { loading, error, data } = useQuery(GET_ALL_DOCTORS);

  useEffect(() => {
    if (!loading && !error && data) {
      let docData = data.listAllDoctors;
      // add name, email, biography, phone to the doctor object directly
      docData = docData.map((doc) => {
        return {
          ...doc,
          name: doc.userData.name,
          email: doc.userData.email,
          biography: doc.userData.biography,
          phone: doc.userData.phone
        };
      }); 
      setDoctors(docData);
    }
  }, [loading, error, data]); 

  return { doctors, loading, error };
};

export default useDoctors;
