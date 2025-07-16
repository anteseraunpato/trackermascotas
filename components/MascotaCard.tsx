import { View, Text, StyleSheet, Image } from 'react-native';
import { Colores } from '@/constants/colores';

interface Props {
  mascota: {
    nombre: string;
    raza: string;
    edad: number;
  };
}

export default function MascotaCard({ mascota }: Props) {
  return (
    <View style={styles.card}>
      <Image source={require('@/assets/images/perrito.png')} style={styles.foto} />
      <View>
        <Text style={styles.nombre}>{mascota.nombre}</Text>
        <Text style={styles.detalle}>Raza: {mascota.raza}</Text>
        <Text style={styles.detalle}>Edad: {mascota.edad} años</Text>
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
});
