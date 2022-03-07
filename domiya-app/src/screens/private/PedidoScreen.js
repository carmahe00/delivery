import React, { useContext, useEffect } from "react";
import { Card, Avatar, Paragraph, Button } from "react-native-paper";
import { API } from "@env";
import { ScrollView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import stylesForm from "../../styles/form";

const LeftContent = (name, props) => <Avatar.Icon {...props} icon={name} />;

const PedidoScreen = () => {
  const navigation = useNavigation();
  const { pedido } = useSelector((state) => state.pedidosConnect);
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
        break;
    }
  };

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
              left={(props) =>
                LeftContent(
                  "flag-checkered",
                  props
                )
              }
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
                <Text style={stylesForm.textSuccess}>Seguir</Text>
              </Button>
            </Card.Actions>
          </>
        ) : (
          <Text>No tiene actualmente un pedido</Text>
        )}
      </Card>
    </ScrollView>
  );
};

export default PedidoScreen;
