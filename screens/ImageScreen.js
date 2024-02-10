import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";

export default function ImageScreen({ route, navigation, isDarkMode }) {
  const { image, title, owner } = route.params;

  const handleDownload = () => {
    // Validate the image URL
    if (typeof image === "string" && image.trim() !== "") {
      const imageUrl = image;
      Linking.openURL(imageUrl);
    } else {
      console.error("Invalid image URL");
    }
  };

  // i uSed the goBack() method for going back to previos screen
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkModeContainer]}>
      {/* Image */}
      <Image source={{ uri: image }} style={styles.image} />

      {/* Title */}
      <Text style={[styles.title, isDarkMode && styles.darkModeText]}>
        Name: {title}
      </Text>
      <Text style={[styles.owner, isDarkMode && styles.darkModeText]}>
        Owner: {owner}
      </Text>

      {/* Download Button */}
      <TouchableOpacity
        style={[styles.downloadButton, isDarkMode && styles.darkModeButton]}
        onPress={handleDownload}
      >
        <Text style={styles.buttonText}>Download Image</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity
        style={[styles.backButton, isDarkMode && styles.darkModeButton]}
        onPress={handleGoBack}
      >
        <Text style={styles.buttonText}>Go Back to Gallery</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "90%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  owner: {
    fontSize: 18,
    color: "#888",
  },
  downloadButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  backButton: {
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  darkModeContainer: {
    backgroundColor: "#333",
  },
  darkModeText: {
    color: "#fff",
  },
  darkModeButton: {
    backgroundColor: "#555",
  },
});
