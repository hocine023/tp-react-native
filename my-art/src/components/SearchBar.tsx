import React, { useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";

type SearchBarProps = {
  onSearch: (text: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (text: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onSearch(text);
    }, 500);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Rechercher une œuvre..."
        onChangeText={handleChange}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
});