import { useCallback, useState } from "react";
import { Camera } from "expo-camera";
import { useFocusEffect } from "@react-navigation/native";

export const usePermissionsCamera = () => {
  const [hasPermission, setHasPermission] = useState(null);
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    }, [])
  );
  return {
    hasPermission,
  };
};
