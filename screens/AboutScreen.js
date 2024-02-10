import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen({ isDarkMode }) {
    const openGitHubLink = () => {
        // Add your GitHub repository link here
        const githubLink = 'https://github.com/Dindayalsingh04/Image_Gallery_ReactNativeApp';
        // Use Linking to open the GitHub link
        // Linking.openURL(githubLink);
        console.log('GitHub link:', githubLink);
    };

    return (
        <View style={[styles.container, isDarkMode && styles.darkModeContainer]}>
            <Text style={[styles.title, isDarkMode && styles.darkModeText]}>About This App</Text>
            <Text style={[styles.description, isDarkMode && styles.darkModeText]}>
                This app is made as a task in Banao Technologies React Native Internship Program
            </Text>
            <TouchableOpacity onPress={openGitHubLink} style={styles.githubButton}>
                <Ionicons name="logo-github" size={24} color="#fff" />
                <Text style={styles.githubButtonText}>View Code on GitHub</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
    },
    githubButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#333',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    githubButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#fff',
    },
    darkModeContainer: {
        backgroundColor: '#333',
    },
    darkModeText: {
        color: '#fff',
    },
});
