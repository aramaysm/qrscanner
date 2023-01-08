import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Button,
} from "react-native";
import Bottom_Bar from "./Bottom_Bar";
import Login from "./Login";
import QrCode from "./QrCode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Protocol_Controller from "./Auth_Module/Protocol_Controller";

const { width, height } = Dimensions.get("window");
import { NavigationContainer } from "@react-navigation/native";
import GetCredentials from "./GetCredentials";
import axios from "axios";
import Services from "./Services";
import * as Device from "expo-device";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authDevice, setAuthDevice] = useState(false);
  const [userAuth, setUserAuth] = useState({});
  const [role, setRole] = useState({});
  const [isNew, setIsNew] = useState(true);

  React.useEffect(() => {
    isUserAuthenticated();
    isDeviceAuthenticated();
    isAllowedByServer();
  }, []);

  const isUserAuthenticated = async () => {
    const jsonValue = await AsyncStorage.getItem("@storage_Token");
    const tokenLocalStorage = JSON.parse(jsonValue);

    axios
      .get(Services.authUserUrl(), Services.getAxiosConfig(tokenLocalStorage))
      .then((response) => {
        if (response.data.status === 200) {
          setAuthenticated(true);
          setUserAuth(response.data.data.user);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        if (error.response.status === 403) {
          setAuthenticated(false);
        } else if (error.response.status === 409) {
          console.log("Error conflict");
        } else if (error.response.status === 422) {
          console.log("Error invalid fields");
        }
      });
  };

  const isDeviceAuthenticated = async () => {
    const jsonValue = await AsyncStorage.getItem("@storage_Token_Device");
    const tokenLocalStorage = JSON.parse(jsonValue);

    //setAuthDevice(false);
  };

  const isNewDevice = async () => {
    const jsonValue = await AsyncStorage.getItem("@storage_Device_Id");
    console.log("Json value:",jsonValue)
    if (jsonValue === null || jsonValue === undefined) {
      setIsNew(true);
    } else setIsNew(false);
  };

  const onSuccesLogin = (user, role) => {
    setUserAuth(user);
    setRole(role);
    setAuthenticated(true);

    console.log(user);
  };

  const isAllowedByServer = async () => {
    const jsonValue = await AsyncStorage.getItem("@storage_Token");
    const tokenLocalStorage = JSON.parse(jsonValue);

    return axios
      .post(
        Services.isDeviceAllowed(),
        {
          brand: Device.brand.toUpperCase(),
          model: Device.modelName,
        },
        Services.getAxiosConfig(tokenLocalStorage)
      )
      .then((response) => {
        if (response.data.status === 200) {
          console.log("Is allowed");
          setAuthDevice(true);
        }
      })
      .catch((error) => {
        console.log("Error in allowed ", error);
        if (error.response.status === 403) {
          console.log("Ejecutar autenticacion");
          autenticationDevice();
        } else if (error.response.status === 409) {
          console.log("Error conflict");
        } else if (error.response.status === 422) {
          console.log("Error invalid fields");
        }
      });
  };

  const autenticationDevice = async () => {
    let jsonValue = await AsyncStorage.getItem("@storage_Device_Id");
    let idDevice = JSON.parse(jsonValue);
    jsonValue = await AsyncStorage.getItem("@storage_Device_Token");
    let token_device = JSON.parse(jsonValue);
    console.log("id device: ",idDevice,", token:",token_device)
    let date1 = new Date();

    let protocol = new Protocol_Controller();
    await protocol
      .ExecuteProtocol(idDevice, token_device, Services.deviceAuth(),true)
      .then((response) => {
        if (response.data.status === 200) {
          let date2 = new Date();
          console.log("Time to login device:" + (date2 - date1) / 1000 + "rs");
          //console.log("User authenticated was: ",response.data.data.user.user);
          setAuthDevice(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          console.log("Credenciales inválidos");
        }
       console.log("Error:", error);
      });
  };

  return (
    <View style={styles.maincontainer}>
      {authenticated ? (
        isNew === false ? (
          authDevice ? (
            <NavigationContainer>
              <Bottom_Bar user={userAuth} role={role} />
            </NavigationContainer>
          ) : (
            <View>
              <Text>...Autenticando dispositivo...</Text>
            </View>
          )
        ) : (
          <GetCredentials
            isNew={isNew}
            onGetCredentials={() => setIsNew(false)}
          />
        )
      ) : (
        <Login onSuccesfulLogin={onSuccesLogin} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: "#f1f1f1",
    flex: 1,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#34434d",
  },
  subtitle: {
    fontSize: 20,
    color: "gray",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    paddingStart: 20,
    width: "80%",
    margin: 10,
  },
  containerSVG: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: width,
    backgroundColor: "#2ecc71",
    margin: 0,
    height: height / 4,
  },
  rotateSvg: {
    transform: [{ rotate: "180deg" }],
  },
  button: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#2ecc71",
    margin: 50,
  },
  textButton: {
    color: "white",
  },
});

/*
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#2ecc71" fill-opacity="0.9" d="M0,64L80,74.7C160,85,320,107,480,144C640,181,800,235,960,250.7C1120,267,1280,245,1360,234.7L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
*/
