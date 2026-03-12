import React, { useEffect, useRef, useState } from "react";
import { Button, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { saveProfilePhoto, getProfilePhoto } from "../services/storage";
import { FadeInCard } from "../components/FadeInCard";

export const ProfileScreen: React.FC = () => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);

  useEffect(() => {
    const loadPhoto = async () => {
      const savedPhoto = await getProfilePhoto();
      if (savedPhoto) {
        setPhotoUri(savedPhoto);
      }
    };

    loadPhoto();
  }, []);

  const takePicture = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
    if (photo?.uri) {
      setPhotoUri(photo.uri);
      await saveProfilePhoto(photo.uri);
    }
  };

  if (!permission) return <SafeAreaView style={styles.container} />;
  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.permissionText}>
          L'application a besoin d'accéder à la caméra.
        </Text>
        <Button title="Autoriser la caméra" onPress={requestPermission} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FadeInCard style={styles.content}>
        <Text style={styles.title}>Mon Profil</Text>

        {photoUri ? (
          <>
            <Image source={{ uri: photoUri }} style={styles.avatar} />
            <TouchableOpacity style={styles.retakeButton} onPress={() => setPhotoUri(null)}>
              <Text style={styles.retakeText}>Reprendre une photo</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.cameraContainer}>
            <CameraView ref={cameraRef} style={styles.camera} facing="front" />
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <View style={styles.innerCapture} />
            </TouchableOpacity>
          </View>
        )}
      </FadeInCard>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  content: { flex: 1 },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginVertical: 20 },
  permissionText: { textAlign: "center", marginBottom: 12 },
  avatar: {
    width: 220,
    height: 220,
    borderRadius: 110,
    alignSelf: "center",
    marginBottom: 20,
  },
  cameraContainer: {
    height: 340,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#000",
    justifyContent: "flex-end",
  },
  camera: { flex: 1 },
  captureButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "rgba(255,255,255,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  innerCapture: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#fff",
  },
  retakeButton: {
    marginTop: 16,
    alignSelf: "center",
    backgroundColor: "#004aad",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  retakeText: { color: "#fff", fontWeight: "bold" },
});