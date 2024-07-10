import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts();
    loadCart();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

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

  const addToCart = async (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
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
        <View style={styles.headerIcons}>
          <TouchableOpacity><Ionicons name="search" size={24} color="black" /></TouchableOpacity>
        </View>
        <View style={{ marginLeft: -50 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <FontAwesome name="shopping-bag" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.storySection}>
        <Text style={styles.story}>OUR STORY</Text>
        <View style={styles.buttons}>
          <TouchableOpacity><Ionicons name="list" size={30} color="black" /></TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity><MaterialIcons name="filter-list" size={30} color="#FF8C00" /></TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <TouchableOpacity onPress={() => addToCart(item)} style={styles.addButton}>
              <FontAwesome name="plus-circle" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
              <Text style={styles.productTitle}>{item.title}</Text>
            </TouchableOpacity>
            <Text style={styles.subtitle}>{item.description}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        )}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, marginTop: 40, backgroundColor: "white" },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  headerIcons: { flexDirection: 'row' },
  storySection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 },
  story: { fontSize: 18, fontSize: 25 },
  buttons: { flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: "#D3D3D3", borderRadius: 20 },
  button: { marginLeft: -100, backgroundColor: "#D3D3D3", borderRadius: 20 },
  card: { flex: 1, margin: 10, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 10, alignItems: 'center' },
  image: { width: 150, height: 200, borderRadius: 10 },
  productTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginLeft: -40 },
  subtitle: { fontSize: 14, color: '#666' },
  price: { fontSize: 16, fontWeight: 'bold', marginVertical: 10, color: "#FF8C00" },
  addButton: { position: 'absolute', top: 150, right: 5, padding: 10, borderRadius: 50 },
});

export default HomeScreen;
