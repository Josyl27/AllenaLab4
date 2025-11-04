import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useCart } from '../context/CartContext';
import CartButton from '../components/CartButton';

export default function HomeScreen() {
  const { cart, addToCart, removeFromCart, getTotalItems, getTotalPrice } = useCart();

  const products = [
    { id: '1', name: 'Apple', price: 50 },
    { id: '2', name: 'Banana', price: 30 },
    { id: '3', name: 'Orange', price: 40 },
  ];

  return (
    <View style={styles.container}>

      {/* Centered Cart Summary Box */}
      <View style={styles.cartBox}>
        <Text style={styles.cartText}>🛒 Total Items: {getTotalItems()}</Text>
        <Text style={styles.cartText}>💰 Total Price: ₱{getTotalPrice()}</Text>
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        contentContainerStyle={{ alignItems: 'center' }} // center all items
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Text style={styles.productText}>{item.name} - ₱{item.price}</Text>
            <CartButton label="Add to Cart" onPress={() => addToCart(item)} />
            <CartButton label="Remove" onPress={() => removeFromCart(item.id)} />
          </View>
        )}
      />

      {/* Cart Items */}
      <Text style={styles.cartTitle}>Cart Items:</Text>
      {cart.map(item => (
        <Text key={item.id} style={styles.cartItem}>
          {item.name} x {item.quantity} = ₱{item.price * item.quantity}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },

  cartBox: {
    backgroundColor: '#ffe4b5',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  cartText: { fontSize: 18, fontWeight: 'bold', marginVertical: 2 },

  product: {
    marginBottom: 15,
    alignItems: 'center', // center text and buttons
  },
  productText: { fontSize: 16, marginBottom: 5, textAlign: 'center' },

  cartTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center' },
  cartItem: { fontSize: 16, textAlign: 'center', marginVertical: 2 },
});
