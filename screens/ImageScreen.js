import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

export default function ImageScreen({ route, navigation }) {
    const { image, title, owner } = route.params;

    // Function to handle the download button press
    const handleDownload = () => {
        // Validate the image URL
        if (typeof image === 'string' && image.trim() !== '') {
            const imageUrl = image;
            Linking.openURL(imageUrl);
        } else {
            console.error('Invalid image URL');
        }
    };

    // Function to navigate back to the gallery page
    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            {/* Image */}
            <Image source={{ uri: image }} style={styles.image} />

            {/* Title */}
            <Text style={styles.title}>Name: {title}</Text>
            <Text style={styles.owner}>Owner: {owner}</Text>

            {/* Download Button */}
            <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
                <Text style={styles.buttonText}>Download Image</Text>
            </TouchableOpacity>

            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                <Text style={styles.buttonText}>Go Back to Gallery</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '90%',
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    owner: {
        fontSize: 18,
        color: '#888',
    },
    downloadButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    backButton: {
        backgroundColor: '#333',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
