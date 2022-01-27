import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import { GET_USER } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    paddingTop: 40,
    paddingBottom: 20,
    paddingLeft: 10,
    display: 'flex',
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const [user, setUser] = useState(null);
  const { data } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data && data.me) setUser(data);
  }, [data]);

  const handleSignOut = async () => {
    try {
      setUser(null);
      await authStorage.removeAccessToken();
      apolloClient.resetStore();

      navigate('/', { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text='Repositories' link='/' />
        {!user ? (
          <>
            <AppBarTab text='Sign in' link='/signin' />
            <AppBarTab text='Sign up' link='/signup' />
          </>
        ) : (
          <>
            <AppBarTab text='Create a review' link='/createareview' />
            <AppBarTab text='My reviews' link='/userreviews' />
            <AppBarTab text='Sign out' onPress={handleSignOut} />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
