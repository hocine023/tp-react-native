import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DiscoveryStack } from "./DiscoveryStack";
import { MapScreen } from "../screens/MapScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { RootTabParamList } from "../types";

const Tab = createBottomTabNavigator<RootTabParamList>();

export const AppTabs: React.FC = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="DiscoveryTab"
      component={DiscoveryStack}
      options={{ title: "Découverte", headerShown: false }}
    />
    <Tab.Screen name="Map" component={MapScreen} options={{ title: "Carte" }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Mon Profil" }} />
  </Tab.Navigator>
);