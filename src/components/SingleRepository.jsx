import React, { useEffect, useState } from 'react';
import RepositoryItem from './RepositoryItem';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useParams } from 'react-router-native';
import theme from '../theme';
import Text from './Text';
import useRepository from '../hooks/useRepository';
import useReviews from '../hooks/useReviews';
import * as Linking from 'expo-linking';
import { format } from 'date-fns';

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
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  const repositoryStyles = [styles.container, styles.repository];
  return (
    <View style={repositoryStyles}>
      {repository && (
        <>
          <RepositoryItem item={repository} />
          <Pressable
            style={styles.button}
            onPress={() => Linking.openURL(repository.url)}
          >
            <Text style={styles.buttonText} fontWeight='bold'>
              Open in Github
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
};
const ReviewItem = ({ review }) => {
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
            {review.user.username}
          </Text>
          <Text style={styles.date} color='textSecondary'>
            {format(new Date(review.createdAt), 'dd.mm.yyyy')}
          </Text>
          <Text style={styles.description}>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const [getRepository] = useRepository();
  const [getReviews] = useReviews();
  const [repository, setRepository] = useState();
  const [reviews, setReviews] = useState();

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        const { data } = await getRepository({ repositoryId: id });
        if (data) setRepository(data.repository);
      } catch (e) {
        console.log(e);
      }
    };
    const fetchReviews = async () => {
      try {
        const { data } = await getReviews({ repositoryId: id });
        if (data) setReviews(data.repository.reviews);
      } catch (e) {
        console.log(e);
      }
    };

    fetchRepository();
    fetchReviews();
  }, [id, repository, reviews]);

  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      // ...
    />
  );
};

export default SingleRepository;
