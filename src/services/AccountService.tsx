import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiServerAddress } from './ServerConnection';

const BASE_URL = apiServerAddress();

// Login function
export async function postLogin(email: string, password: string) {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    return response;
  } catch (error: any) {
    throw error.response?.data || { message: "Login failed!" };
  }
}

// Register function
export async function postRegister(fullName: string, email: string, password: string, phoneNumber: string, homeAddress: string) {
    try {
      const response = await axios.post(`${BASE_URL}/register`, { fullName, email, password, phoneNumber, homeAddress });
      return response;
    } catch (error: any) {
      throw error.response?.data || { message: "Register failed!" };
    }
  }

// Get account information with Bearer token
export async function getAccountInfo() {
    try {
      // Retrieve the token from AsyncStorage
      const idToken = await AsyncStorage.getItem("idToken");
      if (!idToken) {
        throw { message: "No id token found!" };
      }
  
      // Send a request with the Bearer token in the Authorization header
      const response = await axios.get(`${BASE_URL}/user/@me`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      
      console.log(response.data);
      return response;
    } catch (error: any) {
      throw error.response?.data || { message: "Failed to get account information!" };
    }
  }

// Account info function
export async function putAccountInfo(fullName: string, email: string, password: string, ) {
    try {
        const response = await axios.put(`${BASE_URL}/account`, { fullName, email, password });
        return response;
    } catch (error) {
      console.error("Failed to get account information:", error);
    }
  }

// Store user account information in AsyncStorage
export async function storeAccountInfo(fullName: string) {
    try {
      await AsyncStorage.setItem("accountFullName", fullName); //add more later
    } catch (error) {
      console.error("Failed to store account information:", error);
    }
  }

// Store id token in AsyncStorage
export async function storeIdToken(idToken: string) {
  try {
    await AsyncStorage.setItem("idToken", idToken);
  } catch (error) {
    console.error("Failed to store id token:", error);
  }
}

// Remove id token in AsyncStorage
export async function removeIdToken() {
    try {
      await AsyncStorage.removeItem("idToken");
    } catch (error) {
      console.error("Failed to remove id token:", error);
    }
  }

// Check if the user is logged in
export async function isIdTokenPresent() {
  try {
    const token = await AsyncStorage.getItem("idToken");
    return !!token; // Returns true if token exists
  } catch (error) {
    console.error("Failed to check login status:", error);
    return false;
  }
}
