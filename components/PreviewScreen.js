import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function PreviewScreen({ route, navigation }) {
  const { imageUri } = route.params; // Receive image URI from CameraScreen
  // console.log("i am in PreviewScreen")
  const __savePhoto = () => {
    // Handle saving the photo
    console.log("Photo saved");
    navigation.goBack(); // Go back to the CameraScreen
  };

  const __retakePicture = () => {
    // Go back to the CameraScreen to retake the picture
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Does this Image Looks Good?</Text>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={__retakePicture} style={styles.button}>
          <Text style={styles.text}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={__savePhoto} style={styles.button}>
          <Text style={styles.text}>Yes</Text>
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
