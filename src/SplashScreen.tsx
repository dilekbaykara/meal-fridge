// SplashScreen.tsx

import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

interface SplashScreenProps {
  navigation: StackNavigationProp<any, "Splash">;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(async () => {
      const jwt = await AsyncStorage.getItem("auth-key");
      if (jwt) {
        navigation.replace("DashBoard");
      } else {
        navigation.replace("Home");
      }
    }, 2000);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/splashScreen.png")}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default SplashScreen;
