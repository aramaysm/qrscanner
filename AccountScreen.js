import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Card_Icon_And_Text from "./Card_IconAndText";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Account(props) {
  
  
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [selectedUser, setSelectedUser] = useState({});

 


  React.useEffect(async () => {
    const jsonValue = await AsyncStorage.getItem('@storage_User');   
    console.log("Json",jsonValue)
    let user =  JSON.parse(jsonValue);
    setSelectedUser(user);
    setFullname(user.fullname);
    setEmail(user.email);
    setDni(user.dni);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("./assets/happy-smiling-young-man-3d-260nw-2128644164.png")}
            style={styles.image}
          />
        </View>

        <Text style={styles.title}>{fullname}</Text>

        <Card_Icon_And_Text
          icon={"email-outline"}
          iconColor="#2ecc71"
          text={email}
          title={"Correo"}
        />
        <Card_Icon_And_Text
          icon={"badge-account-horizontal-outline"}
          iconColor="#2ecc71"
          text={dni}
          title={"N. Identidad"}
        />
        <View style={{ padding: 3 }}>
          <Image
            source={{
              uri: "data:image/png;base64,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",
            }}
            style={styles.qr_image}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    marginTop: 10,
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#34434d",
    marginBottom: 25,
  },
  subtitle: {
    fontSize: 15,
    color: "gray",
    marginBottom: 30,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 75,
    overflow: "hidden",
    backgroundColor: "#dfffec",
  },
  imageContainer: {
    borderWidth: 4,
    borderColor: "#2ecc71",
    padding: 4,
    borderRadius: 85,
    marginBottom: 40,
    marginTop: 10,
  },
  qr_image: {
    marginTop: 50,
    width: 250,
    height: 250,
    borderColor: "#2ecc71",
    overflow: "hidden",
    borderWidth: 2,
    borderRadius: 20,
    marginBottom: 20,
  },
});
