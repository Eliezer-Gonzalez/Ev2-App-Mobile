import { clearSessionFromStorage, loadSessionFromStorage, saveSessionToStorage } from '@/uitls/storage';
import { router } from 'expo-router';
import React, { useEffect } from 'react';


export interface User {
    id: string;
    name: string;
}

interface AuthContextProps {
    user: User | null;
    login: (username: string, password: string) => void;
    logout: () => void;
}

const EXPECTED_USERS = [
    { id: "1", name: "User1234", password: "Pass1234"},
    { id: "2", name: "Admin", password: "Admin" },
]

const AuthContext = React.createContext<AuthContextProps | undefined>(undefined);

export default function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = React.useState<User | null>(null);

    useEffect(() => {
        loadSessionFromStorage()
            .then((loadedUser) => {
                if (loadedUser) {
                    setUser(loadedUser);
                }
            });
    }, []);

    useEffect(() => {
        if (user){
            router.replace("/(tabs)");
        }
    }, [user]);

    const login = (username: string, password: string) => {
        const foundUser = EXPECTED_USERS.find(u => u.name === username && u.password === password);

        if (foundUser) {
            setUser({id: foundUser.id, name: foundUser.name});
            saveSessionToStorage({id: foundUser.id, name: foundUser.name});
        } else {
        throw new Error("Login failed: Invalid username or password.");    
        }
    }

    const logout = () => {
        setUser(null);
        clearSessionFromStorage();
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = React.useContext(AuthContext);
    
    if (!context){
        throw new Error("useAuth must be used within an AuthProvider"); 
    }

    return context;
}