import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

export default function ChooseArtworkScreen({ route }) {
  const { imageUri } = route.params; // Receive image URI from PreviewScreen

  const handleChooseArtwork = () => {
    // Implement logic to select artwork (if needed)
    console.log('Artwork selected');
  }

  const handleNext = () => {
    // Navigate to the next page or perform any necessary action
    navigation.navigate('NextPage'); // Replace 'NextPage' with your next screen's name
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose an Artwork for Your Image</Text>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.artworkName}>Artwork Name</Text>
      <TouchableOpacity onPress={handleChooseArtwork} style={styles.chooseButton}>
        <Text style={styles.buttonText}>Choose Artwork</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
      },
      title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      image: {
        width: 250,
        height: 350,
        marginBottom: 10,
        borderRadius: 10,
      },
      artworkName: {
        fontSize: 20,
        color: '#555',
        marginBottom: 20,
      },
      chooseButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 50, // Space between "Choose Artwork" and the "Next" button
        width: '80%',
        alignItems: 'center',
      },
      nextButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 10,
        position: 'absolute',
        bottom: 30,
        right: 30,
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
});
