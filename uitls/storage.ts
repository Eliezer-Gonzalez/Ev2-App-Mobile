import { User } from "@/components/context/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SESSION_STORAGE_KEY = "@session_storage";

export const saveSessionToStorage = async (sessionData: User) => {
  try {
    const stringifiedSession = JSON.stringify(sessionData);
    await AsyncStorage.setItem(SESSION_STORAGE_KEY, stringifiedSession);
  } catch (error) {
    console.error("Error saving session to storage:", error);
  }
};

export const loadSessionFromStorage = async (): Promise<User | null> => {
  try {
    const storedSession = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
    if (storedSession) {
      return JSON.parse(storedSession) as User;
    }
    return null;
  } catch (error) {
    console.error("Error loading session from storage:", error);
    return null;
  }
};

export const clearSessionFromStorage = async () => {
  try {
    await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing session from storage:", error);
  }
};
