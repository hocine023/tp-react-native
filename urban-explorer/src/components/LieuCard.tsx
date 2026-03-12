import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Place } from "../types";
import { FadeInCard } from "./FadeInCard";
import { PulseButton } from "./PulseButton";

type Props = {
  place: Place;
  onPress: () => void;
};

export const LieuCard: React.FC<Props> = ({ place, onPress }) => (
  <FadeInCard style={styles.card}>
    <Image source={{ uri: place.imageUrl }} style={styles.image} />
    <View style={styles.content}>
      <Text style={styles.title}>{place.name}</Text>
      <Text style={styles.address}>{place.address}</Text>
      <PulseButton onPress={onPress}>
        <Text style={styles.buttonText}>Voir plus</Text>
      </PulseButton>
    </View>
  </FadeInCard>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#eee",
  },
  image: { width: "100%", height: 180 },
  content: { padding: 12 },
  title: { fontSize: 17, fontWeight: "700", marginBottom: 6 },
  address: { fontSize: 14, color: "#666", marginBottom: 12 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});