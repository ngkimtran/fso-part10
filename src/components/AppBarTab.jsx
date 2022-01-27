import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { Link } from 'react-router-native';
import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.body,
    marginLeft: 12,
    marginRight: 20,
  },
});

const AppBarTab = (props) => {
  return (
    <Pressable>
      {props.link ? (
        <Link to={props.link}>
          <Text style={styles.text}>{props.text}</Text>
        </Link>
      ) : (
        <Pressable onPress={props.onPress}>
          <Text style={styles.text}>{props.text}</Text>
        </Pressable>
      )}
    </Pressable>
  );
};

export default AppBarTab;
