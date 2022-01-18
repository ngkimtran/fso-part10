import { useLazyQuery } from '@apollo/client';
import { GET_REVIEWS } from '../graphql/queries';

const useReviews = () => {
  const [query, result] = useLazyQuery(GET_REVIEWS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const getReviews = async ({ repositoryId }) => {
    const { data } = await query({ variables: { repositoryId } });
    return { data };
  };

  return [getReviews, result];
};

export default useReviews;
