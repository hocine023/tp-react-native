import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
  onPress?: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }: ProductCardProps) => {
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const handleAddToCart = (): void => {
    setIsAdded(true);
    Alert.alert("Succès", `${product.name} a été ajouté au panier`, [
      { text: "OK", style: "default" },
    ]);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: product.image }} style={styles.productImage} />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.info}>Catégorie : {product.category}</Text>
        <Text style={styles.info}>Prix : {product.price.toFixed(2)} €</Text>
        <Text style={styles.stock}>
          Stock : {product.inStock ? "Disponible" : "Rupture"}
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
            {isAdded ? "Ajouté" : "Ajouter"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 8,
    padding: 10,
    borderRadius: 12,
    shadowColor: "#000",
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
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 6,
  },
  info: {
    fontSize: 14,
    marginBottom: 4,
  },
  stock: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#2e7d32",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    width: 110,
  },
  buttonDisabled: {
    backgroundColor: "#9e9e9e",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProductCard;
