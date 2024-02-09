import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text, FlatList, TouchableOpacity, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get('window').width;

export function GalleryScreen({ navigation, isDarkMode }) {
    const [Data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const cachedData = await AsyncStorage.getItem('cachedImages');
            if (cachedData) {
                // If cached data exists, use it
                setData(JSON.parse(cachedData));
            }
            // Fetch fresh data from the API
            const response = await fetch('https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s,title');
            const json = await response.json();
            const recData = json.photos.photo;
            const images = recData.map(item => ({
                owner: item.owner,
                url: item.url_s,
                title: item.title
            }));
            setData(images);
            // Cache the fetched data
            await AsyncStorage.setItem('cachedImages', JSON.stringify(images));
        } catch (error) {
            console.error(error);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            navigation.navigate('Home', { screen: 'Image', params: { image: item.url, title: item.title, owner: item.owner } });
        }}>
            <View style={[styles.itemContainer, isDarkMode && styles.darkModeItemContainer]}>
                <Image source={{ uri: item.url }} style={styles.image} />
                <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.title, isDarkMode && styles.darkModeTitle]}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, isDarkMode && styles.darkModeContainer]}>
            <FlatList
                data={Data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.flatListContent}
                numColumns={2}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    darkModeContainer: {
        backgroundColor: '#333',
    },
    flatListContent: {
        padding: 10,
    },
    itemContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        margin: 5,
        padding: 10,
        alignItems: 'center',
        width: windowWidth / 2 - 20, // Adjusted width based on available screen width and margins
        marginBottom: 20,
    },
    darkModeItemContainer: {
        backgroundColor: '#555',
    },
    image: {
        width: '100%', // Image width set to 100%
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333333',
        maxWidth: '100%', // Maximum width of the title
    },
    darkModeTitle: {
        color: '#EEE',
    },
});
