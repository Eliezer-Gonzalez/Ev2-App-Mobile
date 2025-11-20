import { useAuth } from "@/components/context/auth-context";
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View, } from 'react-native';


export default function HomeScreen() {
  const {user, logout} = useAuth();
  const router = useRouter();
  const handelLogaut = () => {
    logout();
    router.replace("/login");
  }
  return (
    <View style={styles.container}>
        <View style={styles.purpleCircle}> 
          <Text style={styles.titleName}> This your Profile {user?.name}!</Text>
        </View>

        <Text style={styles.title}> Under Construction</Text>

        <View style={styles.body}>
            {/* Logout */}
            <Pressable style={styles.button} onPress={handelLogaut}>
              <Text style={styles.buttonText}>Logout</Text>
            </Pressable>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  titleName:{
    fontSize: 30,
    fontWeight: 'bold',
    color: "#ffffffff",
    top: 170,
    textAlign: 'center',
  },
  body:{
    width: '80%',
    alignContent: 'center',
    gap: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#9320afff',
  },
  textCount: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
