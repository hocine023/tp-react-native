import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DetailScreen } from "../screens/DetailScreen";
import { DiscoveryScreen } from "../screens/DiscoveryScreen";
import { RootDiscoveryStackParamList } from "../types";

const Stack = createNativeStackNavigator<RootDiscoveryStackParamList>();

export const DiscoveryStack: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="DiscoveryList"
      component={DiscoveryScreen}
      options={{ title: "Découverte" }}
    />
    <Stack.Screen
      name="Detail"
      component={DetailScreen}
      options={{ title: "Détail du lieu" }}
    />
  </Stack.Navigator>
);