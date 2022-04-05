import { useState, useRef, useContext } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Constants } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import { useSelector } from "react-redux";

import { SocketContext } from "../context/SocketProvider";
import { useMounted } from "../hooks/useMounted";
import { usePermissionsCamera } from "./usePermissionsCamera";

export const useCamera = () => {
  const cameraRef = useRef();
  const isFocused = useIsFocused();
  const { isVisible } = useMounted();
  const navigation = useNavigation();
  const { hasPermission } = usePermissionsCamera();
  const [isPreview, setIsPreview] = useState(false);
  const [loading, setLoading] = useState(false)

  const { socket } = useContext(SocketContext);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const { pedido } = useSelector((state) => state.pedidosConnect);
  const [cameraType, setCameraType] = useState(Constants.Type.back);

  const snap = async () => {
    if (cameraRef.current) {
      await cameraRef.current.pausePreview();
      setIsPreview(true);
    }
  };

  const snapUpload = async () => {
    if (cameraRef.current && isCameraReady) {
      const data = await cameraRef.current.takePictureAsync();

      const manipulator = await ImageManipulator.manipulateAsync(
        data.uri,
        [{ resize: { width: 500, height: 700 } }],
        {
          compress: 1,
          format: ImageManipulator.SaveFormat.PNG,
          base64: true,
        }
      );
      setLoading(true)
      socket?.emit(
        "domicilio:imagen",
        manipulator.base64,
        pedido,
        navigateToWait
      );
    }
  };

  const navigateToWait = () => {
    navigation.navigate("home", {screen: "wait"});
    setLoading(false)
  };

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Constants.Type.back
        ? Constants.Type.front
        : Constants.Type.back
    );
  };
  return {
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
    loading
  };
};
