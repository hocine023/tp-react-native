import React, { useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

interface CameraCaptureProps {
  onPictureTaken: (uri: string) => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  onPictureTaken,
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);

  if (!permission) {
    return <View style={styles.loadingContainer} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          L'application a besoin d'accéder à la caméra.
        </Text>
        <Button title="Autoriser la caméra" onPress={requestPermission} />
      </View>
    );
  }

  const takePicture = async () => {
    try {
      if (!cameraRef.current) return;

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
      });

      if (photo?.uri) {
        onPictureTaken(photo.uri);
      }
    } catch (error) {
      console.log("Erreur caméra :", error);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back" />
      <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
        <View style={styles.innerButton} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 280,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
    position: "relative",
    justifyContent: "flex-end",
  },
  camera: {
    flex: 1,
  },
  loadingContainer: {
    height: 280,
    borderRadius: 12,
    backgroundColor: "#ddd",
  },
  permissionContainer: {
    height: 280,
    borderRadius: 12,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionText: {
    textAlign: "center",
    marginBottom: 15,
    fontSize: 16,
  },
  captureButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255,255,255,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  innerButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
  },
});