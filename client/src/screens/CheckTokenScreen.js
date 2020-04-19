import React, {useEffect} from 'react';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';
import {graphql} from 'react-apollo';

import {REFRESH_TOKEN} from "../queries";

const CheckTokenScreen = (props) => {
  useEffect( () => {
    const action = async () => {
      const token = await AsyncStorage.getItem('@ecommerce/token');
      if (!token) {
        props.navigation.navigate('Signup');
        return
      }
      let response;
      try {
        response = await props.mutate();
        console.log(response);
      } catch (err) {
        props.navigation.navigate('Signup');
        return
      }
      const {refreshToken} = response.data;
      await AsyncStorage.setItem('@ecommerce/token', refreshToken);
      props.navigation.navigate('Main');
    };
    action();
  }, []);
  return (
    <View style={styles.center}>
      <Text>Loading...</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default graphql(REFRESH_TOKEN)(CheckTokenScreen);