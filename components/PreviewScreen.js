import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function PreviewScreen({ route, navigation }) {
  const { imageUri } = route.params; // Receive image URI from CameraScreen
  // console.log("i am in PreviewScreen")
  const __retakePicture = () => {
    // Go back to CameraScreen
    navigation.goBack();
  };

  const __chooseArtwork = () => {
    // Navigate to ChooseArtworkScreen with the captured image URI
    navigation.navigate('ChooseArtwork', { imageUri });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Does this Image Looks Good?</Text>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={__retakePicture} style={styles.button}>
          <Text style={styles.text}>Re-Take</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={__chooseArtwork} style={styles.button}>
          <Text style={styles.text}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 400,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 50,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
  },
});
