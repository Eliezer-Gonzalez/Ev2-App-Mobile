import { Task } from "@/constants/types";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "./ui/icon-symbol";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  loading: boolean;
}

export default function TaskItem({
  task,
  onToggle,
  onRemove,
  loading,
}: TaskItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.circle, task.completed && styles.completedCircle]}
        onPress={() => onToggle(task.id)}
        disabled={loading}
      />
      <View>
        {task.photoUri && (
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: task.photoUri }}
              style={[styles.image, task.completed && styles.completedImage]}
              resizeMode="cover"
            />
            {task.completed && (
              <View style={styles.imageOverlay} pointerEvents="none" />
            )}
          </View>
        )}
      </View>

      <View>
        <Text style={[styles.title, task.completed && styles.completedTitle]}>
          {task.title}
        </Text>
        {task.location && (
          <Text style={{ fontSize: 12, color: "#ffffffff" }}>
            📍 Lat: {task.location.latitude}, Lon: {task.location.longitude}
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={() => onRemove(task.id)}
        style={styles.removeButton}
        disabled={loading}
      >
        <IconSymbol name="trash.circle" size={25} color="#e62828ff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomColor: "#cbcbcc",
    borderBottomWidth: 1,
    paddingBottom: 8,
    height: 60,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ffffffff",
    backgroundColor: "transparent",
  },
  completedCircle: {
    backgroundColor: "#0dcc2dff",
  },
  title: {
    fontSize: 18,
    color: "#0dcc2dff",
  },
  completedTitle: {
    textDecorationLine: "line-through",
    color: "#cbcbcc",
  },
  imageWrapper: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  completedImage: {
    opacity: 0.4,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.57)",
  },
  removeButton: {
    marginLeft: "auto",
  },
});
