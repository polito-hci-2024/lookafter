import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import CameraScreen from './components/CameraScreen.js'; // Import the CameraScreen
import PreviewScreen from './components/PreviewScreen.js'
import Panoramica from './components/Panoramic.js';
import ChooseArtworkScreen from './components/ArtworkScreen.js';
import PathDetails from './components/Path.js';


const Stack = createStackNavigator();

function MainPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Look After</Text>
      <Text style = {styles.description}>
        FEEL THE SPACE OWN YOUR PATH
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CameraScreen')}
      >
        <Text style={styles.buttonText}>Scan</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen name="MainPage" component={MainPage} options={{ title: 'Main Page' }} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ title: 'Camera' }} />
        <Stack.Screen name="Preview" component={PreviewScreen} />
        <Stack.Screen name="ChooseArtwork" component={ChooseArtworkScreen} />
        <Stack.Screen name="PathDetails" component={PathDetails} />
     </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
});
