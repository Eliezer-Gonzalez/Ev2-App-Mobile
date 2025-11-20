import {StyleSheet, Text, View} from 'react-native';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
        <View style={styles.purpleCircle}> 
          <Text style={styles.titleName}> Under Construction 🚧</Text>
        </View>

        <Text style={styles.text}> Come Back Soon...</Text>
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
  titleName:{
    fontSize: 30,
    fontWeight: 'bold',
    color: "#ffffffff",
    top: 170,
    textAlign: 'center',
  },
  text:{
    fontSize: 30,
    fontWeight: 'bold',
    color: "#000000ff",
    marginTop: 50,
  }
});
