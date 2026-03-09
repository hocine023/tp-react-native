import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

interface Props {
  route: ProductDetailRouteProp;
}

const ProductDetailScreen: React.FC<Props> = ({ route }) => {
  const { product } = route.params;
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const handleCartAction = (): void => {
    if (!isAdded) {
      setIsAdded(true);
      Alert.alert(
        'Succès',
        `${product.name} a été ajouté au panier`,
        [{ text: 'OK', style: 'default' }]
      );
    } else {
      setIsAdded(false);
      Alert.alert(
        'Information',
        `${product.name} a été retiré du panier`,
        [{ text: 'OK', style: 'default' }]
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.category}>Catégorie : {product.category}</Text>
      <Text style={styles.price}>Prix : {product.price.toFixed(2)} €</Text>
      <Text style={styles.stock}>
        {product.inStock ? 'Disponible en stock' : 'Rupture de stock'}
      </Text>
      <Text style={styles.descriptionTitle}>Description</Text>
      <Text style={styles.description}>{product.description}</Text>

      <TouchableOpacity
        style={[
          styles.button,
          !product.inStock && styles.buttonDisabled,
          isAdded && styles.removeButton,
        ]}
        onPress={handleCartAction}
        disabled={!product.inStock}
      >
        <Text style={styles.buttonText}>
          {isAdded ? 'Retirer du panier' : 'Ajouter au panier'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  image: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    marginBottom: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 6,
  },
  stock: {
    fontSize: 15,
    marginBottom: 16,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
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
    fontSize: 16,
  },
});

export default ProductDetailScreen;