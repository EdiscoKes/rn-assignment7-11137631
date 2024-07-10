import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ProductDetailScreen from './ProductDetailScreen';
import CartScreen from './CartScreen';
import CustomDrawerContent from './CustomDrawerContent';
import { SafeAreaView, View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />}>
     <Drawer.Screen name="Edward Sefah" component={HomeScreen} options={{ drawerLabelStyle: {  fontSize:20,
    fontWeight: '200',
    fontFamily: 'monospace', padding:-20,marginBottom:-10,color:"black"} }} />
      <Drawer.Screen name="line" component={HomeScreen} options={{ drawerLabelStyle: {  height: 1,
    width: '32%',
    backgroundColor: 'red',
    left:20,  } }} />
     
    <Drawer.Screen name="Home" component={HomeScreen} options={{ drawerLabelStyle: { color: 'black' } }} />
    <Drawer.Screen name="Cart" component={CartScreen} options={{ drawerLabelStyle: { color: 'black' } }} />
    <Drawer.Screen name="Store" component={HomeScreen} options={{ drawerLabelStyle: { color: 'black' } }} />
    <Drawer.Screen name="Location" component={HomeScreen} options={{ drawerLabelStyle: { color: 'black' } }} />
    <Drawer.Screen name="Blog" component={HomeScreen} options={{ drawerLabelStyle: { color: 'black' } }} />
    <Drawer.Screen name="Jewelry" component={HomeScreen} options={{ drawerLabelStyle: { color: 'black' } }} />
    <Drawer.Screen name="Electronic" component={HomeScreen} options={{ drawerLabelStyle: { color: 'black' } }} />
    <Drawer.Screen name="Clothing" component={HomeScreen} options={{ drawerLabelStyle: { color: 'black' } }} />
  </Drawer.Navigator>
);

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Drawer">
      <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
