import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { RouteProp } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { getHeaderTitle } from "@react-navigation/elements";

type RootStackParamList = {
  SignUp: undefined;
  Dashboard: { username: string };
  // Add other screens here if needed
};

type DashBoardScreenRouteProp = RouteProp<RootStackParamList, "Dashboard">;

interface DashBoardProps {
  navigation: StackNavigationProp<any, "Dashboard">;
  route: DashBoardScreenRouteProp;
}

const DashBoard: React.FC<DashBoardProps> = ({ route, navigation }) => {
  const { username } = route.params || {};

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
      <View style={styles.header}>
        <Text style={styles.title}>Welcome, {username}!</Text>
        <Pressable style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
      <View style={styles.body}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {},
  container: {
    flex: 1,
    backgroundColor: "#D0F28D",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    margin: 20,
    backgroundColor: "#D0F28D",
    alignSelf: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    alignContent: "center",
    gap: 10,
  },
  body: {
    flex: 1,
    backgroundColor: "#D0F28D",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
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
function useRoute() {
  throw new Error("Function not implemented.");
}
