import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { apiServerAddress } from './ServerConnection';

const BASE_URL = apiServerAddress();

export async function createTransaction(transactionData: {
  grossAmount: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}) {
  try {
    // Retrieve the Bearer token from AsyncStorage
    const idToken = await AsyncStorage.getItem("idToken");
    if (!idToken) {
      throw { message: "No id token found!" };
    }

    // Send the POST request
    const response = await axios.post(
      `${BASE_URL}/transaction`,
      transactionData,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response; // Return the response
  } catch (error: any) {
    console.error("Error creating transaction:", error);
    throw error.response?.data || { message: "Failed to create transaction!" };
  }
}

// Function to fetch transactions from the API
export async function getTransactions() {
    try {
      // Retrieve the Bearer token from AsyncStorage
      const idToken = await AsyncStorage.getItem("idToken");
      if (!idToken) {
        throw { message: "No id token found!" };
      }
  
      // Make the GET request to fetch the transactions
      const response = await axios.get(`${BASE_URL}/transaction`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
  
      // Return the data if the request is successful
      return response; // Assuming the data is under the `data` key in the response
  
    } catch (error: any) {
      console.error("Error fetching transactions:", error);
      throw error.response?.data || { message: "Failed to fetch transactions!" };
    }
  }