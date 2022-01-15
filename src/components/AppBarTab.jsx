import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.body,
    marginLeft: 12,
  },
});

const AppBarTab = ({ text, link }) => {
  return (
    <Pressable>
      <Link to={link}>
        <Text style={styles.text}>{text}</Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
