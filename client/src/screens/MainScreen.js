import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const MainScreen = ({navigation}) => {
  const goToAccount = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.center}>
      <View style={styles.products}>
        <Button title="Products" onPress={() => navigation.navigate('Products')}/>
        <Button title="Create product" onPress={() => navigation.navigate('NewProduct')}/>
      </View>
      <Button title="Go To Signup" onPress={goToAccount} />
    </View>
  )
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  products: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MainScreen;