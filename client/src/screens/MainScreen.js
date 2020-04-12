import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const MainScreen = ({navigation}) => {
  const goToAccount = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.center}>
      <Text>MainScreen</Text>
      <Button title="Go To Signup" onPress={goToAccount} />
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

export default MainScreen;