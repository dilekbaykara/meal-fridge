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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const userData = {
        firstName,
        lastName,
        email,
        password,
      };

      const signUpResult = await fetch(SIGN_UP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const signUpResultData = await signUpResult.json();

      //     console.log("Server Response:", signUpResultData);
      //     console.log("Message:", message);
      //     setMessage(signUpResultData.message);
      //   } catch (error) {
      //     console.error("Error signing up:", error);
      //     setMessage("Error signing up. Please try again.");
      //   }
      // };

      // Check for the specific error case where email already exists
      if (signUpResultData.error === "email already exists") {
        setMessage("Email already exists. Please use a different email.");
      } else {
        // Handle other success cases if needed
        setMessage(signUpResultData.message);
      }
    } catch (error) {
      console.error("Error signing up:", error);

      // Check for network errors
      if (error.message === "Network request failed") {
        setMessage("Network error. Please check your internet connection.");
      } else {
        setMessage("Error signing up. Please try again.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Sign Up</Text>
      {message ? <Text style={styles.errorMessage}>{message}</Text> : null}
      <TextInput
        style={styles.textInput}
        placeholder="First Name"
        onChangeText={(text) => setFirstName(text)}
        // onChangeText={""}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Last Name"
        onChangeText={(text) => setLastName(text)}
        // onChangeText={""}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        // onChangeText={""}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
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
  errorMessage: {
    width: 300,
    height: 50,
    fontSize: 20,
    color: "red",
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
