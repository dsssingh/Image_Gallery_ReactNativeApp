import { Ionicons } from "@expo/vector-icons"; 
import React, { useState } from "react";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { HomeScreen } from "./screens/HomeScreen";

const Drawer = createDrawerNavigator();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // default theme is light
  const theme = isDarkMode ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={theme}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home">
          {(props) => <HomeScreen {...props} isDarkMode={isDarkMode} />}
        </Drawer.Screen>
      </Drawer.Navigator>
      <TouchableOpacity onPress={toggleDarkMode} style={styles.darkModeButton}>
        <Ionicons
          name={isDarkMode ? "md-sunny" : "md-moon"}
          size={20}
          color="#fff"
        />
        {/* <Text style={styles.darkModeButtonText}>Dark Mode</Text> */}
      </TouchableOpacity>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  darkModeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row", 
    alignItems: "center", 
  },
  darkModeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5, 
  },
});

export default App;
