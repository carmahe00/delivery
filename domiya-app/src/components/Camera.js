import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";

import { Camera } from "expo-camera";
import { useCamera } from "../hooks/useCamera";
import ComponentLoading from "./utils/ComponentLoading";

const CameraScreen = () => {
  const {
    cameraRef,
    isFocused,
    isVisible,
    hasPermission,
    cameraType,
    snap,
    snapUpload,
    cancelPreview,
    onCameraReady,
    switchCamera,
    isCameraReady,
    isPreview,
    loading,
  } = useCamera();

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No hay accesso a la camara</Text>;
  }

  return (
    <>
      {isVisible &&
        isFocused &&
        (!loading ? (
          <Camera
            ref={(camera) => (cameraRef.current = camera)}
            type={cameraType}
            ratio={"16:9"}
            style={styles.camera}
            onCameraReady={onCameraReady}
            useCamera2Api={true}
            onMountError={(error) => {
              console.log(JSON.stringify(error));
            }}
          >
            <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
              <Avatar.Icon
                size={75}
                icon="swap-horizontal"
                style={styles.switchCamera}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={snap} disabled={isPreview} >
              <Avatar.Icon
                size={75}
                icon="circle-slice-8"
                style={styles.button}
                color="#fff"
              />
            </TouchableOpacity>

            {isPreview && (
              <View>
                <TouchableOpacity onPress={cancelPreview}>
                  <Avatar.Icon
                    size={75}
                    icon="close"
                    style={styles.button}
                    color="#fff"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={snapUpload}>
                  <Avatar.Icon
                    size={75}
                    icon="check"
                    style={styles.button}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            )}
          </Camera>
        ) : (
          <ComponentLoading text="Enviando Foto" />
        ))}
    </>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "rgba(0, 0, 255, 0.2);",
  },
  switchCamera: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(0, 0, 255, 0.2);",
  },
  text: {
    color: "white",
  },
});

export default CameraScreen;
