import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Button, Text, AsyncStorage} from 'react-native';
import {graphql} from 'react-apollo';

import {LOGIN} from "../queries";

const LoginScreen = (props) => {
  const [newUser, setNewUser] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [err, setError] = useState('');

  const submit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    let res;
    try {
      res = await props.mutate({
        variables: {password: newUser.password, email: newUser.email}
      });
    } catch (e) {
      setError('Already taken');
    }
    const {payload, error} = await res.data.login;
    if (payload) {
      await AsyncStorage.setItem('@ecommerce/token', payload.token);
      await  props.navigation.navigate('Main');
      setNewUser({
        email: '',
        password: ''
      });
    } else {
      setError(error.msg);
    }
    setIsSubmitting(false);
  };

  const onChangeText = (key, value) => {
    setNewUser({...newUser, [key]: value})
  };

  const {password, email} = newUser;

  return (
    <View style={styles.center}>
      {err !== '' ? <Text style={{color: 'red'}}>{err}</Text> : null}
      <View style={{ width: 200 }}>
        <TextInput
          onChangeText={text => onChangeText('email', text)}
          placeholder="email"
          value={email}
          style={styles.field}
          autoCapitalize="none"
        />
        <TextInput
          onChangeText={text => onChangeText('password', text)}
          placeholder="password"
          value={password}
          style={styles.field}
          autoCapitalize="none"
          secureTextEntry
        />
        <Button title="Login" onPress={submit}/>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  field: {
    marginBottom: 20,
    borderBottomWidth: 1,
    fontSize: 20
  }
});

export default graphql(LOGIN)(LoginScreen);