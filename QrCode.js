import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import Services from "./Services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


export default function Qr_Code() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [access_granted, setAccess_granted] = useState(false);
  const [isDeviceAllowed,setIsDeviceAllowed]= useState(false);

  useEffect(() => {
    requestPermissions().then(() => console.log("Okis"));   
  }, []);

  const requestPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const readDataFromStorage = async () => {
    const jsonValue = await AsyncStorage.getItem("@storage_Token");
    const tokenLocalStorage = JSON.parse(jsonValue);

    return tokenLocalStorage;
  };

  const handleBarCodeScanned = ({ type, data }) => {
    let tokenLocalStorage = readDataFromStorage();

    console.log("Data: ", data);

    tokenLocalStorage.then((dataStorage) => {
      try {
        data = JSON.parse(data);

        const config = {
          headers: { Authorization: `Bearer ${dataStorage}` },
        };

        axios
          .post(
            Services.getAllWorkersUrl() + "/getAccess",
            {
              email: data["email"],
              dni: data["dni"],
              fullname: data["fullname"],
            },
            config
          )
          .then((response) => {
            if (response.data.status === 105) {
              setScanned(true);
              setAccess_granted(true);
              setTimeout(() => setScanned(false), 2000);
            }
          })
          .catch((error) => {
            console.log("Error", error);
            if (error.response.status === 403) {
              console.log("Error forbidden");
              setScanned(true);
              setAccess_granted(false);
              setTimeout(() => setScanned(false), 2000);
            } else if (error.response.status === 409) {
              console.log("Error conflict");
              setScanned(true);
              setAccess_granted(false);
              setTimeout(() => setScanned(false), 2000);
            } else if (error.response.status === 422) {
              console.log("Error invalid fields");
              setScanned(true);
              setAccess_granted(false);
              setTimeout(() => setScanned(false), 2000);
            }
          });
      } catch (errorJson) {
        setScanned(true);
        setAccess_granted(false);
        console.log("Error json");
        setTimeout(() => setScanned(false), 2000);
      }
    });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

 
  return (
     <View style={styles.container}>
      <Text style={styles.title}>Escanee el QR</Text>

      <View style={styles.barCodeView}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          width={300}
          height={300}
        />
      </View>

      {scanned &&
        (access_granted === true ? (
          <View style={styles.viewAccessGranted}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name={"check-circle-outline"}
                color={"white"}
                size={35} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textButton}>Acceso permitido</Text>
            </View>
          </View>
        ) : (
          <View style={styles.viewAccessDenied}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name={"alert-outline"}
                color={"white"}
                size={30}              />
            </View>
            <View style={styles.textContainer}>
            <Text style={styles.textButton}>Acceso denegado</Text> 
            </View>
          </View>          
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#34434d",
    marginBottom: 25,
  },
  barCodeView: {
    borderColor: "#34434d",
    borderWidth: 4,
    padding: 3,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#2ecc71",
    margin: 50,
  },
  textButton: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  textContainer: {
    
  },
  viewAccessGranted: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#2ecc71",
    borderRadius: 20,
    padding: 10,
    width: "80%",
   
   marginTop: 10,
    elevation: 1,
  },
  viewAccessDenied: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "red",
    borderRadius: 20,
    padding: 10,
    width: "80%",
    
   marginTop: 10,
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#2ecc71",
    borderRadius: 20,
    padding: 10,
    width: "80%",
    height: 80,
   marginTop: 10,
    elevation: 1,
  },
  iconContainer: {
    marginRight: 10,
    justifyContent: "center",
  },
});

/**
 * 
 <View style={styles.button} onTouchEnd={() => setScanned(false)}>
            <Text style={styles.textButton}>Volver a escanear</Text>
          </View>
 */
