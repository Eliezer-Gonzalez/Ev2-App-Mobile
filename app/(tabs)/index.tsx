import TaskItem from '@/components/task-item';
import { IconSymbol } from '@/components/ui/icon-symbol';
import Title from '@/components/ui/title';
import { Task } from '@/constants/types';
import { generateRandomId } from '@/uitls/generate-random-id';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const initialTodos = [
  { id: generateRandomId(), title: 'Buy groceries', completed: false },
  { id: generateRandomId(), title: 'Walk the dog', completed: true },
  { id: generateRandomId(), title: 'Read a book', completed: false },
  { id: generateRandomId(), title: 'Exercise', completed: true },
];

export default function HomeScreen() {
  const [todos, setTodos] = useState<Task[]>(initialTodos);

  const [newTaskTitle, setNewTaskTitle] = useState('');

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

  const addTodo = (title: string) => {
    const newTodo: Task = {
      id: generateRandomId(),
      title,
      completed: false,
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
    setNewTaskTitle('');
  }
  return (
    <SafeAreaView style={styles.container}>
        <Title>Todo List</Title>
      {todos.map((todo) => (
        <TaskItem 
          key={todo.id} 
          task={todo} 
          onToggle={toggleTodo}
          onRemove={removeTodo}
        />
      ))}
      <View style={{height: 20, flexDirection: 'row'}} >
        <TextInput 
          style={{
            flex: 1, 
            borderWidth: 1, 
            borderColor: '#ccc', 
            borderRadius: 8, 
            paddingHorizontal: 10,
            height: 40,}}
          placeholder="New task"
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
          onSubmitEditing={() => addTodo(newTaskTitle)}
        />
        <TouchableOpacity 
          onPress={() => addTodo(newTaskTitle)}
          style={{height: 40, marginLeft: 8}}>
          <IconSymbol name="plus.circle.fill" size={40} color="#3ec52cff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  }
});
