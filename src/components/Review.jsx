import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import theme from '../theme';
import useCreateAReview from '../hooks/useCreateAReview.js';

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
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository's owener is required"),
  repositoryName: yup.string().required("Repository's name is required"),
  rating: yup.number().min(0).max(100).required('Rating is required'),
  text: yup.string().optional(),
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name='ownerName' placeholder='Repository owner name' />
      <FormikTextInput name='repositoryName' placeholder='Repository name' />
      <FormikTextInput
        keyboardType='numeric'
        name='rating'
        placeholder='Rating between 0 and 100'
      />
      <FormikTextInput name='text' placeholder='Review' multiline />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText} fontWeight='bold'>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export const ReviewContainer = ({ createAReview }) => {
  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      await createAReview({
        ownerName,
        repositoryName,
        rating: parseInt(rating),
        text,
      });
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
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const Review = () => {
  const [createAReview] = useCreateAReview();

  return <ReviewContainer createAReview={createAReview} />;
};

export default Review;
