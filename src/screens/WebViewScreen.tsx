import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, Button, TouchableOpacity, Text } from "react-native";
import { WebView } from "react-native-webview";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Linking } from "react-native";

// Define the param list for the stack navigator
type RootStackParamList = {
  WebView: { link: string }; // WebView expects a "link" parameter
};

// Define the props for WebViewScreen
type WebViewScreenProps = NativeStackScreenProps<RootStackParamList, "WebView">;

const WebViewScreen: React.FC<WebViewScreenProps> = ({ route, navigation }) => {
  const { link } = route.params;
  const [loading, setLoading] = useState(true); // Loading state for the progress bar

  // Extract the domain name using regular expression
  const extractDomain = (url: string) => {
    const matches = url.match(/(?:https?:\/\/)?(?:www\.)?([^\/]+)/);
    return matches && matches[1] ? matches[1] : "Unknown Domain";
  };

  const domain = extractDomain(link);

  // Function to open the link in an external browser
  const openInBrowser = () => {
    Linking.openURL(link)
      .catch((err) => console.error("Error opening URL:", err));
  };

  // AppBar setup with navigation
  useEffect(() => {
    navigation.setOptions({
      title: domain, // Set the domain as the title
      headerRight: () => (
        <TouchableOpacity style={styles.btn} onPress={openInBrowser}>
            <Text style={styles.btnText}>Open in Browser</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, domain]); // Re-run whenever the domain changes

  return (
    <View style={styles.container}>
      {/* Show the loading spinner while the page is loading */}
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}

      {/* WebView component */}
      <WebView
        source={{ uri: link }}
        style={styles.webview}
        onLoadStart={() => setLoading(true)} // Start loading indicator
        onLoadEnd={() => setLoading(false)} // Stop loading indicator when done
        onError={() => setLoading(false)} // Stop loading if error occurs
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -25, // Half of the loader size
    marginTop: -25,  // Half of the loader size
  },
  btn: {
    backgroundColor: "#BB86FC",
    padding: 6,
    borderRadius: 4,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default WebViewScreen;
