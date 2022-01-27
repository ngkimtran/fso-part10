import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';

const useUserReviews = (variables) => {
  const { data, loading, refetch, fetchMore, ...result } = useQuery(
    GET_USER,
    {
      variables,
      fetchPolicy: 'cache-and-network',
    },
    {
      onError: (error) => {
        console.log(error.graphQLErrors[0].message);
      },
    }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) return;
    fetchMore({
      variables: {
        after: data.me.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    user: data && data.me ? data.me : undefined,
    refetch,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useUserReviews;
