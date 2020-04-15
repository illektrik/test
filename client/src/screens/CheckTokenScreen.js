import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CheckTokenScreen = () => {
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

export default CheckTokenScreen;