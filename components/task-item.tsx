import { Task } from "@/constants/types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "./ui/icon-symbol";

interface TaskItemProps {
    task: Task
    onToggle: (id: string) => void
    onRemove: (id: string) => void
}
export default function TaskItem({ task, onToggle, onRemove }: TaskItemProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
            style={[styles.circle, task.completed && styles.completedCircle]} 
            onPress={() => onToggle(task.id)}/>
            <Text style={[styles.title, task.completed && styles.completedTitle]}>
                {task.title}
            </Text>
            <TouchableOpacity onPress={() => onRemove(task.id)} style={styles.removeButton}>
                <IconSymbol name="trash.circle" size={24} color="#ff0000"/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: 'transparent',
    },
    completedCircle: {
        backgroundColor: '#2bff00ff',
    },
    title: {
        fontSize: 18,
        color: '#000000',
    },
    completedTitle: {
        textDecorationLine: 'line-through',
        color: '#808080',
    },
    removeButton: {
        marginLeft: 'auto',
    },
})