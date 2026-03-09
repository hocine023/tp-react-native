import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductListScreen from "./screens/ProductListScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import { RootStackParamList } from "./types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={{ title: "My Shop" }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ title: "Détail du produit" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
