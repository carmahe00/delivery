import React from "react";
import { View, Text } from "react-native";
import { StyleSheet, Image, ActivityIndicator } from "react-native";
import { useTheme } from "react-native-paper";
import { useSelector } from "react-redux";

import logoHeader from "../../../assets/images/logo-header.png";

const HeaderInfo = () => {
  const { colors } = useTheme();
  const { loading, valor } = useSelector((state) => state.balance);

  const styles = makeStyles(colors);
  console.log(valor);
  return (
    <View style={styles.container}>
      <Image
        source={logoHeader}
        style={{
          width: 40,
          height: 25,
          resizeMode: "cover",
        }}
      />
      <View style={styles.balance}>
        <Text style={styles.headerTitle}>Saldo:</Text>
        {loading ? (
          <ActivityIndicator size={20} color="#fff" />
        ) : (
          valor && <Text style={styles.headerTitle}>{valor.saldo}</Text>
        )}
      </View>
    </View>
  );
};

const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.bgDark,
      paddingHorizontal: 10,
    },
    balance: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: "30%",
    },
    headerTitle: {
      color: colors.fontLight,
    },
  });

export default HeaderInfo;
