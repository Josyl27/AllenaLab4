import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';

export default function HomeScreen() {
  const { cart, addToCart, removeFromCart, getTotalItems, getTotalPrice } = useCart();

  const products = [
    { id: '1', name: 'Apple', price: 50, image: 'https://cdn-icons-png.flaticon.com/512/415/415733.png' },
    { id: '2', name: 'Banana', price: 30, image: 'https://cdn-icons-png.flaticon.com/128/2909/2909761.png' },
    { id: '3', name: 'Orange', price: 40, image: 'https://cdn-icons-png.flaticon.com/128/6866/6866499.png' },
    { id: '4', name: 'Grapes', price: 60, image: 'https://cdn-icons-png.flaticon.com/128/1412/1412542.png' },
    { id: '5', name: 'Mango', price: 55, image: 'https://cdn-icons-png.flaticon.com/128/13523/13523334.png' },
    { id: '6', name: 'Watermelon', price: 80, image: 'https://cdn-icons-png.flaticon.com/128/5582/5582664.png' },
  ];

  return (
    <View style={styles.container}>
      {/* Cart Summary */}
      <View style={styles.cartBox}>
        <Text style={styles.cartText}>🛒 Items: {getTotalItems()}</Text>
        <Text style={styles.cartText}>💰 Total: ₱{getTotalPrice()}</Text>
      </View>

      {/* Product Grid */}
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={item => item.id}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>₱{item.price}</Text>

            <View style={styles.buttons}>
              <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item)}>
                <Text style={styles.btnText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.removeBtn} onPress={() => removeFromCart(item.id)}>
                <Text style={styles.btnText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Cart Items Section */}
      <View style={styles.cartList}>
        <Text style={styles.cartTitle}>🧺 Cart Items</Text>
        {cart.length === 0 ? (
          <Text style={styles.emptyCart}>Your cart is empty</Text>
        ) : (
          cart.map(item => (
            <Text key={item.id} style={styles.cartItem}>
              {item.name} x {item.quantity} = ₱{item.price * item.quantity}
            </Text>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fefcfb', padding: 15 },

  // Cart Summary
  cartBox: {
    backgroundColor: '#fceabb',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  cartText: { fontSize: 18, fontWeight: '600', color: '#333' },

  // Product Grid
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 4,
  },
  image: { width: 80, height: 80, marginBottom: 10 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#444' },
  price: { fontSize: 15, color: '#666', marginBottom: 10 },

  buttons: { flexDirection: 'row', gap: 8 },
  addBtn: {
    backgroundColor: '#6dcf5e',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  removeBtn: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  btnText: { color: '#fff', fontWeight: '600' },

  // Cart Items
  cartList: { marginTop: 20 },
  cartTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  cartItem: { fontSize: 16, textAlign: 'center', marginVertical: 2, color: '#333' },
  emptyCart: { textAlign: 'center', color: '#aaa', fontStyle: 'italic' },
});
