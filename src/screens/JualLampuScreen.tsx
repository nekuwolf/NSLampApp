import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert, TextInput, Modal, Button } from "react-native";
import { postProduct, getProducts, deleteProduct, putProduct } from "../services/ProductService";
import { launchImageLibrary } from "react-native-image-picker"; // Image picker for selecting an image
import { createTransaction } from "../services/TransactionService";
import { getAccountInfo } from "../services/AccountService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Define the TypeScript interface for a product
interface Product {
  id: string;
  name: string;
  price: string;
  imgUrl: string;
}

type JualLampuProps = {
  navigation: NativeStackNavigationProp<any, any>;
};

const JualLampuScreen: React.FC<JualLampuProps> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [editingProductId, setEditingProductId] = useState<string | null>(null); // ID of the product being edited
  const [newProduct, setNewProduct] = useState<{ name: string; price: string; imgUrl: string | undefined }>({
    name: "",
    price: "",
    imgUrl: undefined,
  });
  let [fullName, setFullName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");

  // Fetch products on component mount
  useEffect(() => {
    fetchAccountInfo();
    fetchProducts();
  }, []); // Empty dependency array ensures this runs once on mount
  
  const fetchAccountInfo = async () => {
    try {
        const res = await getAccountInfo();
        setFullName(res.data.data.fullName);
        setEmail(res.data.data.email);
        setPhone(res.data.data.phoneNumber);
    } catch (error: any) {
        console.error("fetchAccountInfo error:", error);
        Alert.alert("Error", error.message || "Terjadi masalah dengan server.");
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await getProducts(); // Fetch data from the service
      setProducts(res.data.data); // Update products state
    } catch (error: any) {
      console.error("fetchProducts error:", error);
      Alert.alert("Error", error.message || "Terjadi masalah dengan server.");
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      Alert.alert("Success", "Product deleted successfully!");
      fetchProducts();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Error deleting product.");
    }
  };

  const splitFullName = (fullName: string) => {
    const parts = fullName.trim().split(" ");
    const firstName = parts[0]; // The first part is always the first name
    const lastName = parts.length > 1 ? parts.slice(1).join(" ") : ""; // Join the rest, or assign an empty string
    return { firstName, lastName };
  };

  const handleBuy = async (productId: string, productName: string, productPrice: string) => {
    const { firstName , lastName } = splitFullName(fullName);
    
    const transactionData = {
      grossAmount: productPrice,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
    };

    try {
      // Call the createTransaction API
      const result = await createTransaction(transactionData);
      Alert.alert("Berhasil", `Anda membeli ${productName} Transaksi berhasil!`);
      navigation.navigate("WebView", { link: result.data.data.redirectUrl });
      console.log("Transaction successful:", result.data.data);
    } catch (error: any) {
      console.error("Transaction failed:", error.message);
      Alert.alert("Gagal", error.message || "Terjadi kesalahan saat memproses transaksi.");
    }
  };

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (response) => {
      // Check if response.assets is defined and has at least one asset
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0]?.uri || ""; // Safely access uri, fall back to empty string if undefined
        setNewProduct((prev) => ({
          ...prev,
          imgUrl: uri,  // Set imgUrl to the uri or empty string
        }));
      } else {
        // If no assets are selected, set imgUrl to an empty string
        setNewProduct((prev) => ({
          ...prev,
          imgUrl: "",  // Set empty string if no image is selected
        }));
      }
    });
  };

  const handleEditProduct = (product: Product) => {
    setNewProduct({
      name: product.name,
      price: product.price,
      imgUrl: undefined,
    });
    setIsEditing(true);
    setEditingProductId(product.id);
    setModalVisible(true);
  };
  
  const handleAddOrUpdateProduct = async () => {
    try {
      const productData = {
        ...newProduct,
        imgUrl: newProduct.imgUrl || "",
      };

      if (isEditing && editingProductId) {
        // Update existing product
        await putProduct(editingProductId, productData);
        Alert.alert("Success", "Product updated successfully!");
      } else {
        // Add new product
        await postProduct(productData);
        Alert.alert("Success", "Product added successfully!");
      }

      // Reset form and states
      setModalVisible(false);
      setNewProduct({ name: "", price: "", imgUrl: undefined });
      setIsEditing(false);
      setEditingProductId(null);

      // Refresh product list
      fetchProducts();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Error saving product.");
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>NS Lamps</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setModalVisible(true);
          setIsEditing(false);
          setNewProduct({ name: "", price: "", imgUrl: undefined });
        }}
      >
        <Text style={styles.addButtonText}>Add Product</Text>
      </TouchableOpacity>

      {loading ? (
        <Text style={styles.loadingText}>Loading products...</Text>
      ) : (
        <View style={styles.productGrid}>
          {products.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <Image source={{ uri: product.imgUrl }} style={styles.productImage} />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{`Rp. ${product.price}`}</Text>

              {/* Container for buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.buyButton}
                  onPress={() => handleBuy(product.id, product.name, product.price)}
                >
                  <Text style={styles.buyButtonText}>Beli</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buyButton}
                  onPress={() => handleEditProduct(product)}
                >
                  <Text style={styles.buyButtonText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buyButton}
                  onPress={() => handleDeleteProduct(product.id)}
                >
                  <Text style={styles.buyButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {isEditing ? "Edit Product" : "Add Product"}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Product Name"
              value={newProduct.name}
              onChangeText={(text) =>
                setNewProduct((prev) => ({ ...prev, name: text }))
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Price"
              value={newProduct.price.toString()}
              onChangeText={(text) =>
                setNewProduct((prev) => ({ ...prev, price: text }))
              }
            />

            <TouchableOpacity style={styles.btn} onPress={selectImage}>
              <Text style={styles.btnText}>Select Image</Text>
            </TouchableOpacity>

            {newProduct.imgUrl && (
              <Image
                source={{ uri: newProduct.imgUrl }}
                style={styles.selectedImage}
              />
            )}

            <TouchableOpacity style={styles.btn} onPress={handleAddOrUpdateProduct}>
              <Text style={styles.btnText}>
                {isEditing ? "Update Product" : "Add Product"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#121212",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
    padding: 10,
    backgroundColor: "#1F1F1F",
    height: 60,
    paddingHorizontal: 16,
  },
  loadingText: {
    fontSize: 18,
    color: "#BBBBBB",
    textAlign: "center",
    marginTop: 20,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "100%",
    backgroundColor: "#1F1F1F",
    borderRadius: 8,
    padding: 10,
    marginTop: 30,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: "#BBBBBB",
    textAlign: "center",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
    width: "100%",
  },
  buyButton: {
    backgroundColor: "#BB86FC",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buyButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#BB86FC",
    paddingVertical: 10,
    marginVertical: 20,
    borderRadius: 4,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  selectedImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  btn: {
    backgroundColor: "#BB86FC",
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 4,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default JualLampuScreen;
