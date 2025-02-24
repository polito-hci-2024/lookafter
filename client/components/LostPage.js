import React, { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image,TouchableWithoutFeedback, Alert, Platform, Animated, Vibration, SafeAreaView } from 'react-native';
import { AudioContext } from './AudioProvider';
import { useNavigation, useFocusEffect} from '@react-navigation/native';
import theme, {useCustomFonts} from '../config/theme';
import * as Speech from 'expo-speech';
import CustomNavigationBar from './CustomNavigationBar.js';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function LostPage({ navigation }) {
  // const navigation = useNavigation();
  const fontsLoaded = useCustomFonts();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
   const textToRead = "Ti sei perso, per favore fai un'altra foto dell'area attorno a te!";
  
    const { isAudioOn, setActiveScreen} = useContext(AudioContext);


    useFocusEffect(
          useCallback(() => {
            setActiveScreen('LostPage'); // Update the active screen
            
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

      useEffect(() => {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }).start();
        }, []);

        const toggleDropdown = () => {
          setDropdownVisible(!dropdownVisible);
        };
      
        const handleOutsidePress = () => {
          if (dropdownVisible) {
            setDropdownVisible(false); // Close the menu if it's open
          }
        };

  const handleProceed = () => {
          Speech.stop();
          navigation.navigate('CameraScreen3');
        
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
        {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={require('../assets/warning.png')} // Replace with actual image URI
          style={styles.headerImage}
        />
        
      </View>
      {/*main Content */}
      

      <View style={styles.content}>
              <View style={styles.directionContainer}>
                <Text style={styles.directionHeader}>Ti sei perso</Text>
                <Text style={styles.description}>
                  Ti sei perso, per favore fai un'altra foto dell'area attorno a te!
                </Text>
              </View>
              
      </View>

      {/* Process button  */}
      <TouchableOpacity onPress={handleProceed} style={styles.proceedButton}>
        <Text style={styles.buttonText}>Rifai Foto</Text>
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
    description: {
        fontSize: 24,
        color: '#333',
        textAlign: 'center', // Center-align the text horizontally
        marginBottom: 20, // Adds space above the button
      },
    header: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 40,
      top: 100,
    },
    directionContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 15,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 6,
      width: '90%',
    },
    directionHeader: {
      fontSize: 34,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
      color: '#0055A4',
    },
    headerImage: {
      width: 300,
      height: 300,
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerIcons: {
      flexDirection: 'row',
    },
    icon: {
      width: 30,
      height: 30,
      marginLeft: 10,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: '#d32f2f',
      textAlign: 'center',
      marginBottom: 20,
      fontWeight: 'bold',
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
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
