import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  function alert(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Logo di kiri */}
        <View style={styles.headerLogo}>
          <Image
            source={require("../assets/images/logo2.jpg")}
            style={styles.logoImage}
          />
          <Text style={styles.headerTitle}>NS Lamps</Text>
        </View>

        {/* Gambar Profil di kanan */}
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <View style={styles.headerProfile}>
            <Image
              source={require("../assets/images/profile.jpg")} // Ganti dengan gambar profil yang sesuai
              style={styles.profileImage}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.nav}>
        <TouchableOpacity
          style={styles.navDiv}
          onPress={() => navigation.navigate("JualLampu")}
        >
          <MaterialCommunityIcon name="lamp" size={30} style={styles.navIcon} />
          <Text style={styles.iconText}>Jual Lampu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navDiv}
          onPress={() => navigation.navigate("Transaksi")}
        >
          <MaterialCommunityIcon name="cart" size={30} style={styles.navIcon} />
          <Text style={styles.iconText}>Transaksi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navDiv}
          onPress={() => navigation.navigate("WebView", { link: "https://google.com" })}
        >
          <MaterialCommunityIcon name="web" size={30} style={styles.navIcon} />
          <Text style={styles.iconText}>Web View</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navDiv} onPress={() => alert()}>
          <FontAwesome6 name="screwdriver-wrench" size={30} style={styles.navIcon} />
          <Text style={styles.iconText}>Rakit Lampu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navDiv} onPress={() => alert()}>
          <MaterialIcon name="cable" size={30} style={styles.navIcon} />
          <Text style={styles.iconText}>Sewa Lampu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navDiv} onPress={() => alert()}>
          <FontAwesome6 name="tent" size={30} style={styles.navIcon} />
          <Text style={styles.iconText}>Lampu Dekorasi</Text>
        </TouchableOpacity>
        {/* Promo Akhir Tahun */}
        <View style={styles.promo}>
          <Text style={styles.promoTitle}>Promo Akhir Tahun!</Text>
          <Text style={styles.promoText}>
            Diskon hingga <Text style={styles.highlight}>20%</Text> untuk semua
            produk.
          </Text>
          <Text style={styles.promoText}>
            Berlaku dari 20 desember hingga 31 Desember 2024. Jangan lewatkan!
          </Text>
          <TouchableOpacity
            style={styles.promoButton}
          >
            <Text style={styles.promoButtonText}>Lihat Promo</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Selamat datang di NS Lamps</Text>
        <Text style={styles.footerSubText}>Solusi Kebutuhan Lampu Anda</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    backgroundColor: "#1F1F1F",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  headerLogo: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  headerTitle: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
  headerProfile: {
    backgroundColor: "#333",
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  nav: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 20,
  },
  navDiv: {
    width: "40%",
    backgroundColor: "#1F1F1F",
    borderRadius: 8,
    padding: 5,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#333",
  },
  navIcon: {
    color: "#BB86FC",
    marginBottom: 10,
  },
  iconText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  footer: {
    backgroundColor: "#1F1F1F",
    padding: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  footerText: {
    fontSize: 18,
    color: "#BB86FC",
    fontWeight: "bold",
  },
  footerSubText: {
    fontSize: 14,
    color: "#fff",
    marginTop: 4,
  },
  promo: {
    backgroundColor: "#BB86FC",
    padding: 16,
    marginTop: 50,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 16,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F1F1F",
    marginBottom: 8,
  },
  promoText: {
    fontSize: 16,
    color: "#121212",
    textAlign: "center",
    marginBottom: 8,
  },
  highlight: {
    fontWeight: "bold",
    color: "#FF5722",
  },
  promoButton: {
    backgroundColor: "#1F1F1F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 12,
    elevation: 3,
  },
  promoButtonText: {
    fontSize: 16,
    color: "#BB86FC",
    fontWeight: "bold",
  },
});

export default HomeScreen;
