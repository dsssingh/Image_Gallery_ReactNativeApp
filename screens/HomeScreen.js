import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { GalleryScreen } from "./GalleryScreen";
import ImageScreen from "./ImageScreen";

const HomeStack = createStackNavigator();
const windowWidth = Dimensions.get("window").width;
export function HomeScreen({ navigation, isDarkMode }) {
  return (
    <View style={[styles.container, isDarkMode && styles.darkModeContainer]}>
      <HomeStack.Navigator
        initialRouteName="Gallery"
        screenOptions={{ headerShown: false }}
      >
        <HomeStack.Screen name="Gallery">
          {({ navigation }) => (
            <GalleryScreen navigation={navigation} isDarkMode={isDarkMode} />
          )}
        </HomeStack.Screen>
        <HomeStack.Screen name="Image">
          {({ route }) => <ImageScreen route={route} isDarkMode={isDarkMode} />}
        </HomeStack.Screen>
      </HomeStack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  darkModeContainer: {
    backgroundColor: "#333333",
  },
});
