import { API } from "@env";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { Card, Paragraph, Button, Avatar } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import stylesForm from "../../styles/form";
import { detailPedido } from "../../actions/pedidosActions";
import ComponentLoading from "../utils/ComponentLoading";

const LeftContent = (name, props) => <Avatar.Icon {...props} icon={name} />;

const OrderDetails = ({ route: { params } }) => {
  const navigation = useNavigation();
  const { pedido, loading } = useSelector((state) => state.pedidosConnect);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(detailPedido(params.id_pedido));
    }, [])
  );

  const navigateToRun = () => {
    
    switch (pedido.estado) {
      case "VA_RECOGER":
        navigation.navigate("home", { screen: "pedido" });
        break;
      case "EN_CAMINO":
        navigation.navigate("home", { screen: "road" });
        break;
      case "ENTREGADO":
        navigation.navigate("home", { screen: "wait" });
        break;
      default:
        navigation.navigate("home", { screen: "main" });
        break;
    }
  };

  if (loading) return <ComponentLoading text="Cargando Pedido" size="large" />;

  return (
    <ScrollView>
      <Card>
        {Object.keys(pedido).length ? (
          <>
            <Card.Cover source={{ uri: `${API}${pedido?.proveedor.imagen}` }} />
            <Card.Title
              title={pedido?.proveedor.nombre}
              subtitle={pedido?.proveedor.celular}
              left={(props) => LeftContent("domain", props)}
            />
            <Card.Title
              title={pedido.nombre}
              left={(props) => LeftContent("account", props)}
            />
            <Card.Title
              title={pedido.celular}
              left={(props) => LeftContent("phone", props)}
            />
            <Card.Title
              title="Valor Domicilio"
              subtitle={pedido.valor_domicilio}
              left={(props) => LeftContent("currency-usd", props)}
            />
            <Card.Title
              title="Valor Pedido"
              subtitle={pedido.valor_pedido}
              left={(props) => LeftContent("currency-usd", props)}
            />
            <Card.Title
              title="Valor Seguro"
              subtitle={pedido.valor_seguro}
              left={(props) => LeftContent("book-lock", props)}
            />
            <Card.Title
              title={pedido.celular}
              left={(props) => LeftContent("phone", props)}
            />
            <Card.Title
              title="Recoger en:"
              subtitle={pedido.recoger}
              left={(props) => LeftContent("map-marker", props)}
            />
            <Card.Title
              title="Entregar en:"
              subtitle={pedido.entregar}
              left={(props) => LeftContent("map-marker", props)}
            />
            <Card.Title
              title="Forma de pago"
              subtitle={pedido.forma_pago}
              left={(props) => LeftContent("handshake", props)}
            />
            <Card.Title
              title="Asegurado"
              left={(props) =>
                LeftContent(
                  pedido?.asegurar ? "check-bold" : "alpha-x-circle",
                  props
                )
              }
            />
            <Card.Title
              title="Evidencia"
              left={(props) =>
                LeftContent(
                  pedido?.evidencia ? "check-bold" : "alpha-x-circle",
                  props
                )
              }
            />
            <Card.Title
              title="Estado"
              subtitle={pedido?.estado}
              left={(props) => LeftContent("flag-checkered", props)}
            />
            <Card.Content>
              <Paragraph>{pedido?.descripcion}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                style={stylesForm.btnSuccess}
                icon="flag-checkered"
                onPress={navigateToRun}
              >
                <Text style={stylesForm.textSuccess}>Continuar</Text>
              </Button>
            </Card.Actions>
          </>
        ) : (
          <View style={styles.container}>
            <Text>No tiene actualmente un pedido</Text>
          </View>
        )}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default OrderDetails;
