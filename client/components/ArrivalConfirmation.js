import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, TouchableOpacity, Alert, Animated } from 'react-native';
import { AudioContext } from './AudioProvider';
import * as Speech from 'expo-speech';
import CustomNavigationBar from './CustomNavigationBar.js';
import theme from '../config/theme';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const artworkDetails = {
  monalisa: {
    name: 'Mona Lisa',
    image: require('../assets/monalisa.png'),
    nextScreen: 'CameraConfirmation',
  },
  david: {
    name: 'Il David',
    image: require('../assets/david.png'),
    nextScreen: 'CameraConfirmation',
  },
};


export default function ConfirmArtwork({ route, navigation }) {
  const { artworkKey } = route.params || {};
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { isAudioOn } = useContext(AudioContext);
  const textToRead = `Per confermare che mi hai raggiunto, premi su conferma e scattami una foto!`;
  const [fadeAnim] = useState(new Animated.Value(0));
  const artwork = artworkDetails[artworkKey];

  useEffect(() => {
    if (isAudioOn) {
      Speech.speak(textToRead);
    }
    return () => {
      Speech.stop();
    };
  }, [isAudioOn]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  if (!artwork) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Artwork not found</Text>
      </View>
    );
  }

  const handleProceed = () => {
    Speech.stop();
    navigation.navigate(artwork.nextScreen, { artworkKey });
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOutsidePress = () => {
    if (dropdownVisible) {
      setDropdownVisible(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        <CustomNavigationBar
          navigation={navigation}
          isVisible={dropdownVisible}
          toggleDropdown={toggleDropdown}
          showBackButton={true}
          showAudioButton={true}
          onReplayAudio={() => Speech.speak(textToRead)}
        />
        
        <View style={styles.container2}>
          <Text style={styles.artworkTitle}>{artwork.name}</Text>
          <Image source={artwork.image} style={styles.headerImage} />
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <View style={styles.directionContainer}>
            <Text style={styles.directionHeader}>Mi hai raggiunto?</Text>
            <Text style={styles.stepText}>
              Per confermare che mi abbia raggiunto, scattami una foto!
            </Text>
          </View>
        </View>

        {/* Proceed Button */}
        <TouchableOpacity onPress={handleProceed} style={styles.proceedButton}>
          <Text style={styles.buttonText}>Conferma</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  headerImage: {
    width: 160,
    height: 160,
    // borderRadius: 50,
    // borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: 'transparent',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 6,
    // elevation: 5,
    top: '15%',
    alignContent: 'contain',
    resizeMode: 'contain',
    zIndex: 30,
  },
  
  artworkTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    color: '#0055A4',
    top: '10%',
    width: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
  },
  directionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: 40, // Keeps top and bottom padding
    paddingHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    width: '90%',
  },
  directionHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#0055A4',
  },
  stepText: {
    fontSize: 20,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
  },
  proceedButton: {
    backgroundColor: '#0055A4',
    width: width * 0.92,
    height: height * 0.08,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
  buttonText: {
    fontSize: 20,
    color: theme.colors.background,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
});
