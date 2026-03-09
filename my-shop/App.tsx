muuy
maso_hep
Invisible

hocineak2 — 14:34
vous avez composé des groupes ou pas encore ?
Nassim D.

 — 14:37
oui dsl. il fallais etre la bisou
hhhh non azy on va faire les groupes la
hocineak2 — 14:38
touché touché mdrrrr
Nassim D.

 — 14:43
tes avec Monica, Anass et David @hocineak2
hocineak2 — 14:44
d'accord merci @Nassim D.
Monica RADIFERA — 14:57
monicaradifera@gmail.com
David — 14:58
davidtino87
Nass — 14:58
anass.houdzi@gmail.com
hocineak2 — 15:20
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  inStock: boolean;
  category: string;
}


types/product.ts
types/navigation.ts

import { Product } from './product';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { product: Product };
};
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Product } from '../types/product';

type ProductCardProps = {
  product: Product;
  onPress?: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const handleAddToCart = (): void => {
    setIsAdded(true);
    Alert.alert(
      'Succès',
      `${product.name} a été ajouté au panier`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: product.image }} style={styles.productImage} />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.info}>Catégorie : {product.category}</Text>
        <Text style={styles.info}>Prix : {product.price.toFixed(2)} €</Text>
        <Text style={styles.stock}>
          Stock : {product.inStock ? 'Disponible' : 'Rupture'}
        </Text>

        <TouchableOpacity
          style={[
            styles.button,
            (!product.inStock || isAdded) && styles.buttonDisabled,
          ]}
          onPress={handleAddToCart}
          disabled={!product.inStock || isAdded}
        >
          <Text style={styles.buttonText}>
            {isAdded ? 'Ajouté' : 'Ajouter'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
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
... (12lignes restantes)

ProductCard.tsx
3 Ko
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  ListRenderItem,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products';
import { Product } from '../types/product';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductList'>;

const ProductListScreen: React.FC<Props> = ({ navigation }) => {
  const [products] = useState<Product[]>(productsData);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts: Product[] = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductPress = (product: Product): void => {
    navigation.navigate('ProductDetail', { product });
  };

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => handleProductPress(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Shop Pharmacie</Text>
        <Text style={styles.headerSubtitle}>
          {filteredProducts.length} produits disponibles
        </Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un produit..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f8f6',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: '#666',
    marginBottom: 14,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  listContent: {
    paddingBottom: 20,
  },
});
... (2lignes restantes)

ProductListScreen.tsx
3 Ko
import React from 'react';
import {
  ScrollView,
  Text,
  Image,
  StyleSheet,

ProductDetailScreen.tsx
3 Ko
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import { RootStackParamList } from './types/navigation';

App.tsx
1 Ko
hocineak2 — 15:29
import { Product } from '../types/product';

const products: Product[] = [
  {
    id: '1',
    name: 'Paracétamol 500 mg',

products.ts
3 Ko
﻿
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import { RootStackParamList } from './types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={{ title: 'My Shop' }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ title: 'DÃ©tail du produit' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
App.tsx
1 Ko