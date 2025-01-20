import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getAccountInfo, removeIdToken } from "../services/AccountService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackActions } from "@react-navigation/native";

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<any, any>;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
    let [fullName, setFullName] = useState("");
    let [email, setEmail] = useState("");
    let [phone, setPhone] = useState("");
    let [address, setAddress] = useState("");
    let [password, setPassword] = useState("");
    let [repeatPassword, setRepeatPassword] = useState("");

    const fetchAccountInfo = async () => {
        try {
            const res = await getAccountInfo();
            setFullName(res.data.data.fullName);
            setEmail(res.data.data.email);
            setPhone(res.data.data.phoneNumber);
            setAddress(res.data.data.homeAddress);
        } catch (error: any) {
            console.error("fetchAccountInfo error:", error);
            Alert.alert("Error", error.message || "Terjadi masalah dengan server.");
        }
    }

    const handleLogout = async () => {
        await removeIdToken();
        navigation.dispatch(StackActions.popToTop());
        Alert.alert("Logged out", "Berhasil logged out.");
    };

    fetchAccountInfo();

    const utilities = [
        { id: '1', label: 'Downloads', action: () => console.log('Downloads clicked') },
        { id: '2', label: 'Usage Analytics', action: () => console.log('Usage Analytics clicked') },
        { id: '3', label: 'Add Help Desk', action: () => console.log('Add Help Desk clicked') },
        { id: '4', label: 'Log Out', action: handleLogout }, // Pass function reference, not its invocation
    ];

    return (
        <LinearGradient
            colors={['#1f1f1f', '#2b2b2b']}
            style={styles.background}
        >
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Text style={styles.editButton}>Edit</Text>
                    </TouchableOpacity>
                </View>

                {/* Profile Info */}
                <View style={styles.profileContainer}>
                    <Image
                        source={require('../assets/images/profile.jpg')} // Ganti dengan path gambar avatar
                        style={styles.avatar}
                    />
                    <Text style={styles.name}>{fullName}</Text>
                </View>

                {/* Personal Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Data Diri</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Email</Text>
                        <Text style={styles.infoText}>{email}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Phone</Text>
                        <Text style={styles.infoText}>{phone}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Alamat</Text>
                        <Text style={styles.infoText}>{address}</Text>
                    </View>
                </View>

                {/* Utilities */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Utilities</Text>
                    <FlatList
                        data={utilities}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.utilityRow} onPress={item.action}>
                                <Text style={styles.utilityText}>{item.label}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        fontSize: 18,
        color: '#4b9fed',
        fontWeight: 'bold',
    },
    editButton: {
        fontSize: 18,
        color: '#4b9fed',
        fontWeight: 'bold',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#fff',
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
    infoLabel: {
        fontSize: 16,
        color: '#bbb',
    },
    infoText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'right',
    },
    utilityRow: {
        paddingVertical: 15,
        backgroundColor: '#333',
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 15,
    },
    utilityText: {
        fontSize: 16,
        color: '#fff',
    },
});

export default ProfileScreen;
