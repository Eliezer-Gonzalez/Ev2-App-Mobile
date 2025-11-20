import {View, Text, StyleSheet, TextInput, Pressable, Alert} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../components/context/auth-context';

export default function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { login} = useAuth();
    
    const handelUsernameChange = (text: string) => {
        setUsername(text);
    }

    const handelPasswordChange = (text: string) => {
        setPassword(text);
    }

    const handelLogin = () => {
        try {
            login(username, password);
            router.replace("/(tabs)");
        } catch (error) {
            Alert.alert("Login Failed", (error as Error).message);
        }
    }

    return(
        <View style={styles.container}>

            <View style={styles.purpleCircle}> 
                <Text style={styles.title}>Login Screen</Text>
            </View>

            {/* Username */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    Username:
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='Insert Username'
                    onChangeText={handelUsernameChange} />
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    Password:
                </Text>
                <TextInput style={styles.input}
                    placeholder='Insert Password'
                    secureTextEntry
                    onChangeText={handelPasswordChange} />
            </View>

            {/* Login Buttom */}
            <Pressable style={styles.button} onPress={handelLogin}>
                <Text style={styles.buttonText}>Login in</Text>
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({ 
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    purpleCircle: {
        position: 'relative',
        top: -30, 
        width: 500,
        height: 300,
        backgroundColor: '#7513a3',
        borderBottomLeftRadius: 250,
        borderBottomRightRadius: 250,
        zIndex: -1, 
    },
    input: {
        height: 40,
        borderColor: "#870aad59",
        borderWidth: 2,
        paddingHorizontal: 10,
        width: '100%',
    },
    inputContainer: {
        width: '80%',
        margin: 10,
        gap: 10,
    },
    label: {
        fontSize: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#ffffffff',
        top: 170,
        textAlign: 'center',
    },
    button:{
        backgroundColor: '#7513a3ff',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        width: '80%',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    }
});

