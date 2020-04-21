import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MainScreen from "../screens/MainScreen";
import AccountScreen from "../screens/AccountScreen";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";
import CheckTokenScreen from "../screens/CheckTokenScreen";
import NewProductScreen from "../screens/NewProductScreen";
import ProductsScreen from "../screens/ProductsScreen";

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CheckToken">
        <Stack.Screen name="Main" component={MainScreen} options={{ title: 'Online Shop' }}/>
        <Stack.Screen name="Account" component={AccountScreen}/>
        <Stack.Screen name="Signup" component={SignupScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="CheckToken" component={CheckTokenScreen} />
        <Stack.Screen name="NewProduct" component={NewProductScreen} />
        <Stack.Screen name="Products" component={ProductsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default AppNavigation;