import * as React from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import JualLampuScreen from './screens/JualLampuScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import TransaksiScreen from './screens/TransaksiScreen';
import WebViewScreen from "./screens/WebViewScreen";

// Define the stack navigator's param list
type RootStackParamList = {
  Home: undefined;
  Welcome: undefined;
  Login: undefined;
  JualLampu: undefined;
  Register: undefined;
  Profile: undefined;
  Transaksi: undefined;
  WebView: { link: string }; // Define WebView with a "link" parameter
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Beranda" }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="JualLampu" component={JualLampuScreen} options={{ title: "Jual Lampu" }} />
        <Stack.Screen name="Transaksi" component={TransaksiScreen} options={{ title: "Transaksi" }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="WebView" component={WebViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;