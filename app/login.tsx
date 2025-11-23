import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../components/context/auth-context';

export default function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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
        } catch (error) {
            Alert.alert("Login Failed", (error as Error).message);
        }
    }

    return(
        <LinearGradient
        colors={['#05bd45ff','#000000ff','#000000ff','#000000ff', ]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.container}>

        <View style={styles.borderBlurView}>
        <BlurView intensity={40} tint='dark'
        style={styles.blurView}>
                <FontAwesome5 name="user-circle" size={80} style={styles.icon} />
            <Text style={styles.title}>Login</Text>
            {/* Username */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    Username:
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='Insert Username'
                    placeholderTextColor='#ffffff'
                    onChangeText={handelUsernameChange} />
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    Password:
                </Text>
                <TextInput style={styles.input}
                    placeholder='Insert Password'
                    placeholderTextColor='#ffffff'
                    secureTextEntry
                    onChangeText={handelPasswordChange} />
            </View>

            {/* Login Buttom */}
            <Pressable style={styles.button} onPress={handelLogin}>
                <Text style={styles.buttonText}>Login in</Text>
            </Pressable>
        </BlurView>
        </View>
        
            
    </LinearGradient>
    );
}
const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    borderBlurView: {
    borderWidth: 1,
    borderColor: '#0a8d36ff', // blanco con transparencia
    borderRadius: 10,
    overflow: 'hidden',
    width: '85%',
    alignItems: 'center',
    },    
    blurView: {
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        paddingVertical: 30,
    },
    input: {
        height: 45,
        borderColor: "#0dcc2dff",
        borderWidth: 2,
        paddingHorizontal: 10,
        width: '100%',
        color: '#ffffff',
        borderRadius: 6,
    },
    inputContainer: {
        width: '80%',
        margin: 10,
        gap: 10,
    },
    label: {
        fontSize: 20,
        color: '#ffffff',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
    },
    button:{
        backgroundColor: '#169e2dff',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        width: '80%',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    },
    icon: {
        marginBottom: 10,
        color: '#ffffff',
    },
});