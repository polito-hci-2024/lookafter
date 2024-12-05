import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image, Platform } from 'react-native';
import { Camera,CameraView, CameraType } from 'expo-camera';
import Webcam from 'react-webcam';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import PreviewScreen from './PreviewScreen.js'

export default function CameraScreen() {
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
    
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') {
        setStartCamera(true);
      } else {
        Alert.alert('Access denied');
      }
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      // setPermission(status === 'granted');
      // const { status: mediaLibraryStatus } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    // if (mediaLibraryStatus !== 'granted') {
    //   Alert.alert('Sorry, we need camera roll permissions to make this work!');
    // }
    setHasMediaLibraryPermission(mediaLibraryPermission === 'granted')
    })();
  }, []);
    
  const __startCamera = async () => {
   
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') {
        setStartCamera(true);
      } else {
        Alert.alert('Access denied');
      }
    
  };
  
  const __takePicture = async () => {
    if (cameraRef.current) { // Ensure cameraRef is valid
      console.log("Taking picture...");
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log("Captured photo URI:", photo.uri);
        // navigation.navigate('Preview', { imageUri: photo.uri });
        const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
        if(mediaLibraryPermission.status != 'granted'){
          Alert.alert(
            'Permission Denied',
            'Media Library access is required to save photos.'
          );
          return;
        }
        await MediaLibrary.saveToLibraryAsync(photo.uri);
        setCapturedImage(photo); // Store captured image
        setPreviewVisible(true); // Navigate to Preview if picture is captured
        Alert.alert('Photo Saved', 'Photo saved to your device\'s gallery.');
        navigation.navigate('Preview', { imageUri: photo.uri });
      } catch (error) {
        console.error("Error capturing photo:", error);
        Alert.alert("Error", "Failed to capture image. Please try again.");
      }
    } else {
      Alert.alert('Camera not initialized');
    }
  };
  
    const __handleFlashMode = () => {
      if (flashMode === 'on') {
        setFlashMode('off');
      } else if (flashMode === 'off') {
        setFlashMode('on');
      } else {
        setFlashMode('auto');
      }
    };
  
    const __switchCamera = () => {
      setCameraType(cameraType === 'back' ? 'front' : 'back');
    };

    const handleWebcamCapture = () => {
      const screenshot = webcamRef.current.getScreenshot();
      if (screenshot) {
        // Handle captured image data from webcam (e.g., save to device)
        console.log('Captured image from webcam:', screenshot);
        // You can potentially use MediaLibrary.saveToLibraryAsync here if needed
      }
    };
  
    // if (!hasPermission && Platform.OS !== 'web') {
    //   return <Text>Requesting camera permission...</Text>;
    // }
  
    // if (!hasMediaLibraryPermission && Platform.OS !== 'web') {
    //   return <Text>Requesting media library permission...</Text>;
    // }
  
    return (
      <View style={styles.container}>
        {
          Platform.OS === 'web' ? (
            <View style={styles.cameraContainer}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              style={styles.camera}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={__takePicture} style={styles.button}>
                <Text style={styles.text}>Take Picture</Text>
              </TouchableOpacity>
            </View>
          </View>
            
            
          ) : (
            <CameraView style={styles.camera} type={cameraType} ref={cameraRef}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={__switchCamera} style={styles.button}>
                  <Text style={styles.text}>Switch Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={__takePicture} style={styles.button}>
                  <Text style={styles.text}>Take Picture</Text>
                </TouchableOpacity>
              </View>
            </CameraView>
          )
        }
      </View>
    );

  
    // return (
    //     <View style={styles.container}>
    //     {startCamera ? (
    //       <View style={styles.cameraContainer}>
    //         {/* <Camera
    //           type={cameraType}
    //           flashMode={flashMode}
    //           style={styles.camera}
    //           ref={(r) => (camera = r)}
    //         >
    //           <View style={styles.buttonContainer}>
    //             <TouchableOpacity onPress={__switchCamera} style={styles.button}>
    //               <Text style={styles.text}>Switch Camera</Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity onPress={__takePicture} style={styles.button}>
    //               <Text style={styles.text}>Take Picture</Text>
    //             </TouchableOpacity>
    //           </View>
    //         </Camera> */}
    //         <Webcam
    //     audio={false}
    //     ref={webcamRef}
    //     screenshotFormat="image/jpeg"
    //     width="100%"
    //   />
    //       </View>
    //     ) : (
    //       <View style={styles.startContainer}>
    //         <TouchableOpacity onPress={__startCamera} style={styles.startButton}>
    //           <Text style={styles.text}>Start Camera</Text>
    //         </TouchableOpacity>
    //       </View>
    //     )}
    //   </View>
    // );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    camera: {
      flex: 1, // This makes the Camera view take up the full container
      width: '100%',
      height: '100%',
    },
  });
  
  const CameraPreview = ({ photo, retakePicture, savePhoto }) => {
    console.log('Captured photo:', photo);
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          width: '100%',
          height: '100%',
        }}
      >
        <ImageBackground
          source={{ uri: photo && photo.uri }}
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              padding: 15,
              justifyContent: 'flex-end',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                onPress={retakePicture}
                style={{
                  width: 130,
                  height: 40,
                  alignItems: 'center',
                  borderRadius: 4,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 20 }}>Re-take</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={savePhoto}
                style={{
                  width: 130,
                  height: 40,
                  alignItems: 'center',
                  borderRadius: 4,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 20 }}>Save Photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
};
