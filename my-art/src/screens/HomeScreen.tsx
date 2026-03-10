import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ArtworkCard from "../components/ArtworkCard";
import ErrorState from "../components/ErrorState";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import { getArtworks, searchArtworks } from "../services/artwork.service";
import { Artwork } from "../types/artwork";
import { RootStackParamList } from "../types/navigation";

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [iiifUrl, setIiifUrl] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchData = async (
    pageToLoad = 1,
    query = "",
    append = false
  ): Promise<void> => {
    try {
      setError("");

      const response = query.trim()
        ? await searchArtworks(query, pageToLoad, 10)
        : await getArtworks(pageToLoad, 10);

      setIiifUrl(response.config.iiif_url);
      setTotalPages(response.pagination.total_pages);

      setArtworks((prev) =>
        append ? [...prev, ...response.data] : response.data
      );
    } catch (err) {
      setError("Impossible de charger les œuvres.");
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData(1, "", false);
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
    setPage(1);
    setArtworks([]);
    setIsLoading(true);
    fetchData(1, text, false);
  };

  const handleLoadMore = () => {
    if (isLoading || isFetchingMore) return;
    if (page >= totalPages) return;

    const nextPage = page + 1;
    setPage(nextPage);
    setIsFetchingMore(true);
    fetchData(nextPage, searchText, true);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPage(1);
    fetchData(1, searchText, false);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => fetchData(1, searchText, false)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <SearchBar onSearch={handleSearch} />

        <FlatList
          data={artworks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ArtworkCard
              artwork={item}
              iiifUrl={iiifUrl}
              onPress={() => navigation.navigate("Detail", { id: item.id })}
            />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetchingMore ? <Loader /> : null}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  inner: {
    flex: 1,
    padding: 16,
  },
});