import { View, Text, TextInput, Button, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

const API_URL = 'http://192.168.1.78:3000/mascotas'; // Reemplaza con tu IP correcta

export default function RegistrarScreen() {
  const [nombre, setNombre] = useState('');
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
    if (!nombre || !especie || !sexo || !edad) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('especie', especie);
      formData.append('sexo', sexo);
      formData.append('edad', edad);

      if (imagen) {
        formData.append('picture', {
          uri: imagen.uri,
          name: `mascota_${Date.now()}.jpg`,
          type: 'image/jpeg',
        } as any); // 'as any' es necesario para TypeScript
      }

      // Debug: Mostrar contenido de FormData (alternativa a entries())
      console.log('Enviando datos:', {
        nombre,
        especie,
        sexo,
        edad,
        imagen: imagen ? imagen.uri : 'No hay imagen'
      });

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Estado de respuesta:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error en el servidor');
      }

      const data = await response.json();
      Alert.alert('Éxito', 'Mascota registrada correctamente');
      
      // Limpiar formulario
      setNombre('');
      setEspecie('');
      setSexo('');
      setEdad('');
      setImagen(null);

    } catch (error) {
      console.error('Error completo:', error);
      const errorMessage = typeof error === 'object' && error !== null && 'message' in error
        ? (error as { message?: string }).message
        : 'Error al registrar mascota';
      Alert.alert('Error', errorMessage || 'Error al registrar mascota');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Mascota</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Especie"
        value={especie}
        onChangeText={setEspecie}
      />

      <TextInput
        style={styles.input}
        placeholder="Sexo"
        value={sexo}
        onChangeText={setSexo}
      />

      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
      />

      <Button
        title={imagen ? "Cambiar imagen" : "Seleccionar imagen"}
        onPress={seleccionarImagen}
      />

      {imagen && (
        <Image
          source={{ uri: imagen.uri }}
          style={styles.image}
        />
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title="Registrar"
          onPress={registrarMascota}
          disabled={!nombre || !especie || !sexo || !edad}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 5,
  },
});