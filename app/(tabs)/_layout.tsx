// app/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Colores } from '@/constants/colores';

export default function TabLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: Colores.primario,
          },
          headerTintColor: Colores.fondoClaro,
          tabBarActiveTintColor: Colores.primario,
          tabBarInactiveTintColor: Colores.textoSecundario,
          tabBarStyle: {
            backgroundColor: Colores.fondoClaro,
            borderTopColor: Colores.neutro,
          },
        }}
      >
        <Tabs.Screen
          name="(tabs)/mascotas"
          options={{
            title: 'Inicio',
            tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="(tabs)/ubicacion"
          options={{
            title: 'Ubicación',
            tabBarIcon: ({ color, size }) => <Ionicons name="location" color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="(tabs)/perfil"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="(tabs)/configuracion"
          options={{
            title: 'Configuración',
            tabBarIcon: ({ color, size }) => <Ionicons name="settings" color={color} size={size} />,
          }}
        />
      </Tabs>
    </>
  );
}
