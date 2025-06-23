import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function FavoritDoa() {
  const [favoritList, setFavoritList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const saved = await AsyncStorage.getItem('favoritDoa');
        if (saved !== null) {
          setFavoritList(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Gagal load favorit:', error);
      }
    };
    loadFavorites();
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>❤️ Doa Favoritmu</Text>
        {favoritList.length === 0 ? (
          <Text style={styles.empty}>Belum ada doa favorit</Text>
        ) : (
          favoritList.map((doa) => (
            <TouchableOpacity
              key={doa.id}
              style={styles.card}
              onPress={() => router.push(`/detaildoa/${doa.id}`)}>
              <Text style={styles.text}>{doa.judul.toLowerCase()}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <View style={styles.bottomButton}>
        <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/')}>
          <Text style={styles.buttonHomeIcon}>🏠</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#843c3c',
    padding: 20,
    minHeight: '100%',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    alignSelf: 'center',
  },

  empty: {
    color: 'white',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },

  card: {
    backgroundColor: '#a15d5d',
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
  },

  text: {
    color: '#fff',
    fontSize: 16,
    textTransform: 'capitalize',
  },

  wrapper: {
    flex: 1,
    backgroundColor: '#843c3c',
  },
  
  bottomButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  homeButton: {
    backgroundColor: '#5e2e2e',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
    elevation: 5,
  },

  buttonHomeIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#843c3c',
  },
});
