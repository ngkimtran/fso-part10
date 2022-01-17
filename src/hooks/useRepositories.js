import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });
  const [repositories, setRepositories] = useState();

  useEffect(() => {
    try {
      if (data) setRepositories(data.repositories);
    } catch (e) {
      console.log(error);
    }
  }, [data]);

  return { repositories, loading };
};

export default useRepositories;
