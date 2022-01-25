import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';

const useCreateAReview = () => {
  const navigate = useNavigate();

  const [mutate, result] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const createAReview = async ({ ownerName, repositoryName, rating, text }) => {
    const { data } = await mutate({
      variables: { repositoryName, ownerName, rating, text },
    });

    navigate(`/repositories/${data.createReview.repositoryId}`, {
      replace: true,
    });
    return data;
  };

  return [createAReview, result];
};

export default useCreateAReview;
