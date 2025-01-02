import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Animated, SafeAreaView } from 'react-native';
import HamburgerMenu from './HamBurgerMenu';
import { AudioContext } from './AudioProvider';
import * as Speech from 'expo-speech';
import theme from '../config/theme';
import CustomNavigationBar from './CustomNavigationBar.js';

export default function PreviewScreen({ route, navigation }) {
  const { images } = route.params || {}; // Receive images array from CameraScreen
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const { isAudioOn, setActiveScreen, activeScreen } = useContext(AudioContext);
  const textToRead = `This is a preview of the picture you took, please make sure that everything is clear and recognisable before proceeding.`;
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
      setActiveScreen('Preview');
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
  
      if (isAudioOn && activeScreen === 'Preview') {
        Speech.speak(textToRead);
      } else {
        Speech.stop();
      }
  
      return () => {
        Speech.stop();
      };
    }, [textToRead, isAudioOn]);

  const __closeDropdown = () => {
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOutsidePress = () => {
    if (dropdownVisible) {
      setDropdownVisible(false); // Close the menu if it's open
    }
  };

  const __retakePicture = () => {
    navigation.goBack(); // Go back to CameraScreen
  };

  const __chooseArtwork = () => {
    navigation.navigate('ChooseArtwork', { artworkKey: 'david' }); // Navigate to ChooseArtworkScreen
  };
  
  const isMultipleImages = Array.isArray(images);

  return (

    <TouchableWithoutFeedback>    
      <View style={styles.container}>
                    
        <CustomNavigationBar
               navigation={navigation}
               showBackButton={false}
               showAudioButton={true}
               onReplayAudio={() => Speech.speak(textToRead)}
               /> 
      {isMultipleImages ? (
        // Multiple Images - Display in a horizontal scroll
        <ScrollView
          horizontal
          pagingEnabled
          contentContainerStyle={styles.imageContainer}
        >
          {images.map((uri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri }} style={styles.image} />
            </View>
          ))}
        </ScrollView>
      ) : images ? (
        // Single Image - Display directly
        <Image source={{ uri: images }} style={styles.image} />
      ) : (
        // No Images
        <Text style={styles.noImagesText}>No images captured</Text>
      )}
      
      <Text style={styles.text}>Does the image looks Good?</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={__retakePicture} style={styles.button}>
          <Text style={styles.textButton}>Re-Take</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={__chooseArtwork} style={styles.button}>
          <Text style={styles.textButton}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>    
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background, // Colore di sfondo dell'app
  },
  container: {
    flex: 1,
    backgroundColor: '#E8F0FF', // Blu chiaro per lo sfondo
    alignItems: 'center',
    justifyContent: 'center',    
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#444444', // Grigio scuro per i testi principali
  },
  header: {
    position: 'absolute',
    top: 50,
    right: 10, // Align to the top-right corner
    zIndex: 10, // Ensure it's above other elements
  },
  menuButton: {
    top: 0,
    right:0,
    padding: 10,
  },
  imageContainer: {
    flexDirection: 'row', // Arrange images horizontally
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    marginBottom: 20,
  },
  imageWrapper: {
    width: 350, // Match image width for paging
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 250,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: -200,
    shadowColor: '#000', // Subtle shadow for depth
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5, // Android shadow
    borderWidth: 1,
    borderColor: '#ddd', // Grigio chiaro per il bordo delle immagini
  },
  noImagesText: {
    fontSize: 18,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 100,
    paddingHorizontal: 0,
  },
  button: {
    backgroundColor: '#007BFF', // blu per i bottoni
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: 120,
    alignItems: 'center',
    shadowColor: 'black', // Shadow for depth
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  textButton: {
    color: '#FFFFFF', // Bianco per il testo nei bottoni
    fontSize: 16,
    fontWeight: 'bold',
  },
});
