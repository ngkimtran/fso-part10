import { useLazyQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (variables) => {
  const [query, { data, loading, fetchMore, ...result }] = useLazyQuery(
    GET_REPOSITORY,
    {
      fetchPolicy: 'cache-and-network',
    },
    {
      onError: (error) => {
        console.log(error.graphQLErrors[0].message);
      },
    }
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const getRepository = async () => {
    try {
      await query({ variables });
    } catch (e) {
      console.log(e);
    }
  };

  return {
    repository: data ? data.repository : undefined,
    getRepository,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepository;
