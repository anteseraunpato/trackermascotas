import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import MascotaCard from '@/components/MascotaCard';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Colores } from '@/constants/colores';

const API_URL = 'http://192.168.1.78:3000/mascotas'; // Asegúrate que esta IP sea la correcta

type Mascota = {
  id: number;
  nombre: string;
  edad: number;
  especie: string;
  sexo: string;
  picture?: string; // URL de la imagen
};

export default function MascotasScreen() {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMascotas = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setMascotas(data);
    } catch (error) {
      console.error('Error al obtener mascotas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMascotas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tus Mascotas</Text>
      {loading ? (
        <ActivityIndicator size="large" color={Colores.primario} />
      ) : (
        <FlatList
          data={mascotas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MascotaCard mascota={item} />}
          ListEmptyComponent={<Text>No hay mascotas registradas.</Text>}
        />
      )}
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
