import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_ALL_DOCTORS = gql`
  query {
    listAllDoctors {
      uuid
      name
      specialisation
      image
      username
      email,
      address,
      phoneNumber,
      biography,
      consultationsDone,
      yearsOfExperience,
      followersCount
      userData {
        uuid
        email
      }
    }
  }
`;

const useDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  
  const { loading, error, data } = useQuery(GET_ALL_DOCTORS);

  useEffect(() => {
    if (!loading && !error && data) {
      setDoctors(data.listAllDoctors);
    }
  }, [loading, error, data]); 

  return { doctors, loading, error };
};

export default useDoctors;
