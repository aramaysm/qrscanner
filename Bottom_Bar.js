import Personal_Information from "./Personal_Information";
import Account from "./AccountScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createBottomTabNavigator();
import React from "react";
import Qr_Code from "./QrCode";

export default function Bottom_Bar(props) {

  const [role,setRole]=React.useState({});
  
  React.useEffect(async ()=>{
    const jsonValue = await AsyncStorage.getItem('@storage_Role');   
    setRole(JSON.parse(jsonValue));
    
  },[])

  return role.name === "worker" ? (
    <Tab.Navigator
      initialRouteName="Información personal"
      screenOptions={{
        tabBarActiveTintColor: "#2ecc71",
      }}>
      <Tab.Screen
        name="Información personal"
        component={Account}          
        options={{
          tabBarLabel: "Información personal",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Estadísticas"       
        component={Personal_Information}
        options={{
          tabBarLabel: "Estadísticas",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="chart-bar"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  ) : <Tab.Navigator
  initialRouteName="Información personal"
  screenOptions={{
    tabBarActiveTintColor: "#2ecc71",
  }}>
  <Tab.Screen
    name="Escaner de QR"
    component={Qr_Code}          
    options={{
      tabBarLabel: "Escaner de QR",
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="qrcode" color={color} size={size} />
      ),
    }}
  />

  <Tab.Screen
    name="Estadísticas"       
    component={Personal_Information}
    options={{
      tabBarLabel: "Estadísticas",
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons
          name="chart-bar"
          color={color}
          size={size}
        />
      ),
    }}
  />
</Tab.Navigator>;
}
