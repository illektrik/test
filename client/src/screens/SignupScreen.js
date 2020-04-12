import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';

const SignupScreen = () => {
  const [newUser, setNewUser] = useState({
    values: {
      name: '',
      email: '',
      password: ''
    },
    errors: {},
    isSubmiting: false
  });

  const submit = () => {

  };

  const {name, email, password} = newUser;

  return (
    <View style={styles.center}>
      <View style={{ width: 200 }}>
        <TextInput placeholder="name" value={name} style={styles.field}/>
        <TextInput placeholder="email" value={email} style={styles.field}/>
        <TextInput placeholder="password" value={password} style={styles.field}/>
        <Button title="Create account" onPress={submit}/>
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

export default SignupScreen;