










import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { FontAwesome,MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;

  const addToCart = async (product) => {
    try {
      const savedCart = await AsyncStorage.getItem('cart');
      const cart = savedCart ? JSON.parse(savedCart) : [];
      const updatedCart = [...cart, product];
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container1}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesome name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
            <Image source={require("./assets/Logo.png")} />
            <View style={styles.farRight}>
              <Image source={require("./assets/Search.png")} />
              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <FontAwesome name="shopping-bag" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <Image source={{ uri: product.image }} style={styles.image} resizeMode='cover' />

          <View style={styles.belowImage}>
            <Text style={styles.story}>
              {product.title}
            </Text>
            <Image source={require('./assets/Export.png')} />
          </View>

          <Text style={styles.about}>
            {product.description}
          </Text>

          <Text style={styles.price}>
            ${product.price}
          </Text>

          <Text style={styles.materials}>
            MATERIALS
          </Text>

          <Text style={styles.about}>
            We work with monitoring programmes to ensure compliance with safety, health and quality standards for our products.
          </Text>

          <View style={styles.warnings}>
            <View style={styles.warning}>
              <Image source={require('./assets/DoNotBleach.png')} style={styles.image2} />
              <Text style={styles.warningText}>
                Do not use bleach
              </Text>
            </View>

            <View style={styles.warning}>
              <Image source={require('./assets/donotTumbleDry.png')} style={styles.image2} />
              <Text style={styles.warningText}>
                Do not tumble dry
              </Text>
            </View>

            <View style={styles.warning}>
              <Image source={require('./assets/DoNotWash.png')} style={styles.image2} />
              <Text style={styles.warningText}>
                Dry clean with tetrachloroethane
              </Text>
            </View>

            <View style={styles.warning}>
              <Image source={require('./assets/IronLowTemperature.png')} style={styles.image2} />
              <Text style={styles.warningText}>
                Iron at a max of 110°C/230°F
              </Text>
            </View>
          </View>

          <View style={styles.line}></View>

          <View style={styles.delivery}>
            <View style={styles.delivery1}>
              <Image source={require('./assets/Shipping.png')} style={styles.car} />
              <View>
                <Text style={styles.free}>
                  Free Flat rate Shipping
                </Text>
                <Text style={styles.free1}>
                  estimated to be delivered on
                </Text>
                <Text style={styles.free1}>
                  09/11/2024 - 09/12/2030
                </Text>
              </View>
            </View>
            <Image source={require('./assets/Up.png')} />
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(product)}>
              <View style={styles.add}>
                <Image source={require("./assets/Plus.png") } style={{color:"white"}} />
                   <TouchableOpacity onPress={() => navigation.navigate('Cart')}><FontAwesome name="plus" size={24} color="white" /></TouchableOpacity>
                <Text style={styles.basket}>
                  ADD TO BASKET
                </Text>
              </View>
            </TouchableOpacity>
            <Image source={require("./assets/Heart.png")} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  container1: {
    flex: 1,
    backgroundColor: '#fff',
    marginLeft: 12,
    marginRight: 12,
    marginTop: 70,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  bag: {
    marginLeft: 20
  },
  farRight: {
    flexDirection: "row",
  },
  image: {
    width: '100%',
    height: 500,
  },
  belowImage: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  story: {
    fontFamily: 'monospace',
    fontSize: 25,
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  materials: {
    fontFamily: 'monospace',
    fontSize: 22,
    marginBottom: 15,
  },
  about: {
    fontWeight: '200',
    fontSize: 16,
  },
  price: {
    fontSize: 24,
    fontFamily: 'monospace',
    color: 'tomato',
    marginBottom: 30
  },
  warnings: {
    marginTop: 30,
    marginBottom: 20
  },
  warning: {
    flexDirection: 'row',
    marginBottom: 19
  },
  warningText: {
    marginLeft: 25,
    fontWeight: '200',
    fontSize: 16,
  },
  line: {
    width: '80%',
    height: 1,
    backgroundColor: '#D3D3D3',
    marginBottom: 30
  },
  delivery: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 250
  },
  delivery1: {
    flexDirection: 'row',
  },
  car: {
    marginRight: 20
  },
  free: {
    fontWeight: '400',
    fontSize: 16,
    marginBottom: 7
  },
  free1: {
    fontWeight: '200',
    fontSize: 16,
    marginBottom: 7
  },
  footer: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  add: {
    flexDirection: 'row',
    color:"white"
  },
  addButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  basket: {
    fontSize: 20,
    marginLeft: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  image2: {
    width: 24,
    height: 24,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  }
});

export default ProductDetailScreen;

