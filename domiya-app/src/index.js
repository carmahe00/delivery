import { useSelector } from "react-redux";
import { StyleSheet, SafeAreaView } from "react-native";

import PublicNavigation from "./navigation/PublicNavigation";
import AuthNavigation from "./navigation/private/AuthNavigation";
import ComponentLoading from "./components/utils/ComponentLoading";
import { SocketProvider } from "./context/SocketProvider";

export default function Index() {
  const { userInfo, loading } = useSelector((state) => state.userReducer);
  

  if (loading) return <ComponentLoading />;

  return (
    <SafeAreaView style={styles.root}>
      {userInfo && Object.keys(userInfo).length ? (
        <>
          <SocketProvider>
            <AuthNavigation />
          </SocketProvider>
        </>
      ) : (
        <PublicNavigation />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9FBFC",
  },
});
