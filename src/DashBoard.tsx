import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { getHeaderTitle } from "@react-navigation/elements";

interface DashBoardProps {
  navigation: StackNavigationProp<any, "DashBoard">;
}

function DashBoard({ navigation }: DashBoardProps) {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("auth-key");

      navigation.navigate("Home");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
      <Text style={styles.title}>Dash Board</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {},
  container: {
    flex: 1,
    backgroundColor: "#D0F28D",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0a3200",
    fontFamily: "IBMPlexSerif_700Bold",
  },
  description: {
    padding: 3,
    flexWrap: "wrap",
    textAlign: "center",
    fontSize: 19,
    fontWeight: "600",
    color: "#8447ff",
  },
  container2: {
    marginTop: 8,
    width: 350,
    display: "flex",
  },
});

export default DashBoard;
