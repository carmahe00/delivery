import React from "react";
import { ScrollView } from "react-native";
import { API } from "@env";
import { List, Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const Menu = () => {
  const { userInfo, loading } = useSelector((state) => state.userReducer);
  const navigation = useNavigation();
  if (loading) return <ComponentLoading />;
  return (
    <>
    <ScrollView>
      <List.Section>
        <List.Subheader>Mi Cuenta</List.Subheader>
        <List.Item
          title="Nombre"
          description={userInfo?.usuario.nombre}
          left={(props) => <List.Icon {...props} icon="face" />}
        />
        <List.Item
          title="Imagen"
          description="Imagen actual"
          left={() => (
            <Avatar.Image
              source={{ uri: `${API}${userInfo?.usuario.imagen}` }}
            />
          )}
        />
        <List.Item
          title="Correo"
          description={userInfo?.usuario.email}
          left={(props) => <List.Icon {...props} icon="at" />}
        />

        <List.Item
          title="Celular"
          description={userInfo?.usuario.celular}
          left={(props) => <List.Icon {...props} icon="phone" />}
        />
        <List.Item
          title="Placa"
          description={userInfo?.usuario.placa}
          left={(props) => <List.Icon {...props} icon="car" />}
        />
        <List.Item
          title="Vehiculo"
          description={userInfo?.usuario.tipo_vehiculo}
          left={(props) => <List.Icon {...props} icon="car-estate" />}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>Configurar</List.Subheader>
        <List.Item
          title="Cambiar Constraseña"
          description="Cambia la contraseña de tú cuenta"
          left={(props) => <List.Icon {...props} icon="key" />}
          onPress={() => navigation.navigate("password")}
        />
      </List.Section>
    </ScrollView>
    </>
  );
};

export default Menu;
