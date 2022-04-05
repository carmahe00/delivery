import { useEffect, useRef } from "react";
import { AppState, Vibration } from "react-native";
import BackgroundFetch from "react-native-background-fetch";

export default (socket) => {
  const appState = useRef(AppState.currentState);
  let interval;

  useEffect(() => {
    // Background fetch setup (recommend extracting into separate file)
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 2, // fetch interval in minutes
      },
      async (taskId) => {
        console.log("Received background-fetch event: ", taskId);

        // 4. Send a push notification
        Vibration.vibrate(2000)

        // Call finish upon completion of the background task
        BackgroundFetch.finish(taskId);
      },
      (error) => {
        console.error("RNBackgroundFetch failed to start.");
      }
    );
  }, []);
};
