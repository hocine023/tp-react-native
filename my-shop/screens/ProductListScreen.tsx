import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  ListRenderItem,
  SafeAreaView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ProductCard from "../components/ProductCard";
import productsData from "../data/products";
import { Product } from "../types/product";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "ProductList">;

const ProductListScreen: React.FC<Props> = ({ navigation }: Props) => {
  const [products] = useState<Product[]>(productsData);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProducts: Product[] = products.filter((product: Product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleProductPress = (product: Product): void => {
    navigation.navigate("ProductDetail", { product });
  };

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <ProductCard product={item} onPress={() => handleProductPress(item)} />
  );

  return (
    <View style={styles.container}>
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
        keyExtractor={(item: Product) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f8f6",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#666",
    marginBottom: 14,
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default ProductListScreen;
