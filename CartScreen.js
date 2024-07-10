


import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const CartScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotal = () => {
    const total = cart.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0; // Ensure price is a number
      return sum + price;
    }, 0);
    return total.toFixed(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>
        <View>
          <Image style={styles.logo} source={require('./assets/Logo.png')} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>CHECKOUT</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeIcon}>
              <FontAwesome name="times-circle" size={24} color="#FF8C00" />
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.totalLabel}>EST. Total</Text>
        <Text style={styles.totalAmount}>${getTotal()}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}><FontAwesome name="shopping-bag" size={30} color="white" /> CHECKOUT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, marginTop: 30, backgroundColor: "white" },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  logo: { marginLeft: 140 },
  subtitle: { fontSize: 30, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#000', textAlign: 'center' },
  cartItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  image: { width: 150, height: 180, borderRadius: 10 },
  details: { flex: 1, marginHorizontal: 10 },
  productTitle: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: '#FF8C00' },
  removeIcon: { padding: 5 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 0, borderTopWidth: 1, borderTopColor: '#ddd' },
  totalLabel: { fontSize: 30, color: "gray" },
  totalAmount: { fontSize: 30, color: "#FF8C00" },
  checkoutButton: { backgroundColor: '#000', padding: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 30 },
  checkoutButtonText: { color: '#fff', fontSize: 25 },
});

export default CartScreen;

