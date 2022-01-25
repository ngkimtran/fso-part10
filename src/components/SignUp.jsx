import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import theme from '../theme';
import useSignUp from '../hooks/useSignUp.js';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
  },

  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
});

const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Too short!')
    .max(30, 'Too long!')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Too short!')
    .max(50, 'Too long!')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .equals([yup.ref('password')], "Password don't match")
    .required('Password confirmation is required'),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput name='password' placeholder='Password' secureTextEntry />
      <FormikTextInput
        name='confirmPassword'
        placeholder='Password confirmation'
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText} fontWeight='bold'>
          Sign Up
        </Text>
      </Pressable>
    </View>
  );
};

export const SignUpContainer = ({ signUp }) => {
  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signUp({ username, password });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  return <SignUpContainer signUp={signUp} />;
};

export default SignUp;
