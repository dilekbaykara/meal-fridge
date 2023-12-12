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

const SIGN_UP_URL = "http://localhost:8787/";

interface SignUpScreenProps {
  navigation: StackNavigationProp<any, "SignUp">;
}

export default function SignUpScreen({ navigation }: SignUpScreenProps) {
  const [message, setMessage] = useState("");
  const handleSignUp = async () => {
    // Handle sign up logic here
    const signUpResult = await fetch(SIGN_UP_URL);
    const signUpResultData = await signUpResult.text();
    setMessage(signUpResultData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Sign Up</Text>
      <Text style={styles.description}>{message}</Text>
      <TextInput
        style={styles.textInput}
        placeholder="First Name"
        // onChangeText={""}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Last Name"
        // onChangeText={""}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        // onChangeText={""}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        secureTextEntry
        // onChangeText={""}
      />
      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Create Account</Text>
      </Pressable>
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
    borderRadius: 12,
    margin: 10,
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "white",
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
    padding: 3,
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
