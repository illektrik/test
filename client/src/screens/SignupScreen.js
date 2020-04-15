import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Button, Text, AsyncStorage} from 'react-native';
import {graphql} from 'react-apollo';

import {SIGN_UP} from "../queries";

const SignupScreen = (props) => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    let res;
    try {
        res = await props.mutate({
        variables: {name: newUser.name, password: newUser.password, email: newUser.email}
      });
    } catch (e) {
      setError('Already taken');
    }
    await AsyncStorage.setItem('@ecommerce/token', res.data.signup.token);
    setNewUser({
      name: '',
      email: '',
      password: ''
    });
    props.navigation.navigate('Main');
    setIsSubmitting(false);
  };

  const onChangeText = (key, value) => {
    setNewUser({...newUser, [key]: value})
  };

  const {name, password, email} = newUser;

  return (
    <View style={styles.center}>
      <View style={{ width: 200 }}>
        <TextInput
          onChangeText={text => onChangeText('name', text)}
          placeholder="name"
          value={name}
          style={styles.field}
          autoCapitalize="none"
        />
        {error !== '' ? <Text style={{color: 'red'}}>{error}</Text> : null}
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
        <Button title="Create account" onPress={submit}/>
        <Button title="Login" onPress={() => { props.navigation.navigate('Login') }}/>
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

export default graphql(SIGN_UP)(SignupScreen);