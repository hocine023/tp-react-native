import React, { useEffect, useMemo, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ErrorState } from "../components/ErrorState";
import { LieuCard } from "../components/LieuCard";
import { Loader } from "../components/Loader";
import { SearchBar } from "../components/SearchBar";
import { getPlaces } from "../services/api";
import { Place, RootDiscoveryStackParamList } from "../types";

type Props = NativeStackScreenProps<
  RootDiscoveryStackParamList & { [K: string]: undefined | object },
  "DiscoveryList"
>;

export const DiscoveryScreen: React.FC<Props> = ({ navigation }) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPlaces = async () => {
    try {
      setError("");
      setIsLoading(true);
      const data = await getPlaces();
      setPlaces(data);
    } catch {
      setError("Impossible de récupérer les lieux culturels.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const filteredPlaces = useMemo(() => {
    return places.filter((place) =>
      place.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [places, query]);

  if (isLoading) return <Loader text="Chargement des lieux..." />;
  if (error) return <ErrorState message={error} onRetry={fetchPlaces} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredPlaces}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <SearchBar value={query} onChangeText={setQuery} />
        }
        renderItem={({ item }) => (
          <LieuCard
            place={item}
            onPress={() => navigation.navigate("Detail", { place: item })}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f6f6" },
  content: { padding: 16 },
});