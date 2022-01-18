import { useLazyQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = () => {
  const [query, result] = useLazyQuery(GET_REPOSITORY, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const getRepository = async ({ repositoryId }) => {
    const { data } = await query({ variables: { repositoryId } });
    return { data };
  };

  return [getRepository, result];
};

export default useRepository;
