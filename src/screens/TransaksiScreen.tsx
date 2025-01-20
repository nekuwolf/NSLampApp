import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList, Alert, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getTransactions } from "../services/TransactionService"; // Assuming you have an API function to fetch transactions

// Define the param list for the stack navigator
type RootStackParamList = {
  WebView: { link: string };
  Transaksi: undefined;
};

type TransaksiScreenProps = NativeStackScreenProps<RootStackParamList, "Transaksi">;

const TransaksiScreen: React.FC<TransaksiScreenProps> = ({ navigation }) => {
  const [transactions, setTransactions] = useState<any[]>([]); // To store transactions
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch transactions data from the API
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await getTransactions(); // Fetch the transactions from your API
        if (response) {
          setTransactions(response.data.data);
        } else {
          Alert.alert("Error", "Failed to load transactions.");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        Alert.alert("Error", "An error occurred while fetching transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, []);

  // Function to navigate to WebView screen
  const handleRedirect = (redirectUrl: string) => {
    navigation.navigate("WebView", { link: redirectUrl });
  };

  // Render a transaction card
  const renderTransaction = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.transactionText}>Kode Pesanan : {item.orderId}</Text>
      <Text style={styles.transactionText}>Total : Rp. {item.grossAmmount}</Text>
      {/* <Text style={styles.transactionText}>
        Name: {item.firstName} {item.lastName}
      </Text> */}
      {/* <Text style={styles.transactionText}>Email: {item.email}</Text> */}
      {/* <Text style={styles.transactionText}>Phone: {item.phone}</Text> */}

      {/* If there's a redirectUrl, show the button */}
      {item.redirectUrl ? (
        <TouchableOpacity style={styles.btn} onPress={() => handleRedirect(item.redirectUrl)}>
            <Text style={styles.btnText}>Go to Payment</Text>
        </TouchableOpacity>
      ) : (
        <Text>No payment link available</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading transactions...</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTransaction}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  transactionText: {
    fontSize: 14,
    marginBottom: 8,
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

export default TransaksiScreen;
