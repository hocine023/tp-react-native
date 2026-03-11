import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import * as Calendar from "expo-calendar";
import { CameraCapture } from "../components/CameraCapture";
import { LocationMap } from "../components/LocationMap";
import { submitIncident } from "../services/api";
import { Coordinates, Incident } from "../types";

export const IncidentFormScreen: React.FC = () => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mapKey, setMapKey] = useState(0);

  const resetForm = () => {
    setPhotoUri(null);
    setLocation(null);
    setDescription("");
    setMapKey((prev) => prev + 1);
  };

  const addEventToCalendar = async (coords: Coordinates) => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Calendrier", "Permission calendrier refusée.");
        return;
      }

      const calendars = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT
      );

      const writableCalendar = calendars.find(
        (cal) => cal.allowsModifications
      );

      if (!writableCalendar) {
        Alert.alert("Calendrier", "Aucun calendrier modifiable trouvé.");
        return;
      }

      const startDate = new Date();
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

      await Calendar.createEventAsync(writableCalendar.id, {
        title: "🔧 Suivi Intervention",
        notes: description || "Incident signalé via application mobile.",
        startDate,
        endDate,
        location: `${coords.latitude}, ${coords.longitude}`,
      });
    } catch (e: any) {
      Alert.alert(
        "Erreur Calendrier",
        e?.message || "Impossible d'ajouter l'événement."
      );
    }
  };

  const handleSubmit = async () => {
    if (!photoUri || !location) {
      Alert.alert(
        "Formulaire incomplet",
        "La photo et la position GPS sont obligatoires."
      );
      return;
    }

    const incident: Incident = {
      description,
      photoUri,
      location,
      timestamp: Date.now(),
    };

    try {
      setIsSubmitting(true);

      const response = await submitIncident(incident);

      if (!response.success) {
        throw new Error(response.error || "Erreur lors de l'envoi.");
      }

      await addEventToCalendar(location);

      Vibration.vibrate(200);
      Alert.alert("Succès", "Incident envoyé avec succès.");
      resetForm();
    } catch (e: any) {
      Alert.alert(
        "Erreur réseau",
        e?.message || "Une erreur est survenue."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = !photoUri || !location || isSubmitting;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Signalement Municipal</Text>

      <Text style={styles.label}>1. Photo de l'incident</Text>
      {photoUri ? (
        <View>
          <Image source={{ uri: photoUri }} style={styles.imagePreview} />
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => setPhotoUri(null)}
          >
            <Text style={styles.retryButtonText}>Reprendre</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <CameraCapture onPictureTaken={setPhotoUri} />
      )}

      <Text style={styles.label}>2. Position GPS</Text>
      <LocationMap key={mapKey} onLocationFound={setLocation} />

      <Text style={styles.label}>3. Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Décrivez l'incident..."
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      <View style={styles.buttonContainer}>
        {isSubmitting ? (
          <View style={styles.loadingButton}>
            <ActivityIndicator color="#fff" />
          </View>
        ) : (
          <Button
            title="Envoyer le signalement"
            onPress={handleSubmit}
            disabled={isDisabled}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  imagePreview: {
    width: "100%",
    height: 280,
    borderRadius: 12,
    resizeMode: "cover",
  },
  retryButton: {
    marginTop: 15,
    backgroundColor: "#004aad",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
    backgroundColor: "#fafafa",
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 30,
  },
  loadingButton: {
    backgroundColor: "#007AFF",
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: "center",
  },
});