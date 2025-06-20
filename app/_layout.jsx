import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [ appReady, setAppReady ] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() =>  {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();

        setTimeout(async () => {
            await SplashScreen.hideAsync();
            setAppReady(true);
        }, 3000);
    }, [] );

    if (!appReady) {
        return (
            <View style={styles.splashContainer}>
                <Animated.Image
                    source={require('../assets/images/logo.png')}
                    style={[styles.logo, { opacity: fadeAnim }]}
                    resizeMode="contain"
                />
            </View>
        );
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Slot />
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },

    logo: {
        width: width * 0.95,
        height: height * 0.95,
    },
});