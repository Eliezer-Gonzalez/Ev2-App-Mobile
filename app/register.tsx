import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../components/context/auth-context";
import Button from "../components/ui/button";
import getAuthService from "../services/auth-services";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Datos incompletos", "Ingrese email y contraseña.");
      return;
    }

    const authClient = getAuthService();
    try {
      setLoading(true);
      await authClient.register({ email, password });
      // Auto-login
      await login(email, password);
    } catch (error) {
      Alert.alert("Registro fallido", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <LinearGradient
      colors={["#05bd45ff", "#000000ff", "#000000ff", "#000000ff"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <View style={styles.borderBlurView}>
        <BlurView intensity={40} tint="dark" style={styles.blurView}>
          <FontAwesome5 name="user-plus" size={80} style={styles.icon} />
          <Text style={styles.title}>Crear nueva cuenta</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#ffffff"
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              placeholder="Insert Password"
              placeholderTextColor="#ffffff"
              secureTextEntry
              onChangeText={setPassword}
            />
          </View>

          <Button
            style={styles.button}
            onPress={handleRegister}
            disabled={!email || !password}
            loading={loading}
            text="Crear cuenta"
          />

          <Button
            type="outlined"
            style={[styles.button, { marginTop: 8 }]}
            onPress={handleBack}
            text="Volver al Login"
          />
        </BlurView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  borderBlurView: {
    borderWidth: 1,
    borderColor: "#0a8d36ff",
    borderRadius: 10,
    overflow: "hidden",
    width: "85%",
    alignItems: "center",
  },
  blurView: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    paddingVertical: 30,
  },
  input: {
    height: 45,
    borderColor: "#0dcc2dff",
    borderWidth: 2,
    paddingHorizontal: 10,
    width: "100%",
    color: "#ffffff",
    borderRadius: 6,
  },
  inputContainer: {
    width: "80%",
    margin: 10,
    gap: 10,
  },
  label: {
    fontSize: 20,
    color: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#169e2dff",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: "80%",
  },
  icon: {
    marginBottom: 10,
    color: "#ffffff",
  },
});
