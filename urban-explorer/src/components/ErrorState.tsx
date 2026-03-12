import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

type Props = {
  message: string;
  onRetry: () => void;
};

export const ErrorState: React.FC<Props> = ({ message, onRetry }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Oups</Text>
    <Text style={styles.message}>{message}</Text>
    <Button title="Réessayer" onPress={onRetry} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 16,
    alignItems: "center",
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  message: { textAlign: "center", color: "#666", marginBottom: 12 },
});