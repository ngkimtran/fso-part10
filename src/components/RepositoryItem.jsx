import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 8,
    paddingLeft: 5,
    paddingRight: 10,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 4,
    marginBottom: 40,
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
  description: {
    marginBottom: 7,
  },
  language: {
    color: '#fff',
    borderRadius: 4,
    marginBottom: 5,
    padding: 5,
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
  },
  properties: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'space-evenly',
  },
  property: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  number: {
    marginBottom: 5,
  },
  text: {
    marginBottom: 7,
  },
});

const checkBigNumber = (number) =>
  number > 1000 ? (number / 1000).toFixed(1) + 'k' : number;

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headings}>
        <Image style={styles.tinyLogo} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.intro}>
          <Text style={styles.name} fontSize='subheading' fontWeight='bold'>
            {item.fullName}
          </Text>
          <Text style={styles.description} color='textSecondary'>
            {item.description}
          </Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>

      <View style={styles.properties}>
        <View style={styles.property}>
          <Text style={styles.number} fontSize='subheading' fontWeight='bold'>
            {checkBigNumber(item.stargazersCount)}
          </Text>
          <Text style={styles.text} color='textSecondary'>
            Stars
          </Text>
        </View>
        <View style={styles.property}>
          <Text style={styles.number} fontSize='subheading' fontWeight='bold'>
            {checkBigNumber(item.forksCount)}
          </Text>
          <Text style={styles.text} color='textSecondary'>
            Forks
          </Text>
        </View>
        <View style={styles.property}>
          <Text style={styles.number} fontSize='subheading' fontWeight='bold'>
            {checkBigNumber(item.reviewCount)}
          </Text>
          <Text style={styles.text} color='textSecondary'>
            Reviews
          </Text>
        </View>
        <View style={styles.property}>
          <Text style={styles.number} fontSize='subheading' fontWeight='bold'>
            {checkBigNumber(item.ratingAverage)}
          </Text>
          <Text style={styles.text} color='textSecondary'>
            Rating
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
