import { useAuth } from '@/components/context/auth-context';
import TaskItem from '@/components/task-item';
import { IconSymbol } from '@/components/ui/icon-symbol';
import NewTask from '@/components/ui/new-task';
import Title from '@/components/ui/title';
import { Task } from '@/constants/types';
import { loadTodosFromStorage, saveTodosToStorage } from '@/uitls/storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const {user} = useAuth();
  const [todos, setTodos] = useState<Task[]>([]);
  const [creatingNew, setCreatingNew] = useState<boolean>(false);
  const  userTodos = todos.filter(todo => todo.userId === (user ? user.id : ''));

useEffect(() => {
    loadTodosFromStorage()
      .then((loadedTodos) => {
        setTodos(loadedTodos);
      });
}, [user]); 

  const toggleTodo = (id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ) 
    );
  }

  const removeTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }

  const createTask = (task: Task) => {
    if (task.title.trim().length === 0) return;
    setTodos(prevTodos => {
      const newTodos = [...prevTodos, task];
      saveTodosToStorage(newTodos);
      return newTodos;
    });
    setCreatingNew(false);
  };

  const handleNewTaskClose = () => {
    setCreatingNew(false);
  }

  if (creatingNew) {
    return (
      <SafeAreaView style={styles.container}>
      <NewTask onClose={handleNewTaskClose} onTaskSave={createTask} />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Title style={{alignSelf: 'center' , marginBottom: 15}}>Bienvenido a tu Todo List, <Text style={{fontWeight: 'bold', color: '#1bf03eff' }}>{user?.name}</Text></Title>
    <LinearGradient
      colors={['transparent', '#0dcc2dff', 'transparent']}
      locations={[0, 0.5 , 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        height: 2.5, // Grosor del borde,
      }}
    />
      <View style={styles.listBackground}>
      {userTodos.map((todo) => (
        <TaskItem 
          key={todo.id} 
          task={todo} 
          onToggle={toggleTodo}
          onRemove={removeTodo}
        />
      ))}
      </View>
      <TouchableOpacity style={styles.newTaskButton} onPress={() => setCreatingNew(true)}>
        <IconSymbol name="plus" size={30} weight="bold" color="#fff" />
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: '#000000ff',
  },
  newTaskButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#0dcc2dff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listBackground: {
    flex: 1,
    backgroundColor: '#000000ff',
    marginHorizontal: -22,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
