import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { apiServerAddress } from './ServerConnection';

const BASE_URL = apiServerAddress();

// Get account information with Bearer token
export async function getProducts() {
  try {
    // Retrieve the token from AsyncStorage
    const idToken = await AsyncStorage.getItem("idToken");
    if (!idToken) {
      throw { message: "No id token found!" };
    }

    // Send a request with the Bearer token in the Authorization header
    const response = await axios.get(`${BASE_URL}/product`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    console.log(response.data);
    return response;
  } catch (error: any) {
    throw error.response?.data || { message: "Failed to get products!" };
  }
}

// Add new product (with image upload)
export async function postProduct(newProduct: { name: string, price: string, imgUrl: string }) {
  if (!newProduct.name || !newProduct.price || !newProduct.imgUrl) {
    throw { message: "Please provide all product details." };
  }

  const formData = new FormData();
  formData.append("name", newProduct.name);
  formData.append("price", newProduct.price);

  // Extract image URI and prepare it for FormData
  const uri = newProduct.imgUrl;
  const fileName = uri.split('/').pop() || "image.jpg";  // Extract file name from uri
  const fileType = uri.split('.').pop() || "jpg";  // Get file type (default to jpg)

  // Create a file object for the image
  const file = {
    uri,
    name: fileName,
    type: `image/${fileType}`,  // Specify the file type
  };

  formData.append("file", file);

  try {
    // Retrieve the token from AsyncStorage
    const idToken = await AsyncStorage.getItem("idToken");
    if (!idToken) {
      throw { message: "No id token found!" };
    }

    // Send the product data to the server via a POST request
    const response = await axios.post(`${BASE_URL}/product`, formData, {
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "multipart/form-data", // Important for file uploads
      },
    });

    console.log(response.data); // Log the server response
    return response;
  } catch (error: any) {
    console.error("Error adding product:", error);
    throw error.response?.data || { message: "Error adding product!" };
  }
}

export async function putProduct(id: string, newProduct: { name: string, price: string, imgUrl: string }) {
  try {
    // Ensure all required fields are provided
    if (!newProduct.name || !newProduct.price) {
      throw { message: "Please provide all product details." };
    }
    console.log(newProduct);
    
    // Create FormData for product details
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);

    // Check if the image URL is provided
    if (newProduct.imgUrl) {
      const uri = newProduct.imgUrl;
      const fileName = uri.split('/').pop() || "image.jpg";  // Extract file name from URI
      const fileType = uri.split('.').pop() || "jpg";  // Get file type (default to jpg)

      // Create a file object for the image
      const file = {
        uri,
        name: fileName,
        type: `image/${fileType}`,  // Specify the file type
      };

      // Append the image file to FormData
      formData.append("file", file);
    }

    // Retrieve the token from AsyncStorage
    const idToken = await AsyncStorage.getItem("idToken");
    if (!idToken) {
      throw { message: "No id token found!" }; // Throw error if token is not found
    }

    // Send the product data to the server via a PUT request
    const response = await axios.put(`${BASE_URL}/product/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${idToken}`, // Add token to Authorization header
        "Content-Type": "multipart/form-data", // Important for file uploads
      },
    });

    console.log(response.data); // Log the server response
    return response; // Return the server response
  } catch (error: any) {
    console.error("Error updating product:", error); // Log any errors that occur
    throw error.response?.data || { message: "Error updating product!" }; // Throw the error response
  }
}

// Get account information with Bearer token
export async function deleteProduct(productId: string) {
  try {
    // Retrieve the token from AsyncStorage
    const idToken = await AsyncStorage.getItem("idToken");
    if (!idToken) {
      throw { message: "No id token found!" };
    }

    // Send a request with the Bearer token in the Authorization header
    const response = await axios.delete(`${BASE_URL}/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    console.log(response.data);
    return response;
  } catch (error: any) {
    throw error.response?.data || { message: "Failed to delete products!" };
  }
}

