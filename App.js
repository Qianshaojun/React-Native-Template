import { useEffect, useState } from 'react';
import {  Text, View, StatusBar, PixelRatio, Dimensions, useColorScheme } from 'react-native';
import * as Font from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from '@ant-design/react-native';
import Navigation from './src/navigation';

export default function App() {
    const [isReady, setReadyState] = useState(false);
    const colorScheme = useColorScheme();
    
    const loadAsync = function() {
      return Promise.all([
        Font.loadAsync(
          'antoutline',
          require('@ant-design/icons-react-native/fonts/antoutline.ttf')
        ),
        Font.loadAsync(
          'antfill',
          require('@ant-design/icons-react-native/fonts/antfill.ttf')
        )
      ])
    }

    useEffect(()=>{
      loadAsync().then(res => setReadyState(true));
    }, [])

    if(isReady) {
      return <Provider>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar style='auto' />
      </SafeAreaProvider>
      </Provider>
      
    } 
    return <View><Text>loading...</Text></View>
}
