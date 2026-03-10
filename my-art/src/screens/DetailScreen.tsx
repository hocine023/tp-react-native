import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import ErrorState from "../components/ErrorState";
import Loader from "../components/Loader";
import { buildImageUrl, getArtworkById } from "../services/artwork.service";
import { Artwork } from "../types/artwork";
import { RootStackParamList } from "../types/navigation";

type DetailRouteProp = RouteProp<RootStackParamList, "Detail">;

export default function DetailScreen() {
  const route = useRoute<DetailRouteProp>();
  const { id } = route.params;

  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [iiifUrl, setIiifUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchArtwork = async () => {
    try {
      setError("");
      setIsLoading(true);

      const response = await getArtworkById(id);
      setArtwork(response.data);
      setIiifUrl(response.config.iiif_url);
    } catch (err) {
      setError("Impossible de charger le détail.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArtwork();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={fetchArtwork} />;
  }

  if (!artwork) {
    return null;
  }

  const imageUrl = buildImageUrl(iiifUrl, artwork.image_id, 843);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Text>Pas d'image</Text>
        </View>
      )}

      <Text style={styles.title}>{artwork.title}</Text>

      <Text style={styles.label}>Artiste</Text>
      <Text style={styles.value}>{artwork.artist_display || "Inconnu"}</Text>

      <Text style={styles.label}>Date</Text>
      <Text style={styles.value}>{artwork.date_display || "Inconnue"}</Text>

      <Text style={styles.label}>Origine</Text>
      <Text style={styles.value}>
        {artwork.place_of_origin || "Non renseignée"}
      </Text>

      <Text style={styles.label}>Technique</Text>
      <Text style={styles.value}>
        {artwork.medium_display || "Non renseignée"}
      </Text>

      <Text style={styles.label}>Dimensions</Text>
      <Text style={styles.value}>
        {artwork.dimensions || "Non renseignées"}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 360,
    borderRadius: 12,
    marginBottom: 16,
  },
  placeholder: {
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#555",
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: "#111",
    lineHeight: 22,
    marginTop: 4,
  },
});