import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Artwork } from "../types/artwork";
import { buildImageUrl } from "../services/artwork.service";

type ArtworkCardProps = {
  artwork: Artwork;
  iiifUrl: string;
  onPress: () => void;
};

export default function ArtworkCard({
  artwork,
  iiifUrl,
  onPress,
}: ArtworkCardProps) {
  const imageUrl = buildImageUrl(iiifUrl, artwork.image_id, 400);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Text>Pas d'image</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{artwork.title}</Text>
        <Text style={styles.artist}>
          {artwork.artist_display || "Artiste inconnu"}
        </Text>
        <Text style={styles.date}>
          {artwork.date_display || "Date inconnue"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eee",
  },
  image: {
    width: "100%",
    height: 220,
  },
  placeholder: {
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
  },
  artist: {
    fontSize: 14,
    color: "#444",
  },
  date: {
    marginTop: 4,
    fontSize: 13,
    color: "#777",
  },
});