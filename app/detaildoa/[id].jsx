import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function DoaDetail() {
  const {id} = useLocalSearchParams();
  const router = useRouter();
  const [doa, setDoa] = useState(null);

  useEffect(() => {
    const fetchDoa = async () => {
      try {
        const response = await fetch(`https://open-api.my.id/api/doa/${id}`);
        const json = await response.json();
        setDoa(json);
      } catch (error) {
        console.error('Error fetching doa detail:', error);
      }
    };
    fetchDoa();
  }, [id]);

  if (!doa) {
    return (
      <View style={styles.loadingWrapper}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.Wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Image
            source={require('../../assets/images/bulubuku.png')}
            style={styles.logo} />
          <Text style={styles.title}>{doa.judul}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.arab}>{doa.arab}</Text>
          <Text style={styles.latin}>{doa.latin}</Text>
          <Text style={styles.terjemah}>{doa.terjemah}</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/')}>
        <Text style={styles.buttonHomeIcon}>🏠</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: '#843c3c',
  },

  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 100,
    paddingHorizontal: 20,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 4,
  },

  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#5e2e2e',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    marginLeft: -5,
  },

  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    width: width*0.9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 5,
    elevation: 5,
  },

  arab: {
    fontSize: 22,
    color: '#6a1b1b',
    textAlign: 'center',
    marginBottom: 15,
  },

  latin: {
    fontSize: 18,
    color: '#6a1b1b',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 10,
  },

  terjemah: {
    fontSize: 16,
    color: '#6a1b1b',
    textAlign: 'center',
  },

  homeButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },

  buttonHomeIcon: {
    fontSize: 30,
    color: '#843c3c',
  },

  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#843c3c',
  },

  loadingText: {
    fontSize: 18,
    color: '#fff',
  },
})