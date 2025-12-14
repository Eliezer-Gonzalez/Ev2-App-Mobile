import { useAuth } from "@/components/context/auth-context";
import Button from "@/components/ui/button";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const handelLogaut = () => {
    logout();
    router.replace("/login");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {" "}
        Perfil de:{" "}
        <Text style={{ color: "#0dcc2dff", fontWeight: "bold" }}>
          {user?.email}
        </Text>
      </Text>
      <LinearGradient
        colors={["transparent", "#0dcc2dff", "transparent"]}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          height: 2.5, // Grosor del borde,
        }}
      />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#ffffff", fontSize: 30 }}>
          {" "}
          En construcción...{" "}
        </Text>
      </View>
      {/* Logout */}
      <Button
        type="primary"
        text="LOGOUT"
        onPress={handelLogaut}
        style={styles.button}
        textStyle={{ fontSize: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000ff",
    flex: 1,
  },
  title: {
    color: "#ffffff",
    fontSize: 20,
    alignSelf: "center",
    marginVertical: 15,
  },
  button: {
    marginBottom: 20,
    width: "90%",
    alignSelf: "center",
    paddingVertical: 15,
  },
});
