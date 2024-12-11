import React from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native';

export default function ArtworkReached({ navigation }) {
  const handleProceed = () => {
    navigation.navigate('ArtworkInformations');
  };

  return (
    <View style={styles.container}>
        {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={require('../assets/monalisa.png')} // Replace with actual image URI
          style={styles.headerImage}
        />
        
      </View>
      {/*main Content */}
      <View style={styles.content}>
      <Text style={styles.description}>
        Congratulations, you reached me!
      </Text>
      </View>

      {/* Process button  */}
      <TouchableOpacity onPress={handleProceed} style={styles.proceedButton}>
        <Text style={styles.buttonText}>Get Info about me</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 40,
    },
    description: {
        fontSize: 30,
        color: '#333',
        textAlign: 'center', // Center-align the text horizontally
        marginBottom: 20, // Adds space above the button
      },
    header: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 40,
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
      position: 'absolute',
      bottom: 30,
      right: 20,
      backgroundColor: '#d32f2f',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
