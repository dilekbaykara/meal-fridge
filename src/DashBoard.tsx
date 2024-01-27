import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Text } from "react-native";

interface DashBoardProps {
  navigation: StackNavigationProp<any, "DashBoard">;
}

function DashBoard({ navigation }: DashBoardProps) {
  return (
    <View>
      <Text>Dash Board</Text>
    </View>
  );
}

export default DashBoard;
