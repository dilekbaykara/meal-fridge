import { StackNavigationProp } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface HomeScreenProps {
  navigation: StackNavigationProp<any, "Home">;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Login/Sign Up</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Meal Fridge</Text>
        <View style={styles.container2}>
          <Text style={styles.description}>Add Recipes</Text>
          <Text style={styles.description}>Create a monthly meal plan</Text>
          <Text style={styles.description}>
            See what you have / are missing for each recipe
          </Text>
          <Text style={styles.description}>
            Track what is in your refrigerator/pantry/sock drawer
          </Text>
          <Text style={styles.description}>
            See what ingredients have expired / how many days have passed since
            purchase date
          </Text>
        </View>

        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {},
  container: {
    flex: 1,
    backgroundColor: "#f8ffe9",
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
    fontWeight: "600",
    color: "#0a3200",
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
