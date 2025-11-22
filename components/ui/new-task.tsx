import { Task } from "@/constants/types";
import { launchCameraAsync, requestCameraPermissionsAsync } from "expo-image-picker";
import { Accuracy, getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../context/auth-context";
import Button from "./button";
import Title from "./title";

interface NewTaskProps {
    onClose: () => void;
    onTaskSave: (task: Task) => void;
}

export default function NewTask({onClose, onTaskSave}: NewTaskProps) {
const [photoUri, setPhotoUri] = useState<string | null>(null);
const [taskTitle, setTaskTitle] = useState<string>('');
const [isCApturingPhoto, setIsCapturingPhoto] = useState<boolean>(false);
const [isSaving, setIsSaving] = useState<boolean>(false);
const {user} = useAuth();

async function handleTakePhoto() {
    if (isCApturingPhoto) return;

    try {
        setIsCapturingPhoto(true);

        const {status} = await requestCameraPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert("Permission Denied", "Camera access is required to take photos.");
            setIsCapturingPhoto(false);
            return;
        }

        const result = await launchCameraAsync({
            mediaTypes: ['images'],
            quality: 0.7,
            allowsEditing: false,
            exif: false,
        });

        if (!result.canceled && result.assets.length > 0) {
            setPhotoUri(result.assets[0].uri);
        }

    } catch (error) {
        console.error("Error taking photo:", error);
        Alert.alert("Error", "There was an error taking the photo. Please try again.");
    } finally {
        setIsCapturingPhoto(false);

        try {
            setIsSaving(true);
        } catch (error) {
            console.error("Error saving task:", error);
            Alert.alert("Error", "There was an error saving the task. Please try again.");
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

            try{
                const {status} = await requestForegroundPermissionsAsync();

            if (status === 'granted') {
                const locationResult = await getCurrentPositionAsync({
                    accuracy: Accuracy.Balanced
                });
                location = {
                    latitude: locationResult.coords.latitude.toFixed(6),
                    longitude: locationResult.coords.longitude.toFixed(6),
                };
            }
            } catch (error) {
                console.error("Error al obtener localización: ", error);
            }

            const newTask: Task = {
                id: Date.now().toString(),
                title: taskTitle,
                completed: false,
                photoUri: photoUri || undefined,
                coordinates: location || undefined,
                userId: user ? user.id : '',
            };
            onTaskSave(newTask);
        } catch (error) {
            console.error("Error al guardar la tarea", error);
            Alert.alert("Error", "Hubo un error con la tarea. Intenta de nuevo.");
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <View style={styles.container}>
            <Title>
                Add New Task
            </Title>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Titulo de la tarea</Text>
                <TextInput style={styles.input} value={taskTitle} onChangeText={setTaskTitle} />
            </View>
            {photoUri ? (
                <View style={styles.photoContainer}>
                    <Image 
                    source={{uri: photoUri}} 
                    style={{width: '100%', height: 450, borderRadius: 4}} resizeMode="contain" />
                </View>
            ) : (
            <View style={styles.emptyPhotoContainer}>
                <Text style={styles.emptyPhotoIcon}>📷</Text>
                <Text style={styles.emptyPhotoText}>No hay foto</Text>
            </View>
            )}

            <Button type="outlined" text={photoUri ? "Volver a tomar Foto" : "Tomar Foto"} onPress={handleTakePhoto} />

            <View style={{gap: 10, flexDirection: 'column', marginTop: 10,}}>
                <Button type="primary" text="Agregar Tarea" onPress={handleSaveTask} disabled={!taskTitle || isSaving} loading={isSaving} />
                <Button type="danger" text="Cancelar" onPress={onClose} />
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
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 4,
  },
  photoContainer: {
    marginTop: 12,
    marginBottom: 10,
  },
  emptyPhotoContainer: {
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    borderRadius: 4,
    backgroundColor: '#585858ff',
    marginBottom: 10,
  },
  emptyPhotoIcon: {
    fontSize: 36,
  },
  emptyPhotoText: {
    marginTop: 8,
    color: '#fafafaff',
  },
});

