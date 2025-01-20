import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { postRegister } from "../services/AccountService";
import { StackActions } from "@react-navigation/native";

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<any, any>;
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleRegister = async () => {
    if (!fullName || !email || !password || !repeatPassword) {
      Alert.alert("Error", "Harap isi semua kolom!");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Error", "Alamat Email harus berisi @!");
      return;
    }

    if (password !== repeatPassword) {
      Alert.alert("Error", "Password dan Repeat Password harus sama!");
      return;
    }

    try {
      const res = await postRegister(fullName, email, password, phone, address);
      Alert.alert("Success", "Registrasi berhasil! Silahkan login.");

      // Optionally log the server response
      console.log("Registration response:", res.data);

      // Navigate to the Login screen
      // navigation.navigate("Login");
      navigation.dispatch(StackActions.popToTop());
    } catch (error: any) {
      console.error("Registration error:", error);
      Alert.alert("Error", error.message || "Terjadi masalah dengan server.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Register</Text>
      </View>

      {/* Form Register */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nama"
          placeholderTextColor="#888"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Nomer Telepon"
          placeholderTextColor="#888"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          style={styles.input}
          placeholder="Alamat Rumah"
          placeholderTextColor="#888"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Repeat Password"
          placeholderTextColor="#888"
          secureTextEntry={true}
          value={repeatPassword}
          onChangeText={setRepeatPassword}
        />
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 NS Electronics</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.footerLink}>Sudah punya akun? Login di sini.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#BB86FC",
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
  registerButton: {
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
  registerButtonText: {
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
  footerLink: {
    fontSize: 14,
    color: "#BB86FC",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;
