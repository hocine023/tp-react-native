import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { Coordinates } from "../types";

interface LocationMapProps {
  onLocationFound: (coords: Coordinates) => void;
}

export const LocationMap: React.FC<LocationMapProps> = ({
  onLocationFound,
}) => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } =
          await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setError("Permission de localisation refusée.");
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});

        const coords = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        };

        setLocation(coords);
        onLocationFound(coords);
      } catch (e) {
        setError("Impossible de récupérer la position.");
      }
    };

    getLocation();
  }, []);

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Recherche de votre position...</Text>
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      showsUserLocation={true}
    >
      <Marker coordinate={location} pinColor="red" />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 240,
    borderRadius: 12,
    marginTop: 10,
  },
  centerContainer: {
    height: 240,
    borderRadius: 12,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 15,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
});