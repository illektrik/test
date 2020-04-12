import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AccountScreen = () => {
  return (
    <View style={styles.center}>
      <Text>AccountScreen</Text>
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

export default AccountScreen;