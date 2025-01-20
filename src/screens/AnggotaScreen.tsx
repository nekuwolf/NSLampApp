import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import {getProducts} from "../services/ProductService";

const AnggotaScreen = () => {
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getProducts();
                console.log(products);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProducts();
    }, []);
    return (
        <View><Text>Hello Wayan</Text></View>
    )
};