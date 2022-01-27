import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-native';
import { FlatList, View, StyleSheet, Pressable, Alert } from 'react-native';
import theme from '../theme';
import Text from './Text';
import useUserReviews from '../hooks/useUserReviews';
import { format } from 'date-fns';
import { DELETE_REVIEW } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 8,
    paddingLeft: 5,
    paddingRight: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    width: '45%',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 3,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 4,
    marginBottom: 40,
    borderRadius: 50 / 2,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.colors.primary,
  },
  headings: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  intro: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
    flex: 1,
  },
  name: {
    marginBottom: 5,
  },
  date: {
    marginBottom: 7,
  },
  description: {
    padding: 5,
    alignSelf: 'flex-start',
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.background,
  },
  repository: {
    marginBottom: 10,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, navigate, onDelete }) => {
  const handleDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Delete', onPress: () => onDelete(review.id) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headings}>
        <View style={styles.tinyLogo} fontSize='subheading' fontWeight='bold'>
          <Text style={styles.text} fontSize='subheading' fontWeight='bold'>
            {review.rating}
          </Text>
        </View>
        <View style={styles.intro}>
          <Text style={styles.name} fontSize='subheading' fontWeight='bold'>
            {review.repository.fullName}
          </Text>
          <Text style={styles.date} color='textSecondary'>
            {format(new Date(review.createdAt), 'dd.MM.yyyy')}
          </Text>
          <Text style={styles.description}>{review.text}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() =>
            navigate(`/repositories/${review.repository.id}`, { replace: true })
          }
        >
          <Text style={styles.buttonText} fontWeight='bold'>
            View repository
          </Text>
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText} fontWeight='bold'>
            Delete review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const UserReviews = () => {
  const [userReviews, setUserReviews] = useState();
  const navigate = useNavigate();
  const { user, refetch, fetchMore } = useUserReviews({
    includeReviews: true,
    first: 4,
  });
  const [deleteReview, result] = useMutation(DELETE_REVIEW);

  useEffect(() => {
    if (user) setUserReviews(user.reviews);
  }, [user]);

  useEffect(() => {
    if (result?.data?.deleteReview === true) {
      refetch();
    }
  }, [result.data]);

  const userReviewsNodes = userReviews
    ? userReviews.edges.map((edge) => edge.node)
    : [];

  const onDelete = async (id) => {
    await deleteReview({
      variables: { deleteReviewId: id },
    });
  };

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={userReviewsNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem navigate={navigate} review={item} onDelete={onDelete} />
      )}
      keyExtractor={({ id }) => id}
      onEndReachedThreshold={0.5}
      onEndReached={onEndReach}
    />
  );
};

export default UserReviews;
