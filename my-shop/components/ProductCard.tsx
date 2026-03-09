import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Product } from '../types/product';

type ProductCardProps = {
  product: Product;
  onPress?: () => void;
  onAddToCart?: () => void;
  onRemoveFromCart?: () => void;
  isInCart?: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
  onRemoveFromCart,
  isInCart = false,
}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.content} onPress={onPress} activeOpacity={0.8}>
        <Image source={{ uri: product.image }} style={styles.productImage} />

        <View style={styles.textContainer}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.info}>Catégorie : {product.category}</Text>
          <Text style={styles.info}>Prix : {product.price.toFixed(2)} €</Text>
          <Text style={styles.stock}>
            Stock : {product.inStock ? 'Disponible' : 'Rupture'}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          !product.inStock && styles.buttonDisabled,
          isInCart && styles.removeButton,
        ]}
        onPress={isInCart ? onRemoveFromCart : onAddToCart}
        disabled={!product.inStock}
      >
        <Text style={styles.buttonText}>
          {isInCart ? 'Retirer' : 'Ajouter'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 8,
    padding: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  content: {
    flexDirection: 'row',
  },
  productImage: {
    width: 90,
    height: 110,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  info: {
    fontSize: 14,
    marginBottom: 4,
  },
  stock: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#2e7d32',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    width: 110,
    marginTop: 10,
    marginLeft: 105,
  },
  removeButton: {
    backgroundColor: '#c62828',
  },
  buttonDisabled: {
    backgroundColor: '#9e9e9e',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductCard;