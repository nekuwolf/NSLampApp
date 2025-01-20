import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { postLogin, storeIdToken, isIdTokenPresent, removeIdToken, getAccountInfo,  } from "../services/AccountService";

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<any, any>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Harap isi semua kolom!");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Error", "Alamat Email harus berisi @!");
      return;
    }

    try {
      const res = await postLogin(email, password);
      Alert.alert("Success", "Login berhasil!");

      // Store id token
      await storeIdToken(res.data.idToken);

      // Update login state
      setIsLoggedIn(true);

      // Fetch user info
      const userInfo = await getAccountInfo();
      setFullName(userInfo.data.data.fullName);

      navigation.navigate("Home");
    } catch (error: any) {
      console.error("Login error:", error);
      Alert.alert("Error", error.message || "Terjadi masalah dengan server.");
    }
  };

  const checkLoginStatus = async () => {
    const loggedIn = await isIdTokenPresent();
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      const userInfo = await getAccountInfo();
      setFullName(userInfo.data.data.fullName);
    }
  };

  const handleLogout = async () => {
    await removeIdToken();
    setIsLoggedIn(false);
    Alert.alert("Logged out", "Berhasil logged out.");
  };

  useEffect(() => {
    checkLoginStatus(); // Check login status on screen load
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>NS Electronics</Text>
      </View>

      {/* Conditional UI */}
      {isLoggedIn ? (
        <View>
          <Text style={styles.text}>Halo, {fullName}!</Text>
          <Text style={styles.text}>Anda telah login. Selamat datang di NS Electronics!</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.buttonText}>Kembali ke beranda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 NS Electronics</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Latar belakang gelap
    justifyContent: "space-between",
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#BB86FC",
    textAlign: "center",
  },
  form: {
    marginVertical: 20,
  },
  input: {
    height: 50,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#1F1F1F",
    fontSize: 16,
    color: "#fff",
  },
  loginButton: {
    backgroundColor: "#BB86FC",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  loginButtonText: {
    color: "#121212",
    fontSize: 18,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#BB86FC",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#121212",
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    marginBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: "#888",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default LoginScreen;
