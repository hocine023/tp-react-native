import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export const Loader: React.FC<{ text?: string }> = ({ text = "Chargement..." }) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 24, alignItems: "center", justifyContent: "center" },
  text: { marginTop: 10, fontSize: 15 },
});