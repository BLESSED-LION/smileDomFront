import { gql, useMutation } from '@apollo/client';

const CREATE_CONSULTATION = gql`
  mutation createConsultation($data: CreateConsultationInput!) {
    createConsultation(data: $data) {
      id
      content
    date
    headings
    patient{
      id
      name
      username
    }
    doctor{
      id
      name
      username
    }
    }
  }
`;

const useCreateConsultation = () => {
  const [createConsultation, { loading, error }] = useMutation(CREATE_CONSULTATION);

  const createConsultationHandler = async (data) => {
    const response = await createConsultation({ variables: { data } });
    if (error) {
      console.error(error); // Handle errors appropriately
      return;
    }
    return response.data.createConsultation; // Return the created consultation data
  };

  return [createConsultationHandler, loading, error];
};

export default useCreateConsultation;
