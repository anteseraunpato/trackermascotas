import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import MascotaCard from '@/components/MascotaCard';
import { router } from 'expo-router';
import { Colores } from '@/constants/colores';

export default function MascotasScreen() {
  const mascotas = [
    { id: '1', nombre: 'Firulais', raza: 'Labrador', edad: 3 },
    { id: '2', nombre: 'Michi', raza: 'Gato', edad: 2 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tus Mascotas</Text>
      <FlatList data={mascotas} keyExtractor={(item) => item.id} renderItem={({ item }) => <MascotaCard mascota={item} />} />
      <View style={{ marginTop: 20 }}>
        <Button title="Registrar nueva mascota" onPress={() => router.push('/registrar')} color={Colores.boton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: Colores.fondoClaro },
  titulo: { fontSize: 24, fontWeight: 'bold', color: Colores.primario, marginBottom: 20 },
});
