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
  Modal,
  ScrollView,
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
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      setMessage("");
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

      const signUpResultData: { error: string } | { jwt: string } =
        await signUpResult.json();

      // Check for the specific error case where email already exists
      if ("error" in signUpResultData) {
        if (signUpResultData.error === "email already exists") {
          setMessage("Email already exists. Please use a different email.");
        } else {
          // Handle other success cases if needed
          console.log(signUpResultData);
          setMessage(signUpResultData.error);
        }
      } else {
        console.log("the jwt is: ", signUpResultData.jwt);
      }
    } catch (error) {
      console.error("Error signing up:", error);

      // Check for network errors
      if (error.message === "Network request failed") {
        setMessage("Network error. Please check your internet connection.");
      } else {
        setMessage("Error signing up. Please try again.");
      }
    } finally {
      setLoading(false);
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

      <Pressable
        style={styles.button}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </Pressable>

      <Text style={styles.termsText}>
        By clicking Create Account, I agree with the
        <Text onPress={openModal} style={{ color: "#8447ff" }}>
          {" "}
          Terms and Conditions.
        </Text>
      </Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <ScrollView>
              <Text>
                {`\n`}
                Welcome to MealFridge!
                {`\n`}
                {`\n`}
                By using our mobile application, you agree to comply with and be
                bound by the following terms and conditions of use.
                {`\n`}
                If you do not agree to these terms, please do not use our app.
                {`\n`}
                {`\n`}
                1. **User Eligibility:** - You must be at least 18 years old to
                use this app. - By using the app, you represent and warrant that
                you are at least 18 years old.
                {`\n`}
                {`\n`}
                2. **Account Registration:** - You may need to create an account
                to use certain features of the app. - You are responsible for
                maintaining the confidentiality of your account information.
                {`\n`}
                {`\n`}
                3. **Use of the App:** - You agree to use the app for lawful
                purposes only. - You will not engage in any activity that
                disrupts or interferes with the functionality of the app.
                {`\n`}
                {`\n`}
                4. **Intellectual Property:** - All content and materials
                available on the app are the property of MealFridge. - You may
                not use, modify, reproduce, or distribute any content from the
                app without our prior written consent.
                {`\n`}
                {`\n`}
                5. **Privacy Policy:** - Our Privacy Policy governs the
                collection and use of your personal information. Please review
                it [link to privacy policy].
                {`\n`}
                {`\n`}
                6. **Termination:** - We reserve the right to terminate or
                suspend your account at any time without prior notice for
                violation of these terms.
                {`\n`}
                {`\n`}
                7. **Disclaimer of Warranties:** - The app is provided "as is"
                without any warranties. - We do not guarantee the accuracy,
                completeness, or reliability of any content.
                {`\n`}
                {`\n`}
                8. **Limitation of Liability:** - We are not liable for any
                indirect, incidental, or consequential damages arising out of
                your use of the app.
                {`\n`}
                {`\n`}
                9. **Governing Law:** - These terms are governed by and
                construed in accordance with the laws of [Your Country/State].
                {`\n`}
                {`\n`}
                10. **Changes to Terms:** - We reserve the right to modify these
                terms at any time. Changes will be effective immediately upon
                posting. By using our app, you agree to these terms and
                conditions. If you have any questions or concerns, please
                contact us at [your contact email]. Last updated: [Date]
              </Text>
            </ScrollView>
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
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
    margin: 4,
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
  termsText: {
    fontSize: 14,
    margin: 10,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#000",
  },
});
