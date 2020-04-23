import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {Button} from 'react-native';

import MainScreen from "../screens/MainScreen";
import AccountScreen from "../screens/AccountScreen";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";
import CheckTokenScreen from "../screens/CheckTokenScreen";
import NewProductScreen from "../screens/NewProductScreen";
import ProductsScreen from "../screens/ProductsScreen";
import AppHeaderIcon from "../components/AppHeaderIcon";
import {createDrawerNavigator} from "@react-navigation/drawer";

const Stack = createStackNavigator();
const StackNavigation = (props) => (
  <Stack.Navigator initialRouteName="CheckToken">
    <Stack.Screen
      name="Main"
      component={MainScreen}
      options={{
        title: 'Online Shop',
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon} title="Menu">
            <Item title="Menu" iconName="ios-menu" onPress={() => props.navigation.toggleDrawer()}/>
          </HeaderButtons>
        ),
        animationEnabled: false
      }}/>
    <Stack.Screen name="Account" component={AccountScreen}/>
    <Stack.Screen
      name="Signup"
      component={SignupScreen}
      options={
        {
          animationEnabled: false,
          headerLeft: () => null
        }}
    />
    <Stack.Screen name="Login" component={LoginScreen}/>
    <Stack.Screen
      name="CheckToken"
      component={CheckTokenScreen}
      options={
        {
          animationEnabled: false,
          headerLeft: () => null
        }}/>
    <Stack.Screen name="NewProduct" component={NewProductScreen} />
    <Stack.Screen name="Products" component={ProductsScreen} />
  </Stack.Navigator>
);

const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Main" component={StackNavigation} />
    </Drawer.Navigator>
  )
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  )
};

export default AppNavigation;