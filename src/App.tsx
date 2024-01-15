import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUp";
import SplashScreen from "./SplashScreen";
import HomeScreen from "./HomeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: "  ",
          }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: "  ",
          }}
          name="SignUp"
          component={SignUpScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
