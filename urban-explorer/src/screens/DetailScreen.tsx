import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Vibration,
  View,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import * as ExpoCalendar from "expo-calendar";
import { FadeInCard } from "../components/FadeInCard";
import { AnimatedActionButton } from "../components/AnimatedActionButton";
import { getVisitPlan, saveVisitPlan } from "../services/storage";
import { RootDiscoveryStackParamList, VisitPlan } from "../types";

type DetailRouteProp = RouteProp<RootDiscoveryStackParamList, "Detail">;

export const DetailScreen: React.FC = () => {
  const route = useRoute<DetailRouteProp>();
  const { place } = route.params;

  const [selectedDate, setSelectedDate] = useState("");
  const [plans, setPlans] = useState<VisitPlan>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadPlans = async () => {
      const savedPlans = await getVisitPlan();
      setPlans(savedPlans);

      if (savedPlans[place.id]) {
        setSelectedDate(savedPlans[place.id]);
      }
    };

    loadPlans();
  }, [place.id]);

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  const addVisitToNativeCalendar = async () => {
    try {
      if (!selectedDate) {
        Alert.alert("Date manquante", "Veuillez sélectionner une date.");
        return;
      }

      setIsSubmitting(true);

      const { status } =
        await ExpoCalendar.requestCalendarPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Calendrier", "Permission calendrier refusée.");
        return;
      }

      const calendars = await ExpoCalendar.getCalendarsAsync(
        ExpoCalendar.EntityTypes.EVENT
      );

      const writableCalendar = calendars.find(
        (cal) => cal.allowsModifications
      );

      if (!writableCalendar) {
        Alert.alert("Calendrier", "Aucun calendrier modifiable trouvé.");
        return;
      }

      const updatedPlans = {
        ...plans,
        [place.id]: selectedDate,
      };

      setPlans(updatedPlans);
      await saveVisitPlan(updatedPlans);

      const startDate = new Date(`${selectedDate}T10:00:00`);
      const endDate = new Date(`${selectedDate}T11:00:00`);

      await ExpoCalendar.createEventAsync(writableCalendar.id, {
        title: `🎨 Visite - ${place.name}`,
        notes: `Visite planifiée via Urban Explorer`,
        startDate,
        endDate,
        location: place.address,
      });

      Vibration.vibrate(200);

      Alert.alert(
        "Visite planifiée",
        `Votre visite à ${place.name} a été ajoutée au calendrier pour le ${selectedDate}.`
      );
    } catch (e: any) {
      Alert.alert(
        "Erreur Calendrier",
        e?.message || "Impossible d'ajouter la visite au calendrier."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <FadeInCard>
          <Image source={{ uri: place.imageUrl }} style={styles.image} />
          <Text style={styles.title}>{place.name}</Text>
          <Text style={styles.address}>{place.address}</Text>
        </FadeInCard>

        <Text style={styles.sectionTitle}>Planifier une visite</Text>

        <Calendar
          onDayPress={handleDayPress}
          markedDates={
            selectedDate
              ? {
                  [selectedDate]: {
                    selected: true,
                    selectedColor: "#004aad",
                  },
                }
              : {}
          }
        />

        {selectedDate ? (
          <Text style={styles.confirmation}>
            Date sélectionnée : {selectedDate}
          </Text>
        ) : null}

        <View style={styles.buttonContainer}>
          {isSubmitting ? (
            <View style={styles.loadingButton}>
              <ActivityIndicator color="#fff" />
            </View>
          ) : (
            <AnimatedActionButton
              title="Confirmer la visite"
              onPress={addVisitToNativeCalendar}
              disabled={!selectedDate}
            />
          )}
        </View>

        {selectedDate ? (
          <Text style={styles.savedText}>
            Visite au {place.name} planifiée le {selectedDate}
          </Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  confirmation: {
    marginTop: 14,
    fontSize: 15,
    color: "#004aad",
    fontWeight: "600",
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  loadingButton: {
    backgroundColor: "#004aad",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  savedText: {
    fontSize: 15,
    color: "#004aad",
    fontWeight: "600",
  },
});