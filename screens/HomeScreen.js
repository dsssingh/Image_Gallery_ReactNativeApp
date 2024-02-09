import React from 'react'
import { Text,StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { GalleryScreen } from './GalleryScreen';
import ImageScreen from './ImageScreen';



const HomeStack = createStackNavigator();
export  function HomeScreen({navigation}) {

    
  return (
    
    <HomeStack.Navigator initialRouteName='Gallery' >
      <HomeStack.Screen name="Gallery" component={GalleryScreen} options={{headerShown:false}} />
      <HomeStack.Screen name="Image" component={ImageScreen} options={{headerShown:false}}/>
    </HomeStack.Navigator>
  )
}

const styles = StyleSheet.create({

  image:{

      margin:2,
      height:118,
      width:118
  }
})