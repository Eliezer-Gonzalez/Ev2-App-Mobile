import { Task } from "@/constants/types";
import getTodoService from "@/services/todo-service";
import {
  launchCameraAsync,
  requestCameraPermissionsAsync,
} from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import {
  Accuracy,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAuth } from "../context/auth-context";
import Button from "./button";
import Title from "./title";

interface NewTaskProps {
  onClose: () => void;
  onTaskCreated: (task: Task) => void;
}

export default function NewTask({ onClose, onTaskCreated }: NewTaskProps) {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [isCApturingPhoto, setIsCapturingPhoto] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<{
    latitude: string;
    longitude: string;
  } | null>(null);
  const { user } = useAuth();
  const screenHeight = Dimensions.get("screen").height;

  async function handleTakePhoto() {
    if (isCApturingPhoto) return;

    try {
      setIsCapturingPhoto(true);

      const { status } = await requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Camera access is required to take photos."
        );
        setIsCapturingPhoto(false);
        return;
      }

      const result = await launchCameraAsync({
        mediaTypes: ["images"],
        quality: 0.7,
        allowsEditing: false,
        exif: false,
      });

      if (!result.canceled && result.assets.length > 0) {
        const photoAsBlob = await fetch(result.assets[0].uri).then((res) =>
          res.blob()
        );
        setPhotoUri(result.assets[0].uri);
        // After taking a photo, try to get coordinates and show them immediately
        try {
          const { status: locStatus } =
            await requestForegroundPermissionsAsync();
          if (locStatus === "granted") {
            const locationResult = await getCurrentPositionAsync({
              accuracy: Accuracy.Balanced,
            });
            setCoordinates({
              latitude: locationResult.coords.latitude.toFixed(6),
              longitude: locationResult.coords.longitude.toFixed(6),
            });
          }
        } catch (err) {
          console.error("Error obteniendo coordenadas tras foto:", err);
        }
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert(
        "Error",
        "There was an error taking the photo. Please try again."
      );
    } finally {
      setIsCapturingPhoto(false);

      try {
        setIsSaving(true);
      } catch (error) {
        console.error("Error saving task:", error);
        Alert.alert(
          "Error",
          "There was an error saving the task. Please try again."
        );
      } finally {
        setIsSaving(false);
      }
    }
  }

  async function handleSaveTask() {
    if (isSaving) return;
    let location = null;

    try {
      setIsSaving(true);

      // Only request coordinates if there is a photo (user took a picture)
      if (photoUri && !coordinates) {
        try {
          const { status } = await requestForegroundPermissionsAsync();
          if (status === "granted") {
            const locationResult = await getCurrentPositionAsync({
              accuracy: Accuracy.Balanced,
            });
            location = {
              latitude: Number(locationResult.coords.latitude.toFixed(6)),
              longitude: Number(locationResult.coords.longitude.toFixed(6)),
            };
          }
        } catch (error) {
          console.error("Error al obtener localización: ", error);
        }
      } else if (coordinates) {
        //problemas con tipos de datos string/number
        //se declara latitude y longitude como Number desde el principio
        //location = coordinates;
        location = {
          latitude: Number(coordinates.latitude),
          longitude: Number(coordinates.longitude),
        };
      }

      const newTask: Task = {
        id: Date.now().toString(),
        title: taskTitle,
        completed: false,
        photoUri: photoUri || undefined,
        location: location || undefined,
        userId: user ? user.id : "",
      };
      const todoService = getTodoService({ token: user!.token });
      await todoService.createTodo(newTask);
      onTaskCreated(newTask);
    } catch (error) {
      console.error("Error al guardar la tarea", error);
      Alert.alert("Error", "Hubo un error con la tarea. Intenta de nuevo.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <View style={[styles.container, { height: screenHeight }]}>
      <Title style={{ alignSelf: "center", marginBottom: 15 }}>
        Agregar nueva Tarea
      </Title>
      <LinearGradient
        colors={["transparent", "#0dcc2dff", "transparent"]}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          height: 2.5, // Grosor del borde
        }}
      />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Titulo de la tarea</Text>
        <TextInput
          style={styles.input}
          value={taskTitle}
          onChangeText={setTaskTitle}
          placeholder="Ingrese el nombre de la Tarea..."
          placeholderTextColor="#FFFFFF"
        />
      </View>
      {photoUri ? (
        <View style={styles.photoContainer}>
          <Image
            source={{ uri: photoUri }}
            style={{ width: "auto", height: 467, borderRadius: 4 }}
            resizeMode="contain"
          />
        </View>
      ) : (
        <View style={styles.emptyPhotoContainer}>
          <Text style={styles.emptyPhotoIcon}>📷</Text>
          <Text style={styles.emptyPhotoText}>No hay foto</Text>
        </View>
      )}

      <Button
        type="outlined"
        text={photoUri ? "Volver a tomar Foto" : "Tomar Foto"}
        onPress={handleTakePhoto}
      />

      <View style={{ flex: 1 }} />

      <View style={styles.footer}>
        <View style={styles.footerButtons}>
          <Button
            type="primary"
            text="Agregar Tarea"
            onPress={handleSaveTask}
            disabled={!taskTitle || isSaving}
            loading={isSaving}
          />
          <Button type="danger" text="Cancelar" onPress={onClose} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    marginTop: 12,
  },
  label: {
    fontSize: 15,
    marginBottom: 6,
    color: "#ffffffff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ffffffff",
    padding: 8,
    borderRadius: 4,
    color: "#ffffffff",
  },
  photoContainer: {
    marginTop: 10,
    marginBottom: 12,
  },
  emptyPhotoContainer: {
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    borderRadius: 4,
    backgroundColor: "#202020ff",
    marginBottom: 10,
  },
  emptyPhotoIcon: {
    fontSize: 36,
  },
  emptyPhotoText: {
    marginTop: 8,
    color: "#fafafaff",
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 15,
  },
  footerButtons: {
    gap: 10,
  },
});
