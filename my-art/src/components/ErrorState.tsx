import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oups</Text>
      <Text style={styles.message}>{message}</Text>
      <Button title="Réessayer" onPress={onRetry} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  message: {
    fontSize: 15,
    textAlign: "center",
    color: "#666",
    marginBottom: 14,
  },
});