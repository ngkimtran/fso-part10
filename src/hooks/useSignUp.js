import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../graphql/mutations';
import useSignIn from './useSignIn';

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });
  const [signIn] = useSignIn();

  const signUp = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } });
    if (data) await signIn({ username, password });
    return data;
  };
  return [signUp, result];
};

export default useSignUp;
