import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

export const useMounted = () => {
  const [isVisible, setIsVisible] = useState(false);
  useFocusEffect(
    useCallback(() => {
      setIsVisible(true);

      return () => {
        setIsVisible(false);
      };
    }, [])
  );
  return {
    isVisible,
  };
};
