import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { router } from 'expo-router';
import { Colores } from '@/constants/colores';

export default function UbicacionScreen() {
  const ubicacion = {
    latitude: 19.4326,
    longitude: -99.1332,
    status: 'OK',
    timestamp: new Date().toISOString(),
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ubicación de tu mascota</Text>

      <MapView
        style={styles.mapa}
        initialRegion={{
          latitude: ubicacion.latitude,
          longitude: ubicacion.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={ubicacion} />
      </MapView>

      <View style={styles.botones}>
        <Button title="Registrar Mascota" onPress={() => router.push('/registrar')} color={Colores.boton} />
        <View style={{ height: 10 }} />
        <Button title="Ver Lista" onPress={() => router.push('/mascotas')} color={Colores.boton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, alignItems: 'center', backgroundColor: Colores.fondoClaro },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: Colores.primario },
  mapa: { width: Dimensions.get('window').width * 0.9, height: 300, borderRadius: 10 },
  botones: { marginTop: 20, width: '80%' },
});
