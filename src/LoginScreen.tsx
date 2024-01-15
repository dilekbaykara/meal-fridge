// Login.tsx
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  Pressable,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";

interface LoginScreenProps {
  navigation: StackNavigationProp<any, "Login">;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Login</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Text style={styles.description}> Forgot Password? </Text>
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <View style={styles.signUp}>
        <Text style={styles.description}>
          Create new account?
          <Pressable onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.description}> Sign Up</Text>
          </Pressable>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D0F28D",
    alignItems: "center",
    justifyContent: "center",
  },
  textHeader: {
    fontSize: 19,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#8447ff",
  },
  textInput: {
    width: 300,
    height: 50,
    fontSize: 19,
    margin: 10,
    borderRadius: 10,
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#f5fffa",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    backgroundColor: "black",
  },
  signUp: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
  },
  description: {
    flex: 0,
    flexWrap: "wrap",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 19,
    fontWeight: "600",
    color: "#8447ff",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
