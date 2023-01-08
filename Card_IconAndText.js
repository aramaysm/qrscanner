import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Card_Icon_And_Text(props) {

const {icon,iconColor,text,title} = props;

  return (
    <View style={styles.row}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={icon} color={iconColor} size={30} />
      </View>
      <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    width: "80%",
    height: 80,
    marginTop: 30,
    elevation: 1,
    
  },
  iconContainer: {
    marginRight: 10,    
    justifyContent: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "gray",
  },
  title:{
    fontSize: 20,
    color: "gray",
    fontWeight: "bold",
  },
  textContainer:{
    flex:1,
    justifyContent: "center",
  }
});
