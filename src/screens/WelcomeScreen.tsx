import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  const borderAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(borderAnimation, {
        toValue: 1,
        duration: 5000, // Animasi selama 5 detik
        useNativeDriver: false,
      })
    ).start();
  }, [borderAnimation]);

  // Interpolasi untuk warna border
  const borderColor1 = borderAnimation.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: ['#FF0000', '#00FF00', '#0000FF', '#FF0000'], // Warna: Merah, Hijau, Biru
  });

  const borderColor2 = borderAnimation.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: ['#0000FF', '#FF0000', '#00FF00', '#0000FF'], // Warna: Pola berbeda
  });

  return (
    <View style={styles.container}>
      {/* Gabungan Border Animasi dengan Bayangan */}
      <Animated.View
        style={[
          styles.shadowContainer,
          {
            shadowColor: borderColor1,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.animatedBorder,
            {
              borderColor: borderColor1,
              borderRightColor: borderColor2,
              borderBottomColor: borderColor2,
              borderWidth: 4,
            },
          ]}
        >
          <Text style={styles.title}>NS Lamps</Text>
          <Text style={styles.text}>
            NS Lamps adalah usaha elektronik terbaik di Bali, khususnya di bidang lampu.
            Kami menyediakan banyak jasa seperti penjualan lampu biasa, lampu taman,
            lampu dekorasi, lampu ogoh-ogoh, serta penyewaan lampu untuk dekorasi acara.
            Silahkan login untuk memulai.
          </Text>
        </Animated.View>
      </Animated.View>

      {/* Tombol Login */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Tombol Register */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Latar belakang gelap
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  shadowContainer: {
    marginBottom: 30,
    shadowOpacity: 0.9, // Opasitas bayangan
    shadowRadius: 10, // Radius bayangan
    shadowOffset: { width: 0, height: 0 }, // Arah bayangan
  },
  animatedBorder: {
    padding: 15,
    borderRadius: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#BB86FC',
    textAlign: 'center',
    marginBottom: 15,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 25,
  },
  button: {
    backgroundColor: '#BB86FC',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginBottom: 15,
  },
  buttonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default WelcomeScreen;
