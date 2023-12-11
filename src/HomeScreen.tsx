import { StackNavigationProp } from "@react-navigation/stack";
import * as Font from "expo-font";
import Spinner from "react-native-loading-spinner-overlay";
import {
  useFonts,
  IBMPlexSerif_700Bold,
} from "@expo-google-fonts/ibm-plex-serif";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface HomeScreenProps {
  navigation: StackNavigationProp<any, "Home">;
}

const fetchFonts = () => {
  return Font.loadAsync({
    "IBM-Plex-Serif-Bold": IBMPlexSerif_700Bold,
  });
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFontsAsync = async () => {
      await fetchFonts();
      setFontsLoaded(true);
    };

    loadFontsAsync();
  }, []);

  fontsLoaded;
  return (
    <View style={styles.container}>
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
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonText}>Login/Sign Up</Text>
            </Pressable>
            {/* <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("About")}
        >
          <Text style={styles.buttonText}>How it works</Text>
        </Pressable> */}
          </View>
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
