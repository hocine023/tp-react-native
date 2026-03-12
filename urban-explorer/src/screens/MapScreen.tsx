import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { getPlaces } from "../services/api";
import { Place } from "../types";
import { Loader } from "../components/Loader";
import { ErrorState } from "../components/ErrorState";

const PARIS_REGION = {
  latitude: 48.8566,
  longitude: 2.3522,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

export const MapScreen: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [region, setRegion] = useState(PARIS_REGION);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMapData = async () => {
    try {
      setError("");
      setIsLoading(true);

      const data = await getPlaces();
      setPlaces(data.filter((place) => place.coordinates));

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const current = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: current.coords.latitude,
          longitude: current.coords.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
      } else {
        setRegion(PARIS_REGION);
      }
    } catch {
      setError("Impossible de charger la carte.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMapData();
  }, []);

  if (isLoading) return <Loader text="Chargement de la carte..." />;
  if (error) return <ErrorState message={error} onRetry={fetchMapData} />;

  return (
    <SafeAreaView style={styles.container}>
      <MapView style={styles.map} initialRegion={region} showsUserLocation>
        {places.map((place) =>
          place.coordinates ? (
            <Marker
              key={place.id}
              coordinate={place.coordinates}
              title={place.name}
              description={place.address}
              onPress={() => Alert.alert(place.name)}
            />
          ) : null
        )}
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});