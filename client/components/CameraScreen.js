import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Alert, Platform, Animated, Vibration, SafeAreaView } from 'react-native';
import { Camera, CameraView, CameraType } from 'expo-camera';
import Webcam from 'react-webcam';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import { AudioContext } from './AudioProvider';
import * as Speech from 'expo-speech';
import HamburgerMenu from './HamBurgerMenu.js';

import CustomNavigationBar from './CustomNavigationBar.js';
import theme, { useCustomFonts } from '../config/theme';


export default function CameraScreen() {
  const fontsLoaded = useCustomFonts();

  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraType, setCameraType] = useState('back');
  const [flashMode, setFlashMode] = useState('off');
  const webcamRef = React.useRef(null);
  const cameraRef = React.useRef(null);
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);

  const [fadeAnim] = useState(new Animated.Value(0));
  const [dropdownVisible, setDropdownVisible] = useState(false);

  

  const textToRead = "Quando ti senti pronto, inquadra l'ambiente che ti circonda e tocca il pulsante Scatta Foto.";

  const { isAudioOn,setActiveScreen } = useContext(AudioContext); // Prende lo stato audio globale
  useFocusEffect(
    useCallback(() => {
      setActiveScreen('CameraScreen'); // Update the active screen
      
      
      if (fontsLoaded && isAudioOn) {
        Speech.stop(); // Stop any ongoing speech
        
        setTimeout(() => {
          console.log("Speaking:", textToRead); // Debugging: Check if this runs
          
          Speech.speak(textToRead, {
            language: 'it-IT', // Ensure Italian is selected if needed
            pitch: 1.0, // Normal pitch
            rate: 1.3, // Adjust speed if needed
            onStart: () => console.log("Speech started"),
            onDone: () => console.log("Speech finished"),
            onError: (error) => console.error("Speech error:", error),
          });
        }, 500); // Delay to ensure smooth playback
      }
  
      return () => {
        Speech.stop(); // Stop speech when leaving the screen
      };
    }, [fontsLoaded, isAudioOn, textToRead])
  );
   // Dipendenza: si aggiorna se cambia isAudioOn


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') {
        setStartCamera(true);
      } else {
        Alert.alert('Access denied');
      }
      // const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      // setHasMediaLibraryPermission(mediaLibraryPermission === 'granted');
    })();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  const __takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,   // Ensures highest quality (default is 1, but make sure it's set)
          base64: false // Prevents unnecessary data transformation
        });
        // const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
        // if (mediaLibraryPermission.status !== 'granted') {
        //   Alert.alert(
        //     'Permission Denied',
        //     'Media Library access is required to save photos.'
        //   );
        //   return;
        // }
        setCapturedImage(photo);
        setPreviewVisible(true);
        // Alert.alert('Photo Saved', 'Photo saved to your device\'s gallery.');
        Speech.stop();
        navigation.navigate('Preview', { images: photo.uri });
      } catch (error) {
        console.error('Error capturing photo:', error);
        Alert.alert('Error', 'Failed to capture image. Please try again.');
      }
    } else {
      Alert.alert('Camera not initialized');
    }
  };

  const handleButtonPress = (callback) => {
    //Vibration.vibrate([100, 200, 100]); // Vibrate on button press

    Animated.spring(fadeAnim, {
      toValue: 1.2, // Scale up
      friction: 3,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(fadeAnim, {
        toValue: 1, // Return to normal size
        friction: 3,
        useNativeDriver: true,
      }).start();
    });

    callback(); // Execute the button's action
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOutsidePress = () => {
    if (dropdownVisible) {
      setDropdownVisible(false); // Close the menu if it's open
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>      
      <View style={styles.container}>
        <CustomNavigationBar
          navigation={navigation}
          isVisible={dropdownVisible} 
          toggleDropdown={toggleDropdown}
          showBackButton={false}
          showAudioButton={true}
          onReplayAudio={() => Speech.speak(textToRead, {
                                  language: 'it-IT', // Ensure Italian is selected if needed
                                  pitch: 1.0, // Normal pitch
                                  rate: 1.3, // Adjust speed if needed
                                  onStart: () => console.log("Speech started"),
                                  onDone: () => console.log("Speech finished"),
                                  onError: (error) => console.error("Speech error:", error),
                                })}
          />
        {Platform.OS === "web" ? (
          <View style={styles.cameraContainer}>
            <View style={styles.webCameraWrapper}>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  width: 1280,
                  height: 720,
                  facingMode: "user",
                }}
                style={styles.webCamera}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                handleButtonPress(() => {
                  const screenshot = webcamRef.current.getScreenshot();
                  if (screenshot) {
                    navigation.navigate("Preview", { images: screenshot });
                  }
                });
              }}
              style={styles.takePictureButton}
            >
              <Text style={styles.buttonText}>Take Picture</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <CameraView
            style={styles.camera}
            type={cameraType}
            ref={cameraRef}
          >
            <TouchableOpacity 
              onPress={() => handleButtonPress(__takePicture)} 
              style={styles.takePictureButton}
            >
              <Text style={styles.buttonText}>Scatta Foto</Text>
            </TouchableOpacity>
          </CameraView>
        )}
      </View>      
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.primary, // Colore di sfondo dell'app
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary, // Main background color (white)
  },
  header: {
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-between', // Spread items to the left and right
    alignItems: 'center', // Align items vertically
    width: '100%', // Full width of the header
    paddingHorizontal: 16, // Add padding to the sides
    paddingVertical: 10, // Add padding to the top and bottom
    position: 'absolute',
    top: 40, // Position the header at the top
    zIndex: 10, // Ensure it appears above other content
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center', // Keep it simple, no background
  },
  hamburgerMenuWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  munustyle:{
    padding: 10, // Keep it simple, no background
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black", 
    overflow: "hidden",
    position: "relative",
  },
  webCameraWrapper: {
    flex: 1, // Ensures it takes up the full container space
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", 
  },
  webCamera: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  takePictureButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#E8F0FF", 
    borderRadius: 70,
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 3,
    borderColor: "#0055A4", // Blue border for contrast
  },
  buttonText: {
    fontSize: 16,
    color: "#0055A4", // Blue text for contrast
    fontWeight: "bold",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
});
