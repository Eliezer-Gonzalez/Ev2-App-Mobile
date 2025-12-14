import { useAuth } from "@/components/context/auth-context";
import TaskItem from "@/components/task-item";
import { IconSymbol } from "@/components/ui/icon-symbol";
import NewTask from "@/components/ui/new-task";
import Title from "@/components/ui/title";
import { Task } from "@/constants/types";
import getTodoService from "@/services/todo-service";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [creatingNew, setCreatingNew] = useState<boolean>(false);

  const todoService = useMemo(
    () => (user ? getTodoService({ token: user.token }) : null),
    [user]
  );

  const fetchTodos = useCallback(async () => {
    if (!user || !todoService) return;
    setLoading(true);
    try {
      const response = await todoService.getTodos();
      setTodos(response.data);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user, fetchTodos]);

  const onTaskCreated = () => {
    fetchTodos();
    setCreatingNew(false);
  };

  const toggleTodo = async (id: string) => {
    setLoading(true);
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    const updatedTodo = todos.find((todo) => todo.id === id);
    if (todoService && updatedTodo !== undefined) {
      updatedTodo.completed = !updatedTodo.completed;
      try {
        await todoService.updateTodo(updatedTodo);
        await fetchTodos();
      } catch (error) {
        Alert.alert("Error", (error as Error).message);
      }
    }
    setLoading(false);
  };

  const removeTodo = async (id: string) => {
    setLoading(true);
    await todoService?.deleteTodo(id);
    await fetchTodos();
    setLoading(false);
  };

  const handleNewTaskClose = () => {
    setCreatingNew(false);
  };

  if (creatingNew) {
    return (
      <SafeAreaView style={styles.container}>
        <NewTask onClose={handleNewTaskClose} onTaskCreated={onTaskCreated} />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Title style={{ alignSelf: "center", marginBottom: 15 }}>
        Bienvenido a tu Todo List,{" "}
        <Text style={{ fontWeight: "bold", color: "#1bf03eff" }}>
          {user?.email}
        </Text>
      </Title>
      {loading && <Title>Cargando...</Title>}
      <LinearGradient
        colors={["transparent", "#0dcc2dff", "transparent"]}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          height: 2.5, // Grosor del borde,
        }}
      />
      <View style={styles.listBackground}>
        {todos.map((todo) => (
          <TaskItem
            key={todo.id}
            task={todo}
            onToggle={toggleTodo}
            onRemove={removeTodo}
            loading={loading}
          />
        ))}
      </View>
      <TouchableOpacity
        style={styles.newTaskButton}
        onPress={() => setCreatingNew(true)}
      >
        <IconSymbol name="plus" size={30} weight="bold" color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: "#000000ff",
  },
  newTaskButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#0dcc2dff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  listBackground: {
    flex: 1,
    backgroundColor: "#000000ff",
    marginHorizontal: -22,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
