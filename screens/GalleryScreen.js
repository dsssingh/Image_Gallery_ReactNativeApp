import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get('window').width;

export function GalleryScreen({ navigation }) {
    const [Data, setData] = useState([]);
    const [oldData, setOldData] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getData();
        }
    }, [isFocused]);

    const getData = async () => {
        try {
            const response = await fetch('https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s,title');

            const json = await response.json();
            const recData = json.photos.photo;
            const images = recData.map(item => ({
                owner: item.owner,
                url: item.url_s,
                title: item.title
            }));
            setData(images);

            if (images !== oldData && images.length !== 0) {
                setAsyncStorage(images);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const setAsyncStorage = async (images) => {
        try {
            await AsyncStorage.setItem('Images', JSON.stringify(images));
        } catch (error) {
            console.error(error);
        }
    }

    const getAsyncStorage = async () => {
        try {
            const fetchedImages = await AsyncStorage.getItem('Images');
            const parsedImages = JSON.parse(fetchedImages);
            setOldData(parsedImages);
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        getAsyncStorage();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            
                navigation.navigate('Home', { screen: 'Image', params: { image: item.url, title: item.title,owner:item.owner } });
            
        }}
        >
            <View style={styles.itemContainer}>
                <Image source={{ uri: item.url }} style={styles.image} />
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
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
});
