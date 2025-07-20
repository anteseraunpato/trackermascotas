import { View, Text, TextInput, Button, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Colores } from '@/constants/colores';

const API_URL = 'http://192.168.1.127:3000/mascotas'; // Asegúrate que esta IP sea correcta

export default function RegistrarScreen() {
  const [nombre, setNombre] = useState('');
  const [raza, setRaza] = useState('');
  const [color, setColor] = useState('');
  const [caracteristicas, setCaracteristicas] = useState('');
  const [especie, setEspecie] = useState('');
  const [sexo, setSexo] = useState('');
  const [edad, setEdad] = useState('');
  const [imagen, setImagen] = useState<{ uri: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const seleccionarImagen = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a tus fotos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImagen(result.assets[0]);
    }
  };

  const registrarMascota = async () => {
    // Validación de campos requeridos
    if (!nombre || !raza || !especie || !sexo || !edad) {
      Alert.alert('Error', 'Los campos marcados con * son obligatorios');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('raza', raza);
      formData.append('color', color);
      formData.append('caracteristicas', caracteristicas);
      formData.append('especie', especie);
      formData.append('sexo', sexo);
      formData.append('edad', edad);

      if (imagen) {
        formData.append('picture', {
          uri: imagen.uri,
          name: `mascota_${Date.now()}.jpg`,
          type: 'image/jpeg',
        } as any);
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error en el servidor');
      }

      Alert.alert('Éxito', 'Mascota registrada correctamente');
      
      // Limpiar formulario
      setNombre('');
      setRaza('');
      setColor('');
      setCaracteristicas('');
      setEspecie('');
      setSexo('');
      setEdad('');
      setImagen(null);

    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error al registrar mascota';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registrar Mascota</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre *"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Raza *"
        value={raza}
        onChangeText={setRaza}
      />

      <TextInput
        style={styles.input}
        placeholder="Color"
        value={color}
        onChangeText={setColor}
      />

      <TextInput
        style={styles.input}
        placeholder="Características"
        value={caracteristicas}
        onChangeText={setCaracteristicas}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Especie *"
        value={especie}
        onChangeText={setEspecie}
      />

      <TextInput
        style={styles.input}
        placeholder="Sexo *"
        value={sexo}
        onChangeText={setSexo}
      />

      <TextInput
        style={styles.input}
        placeholder="Edad *"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
      />

      <Button
        title={imagen ? "Cambiar imagen" : "Seleccionar imagen"}
        onPress={seleccionarImagen}
        color={Colores.primario}
      />

      {imagen && (
        <Image
          source={{ uri: imagen.uri }}
          style={styles.imagen}
        />
      )}

      {loading ? (
        <ActivityIndicator size="large" color={Colores.primario} />
      ) : (
        <View style={styles.botonContainer}>
          <Button
            title="Registrar"
            onPress={registrarMascota}
            disabled={!nombre || !raza || !especie || !sexo || !edad}
            color={Colores.boton}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colores.fondoClaro,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colores.primario,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 12,
    borderRadius: 8,
    borderColor: Colores.neutro,
    borderWidth: 1,
  },
  imagen: {
    width: 150,
    height: 150,
    marginVertical: 15,
    alignSelf: 'center',
    borderRadius: 8,
  },
  botonContainer: {
    marginTop: 20,
  },
});