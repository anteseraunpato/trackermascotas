import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './app/AppNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}