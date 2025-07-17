import { View, Text, StyleSheet, Image } from 'react-native';
import { Colores } from '@/constants/colores';

interface Props {
  mascota: {
    nombre: string;
    edad: number;
    especie: string;
    sexo: string;
    picture?: string; 
  };
}

export default function MascotaCard({ mascota }: Props) {
  const imagenPorDefecto = '@/assets/images/perrito.png'; 
  const imagen = mascota.picture && mascota.picture.trim() !== '' ? mascota.picture : imagenPorDefecto;

  return (
    <View style={styles.card}>
      <Image source={{ uri: imagen }} style={styles.imagen} />
      <View>
        <Text style={styles.nombre}>{mascota.nombre}</Text>
        <Text style={styles.detalle}>Edad: {mascota.edad} años</Text>
        <Text style={styles.detalle}>especie: {mascota.especie}</Text>
        <Text style={styles.detalle}>sexo: {mascota.sexo}</Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colores.primario,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  foto: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  nombre: { fontSize: 18, fontWeight: 'bold', color: Colores.fondoClaro },
  detalle: { color: Colores.fondoClaro },
  imagen: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
});
