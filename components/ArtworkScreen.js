import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function ChooseArtworkScreen({ route, navigation }) {
  const { images } = route.params || {}; // Receive the array of image URIs from PreviewScreen
  const imageList = Array.isArray(images) ? images : [images]; // Ensure images is always an array
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current image index

  const handleChooseArtwork = () => {
    // console.log('Artwork selected for:', images[currentIndex]);
    navigation.navigate('PathDetails');
  };

  const handleNext = () => {
    if (currentIndex < imageList.length - 1) {
      setCurrentIndex(currentIndex + 1); // Go to the next image
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Go to the previous image
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose an Artwork for Your Image</Text>
      <Image source={{ uri: imageList[currentIndex] }} style={styles.image} />
      <Text style={styles.artworkName}>
        Image {currentIndex + 1} of {imageList.length}
      </Text>

      <TouchableOpacity onPress={handleChooseArtwork} style={styles.chooseButton}>
        <Text style={styles.buttonText}>Choose Artwork</Text>
      </TouchableOpacity>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        {/* Previous Button */}
        {currentIndex > 0 && (
          <TouchableOpacity onPress={handlePrevious} style={styles.previousButton}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Next Button Always Fixed on the Right */}
      {currentIndex < imageList.length - 1 && (
        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      )}
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
    fontSize: 24,
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
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  chooseButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20, // Always align "Previous" button on the left
  },
  previousButton: {
    backgroundColor: '#6c757d',
    padding: 15,
    borderRadius: 10,
    width: 120,
    alignItems: 'center',
  },
  nextButton: {
    position: 'absolute',
    bottom: 30,
    right: 20, // Always align "Next" button on the right
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    width: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
