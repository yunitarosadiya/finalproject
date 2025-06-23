import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';

const { width } = Dimensions.get('window');

export default function DoaDetail() {
  const {id} = useLocalSearchParams();
  const router = useRouter();
  const [doa, setDoa] = useState(null);
  const [isFavorit, setIsFavorit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchDoa = async () => {
      try {
        const response = await fetch(`https://open-api.my.id/api/doa/${id}`);
        const json = await response.json();
        setDoa(json);
        checkFavorite(json);
      } catch (error) {
        console.error('Error fetching doa detail:', error);
      }
    };
    fetchDoa();
  }, [id]);

  const checkFavorite = async (item) => {
    try {
      const saved = await AsyncStorage.getItem('favoritDoa');
      const data = saved ? JSON.parse(saved) : [];
      const exists = data.find((d) => d.id === item.id);
      setIsFavorit(!!exists);
    } catch (error) {
      console.error('Gagal cek favorit:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const saved = await AsyncStorage.getItem('favoritDoa');
      let data = saved ? JSON.parse(saved) : [];

      const exists = data.find((d) => d.id === doa.id);

      if (exists) {
        data = data.filter((d) => d.id !== doa.id);
        setModalMessage('Dihapus dari Favorit ❤️');
        setShowModal(true);
      } else {
        data.push(doa);
        setModalMessage('Ditambahkan ke Favorit ❤️');
        setShowModal(true);
      }

      await AsyncStorage.setItem('favoritDoa', JSON.stringify(data));
      setIsFavorit(!exists);
    } catch (error) {
      console.error('Gagal simpan favorit:', error);
    }
  };

  if (!doa) {
    return (
      <View style={styles.loadingWrapper}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const salinTeks = async () => {
    const teks = `${doa.judul}\n\n${doa.arab}\n\n${doa.latin}\n\n${doa.terjemah}`;
    await Clipboard.setStringAsync(teks);
    setModalMessage('Teks doa berhasil disalin ke clipboard! 📋');
    setShowModal(true);
  };

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

      <Modal transparent = {true} visible={showModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity onPress={() => setShowModal(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomContainer}>
        <View style={styles.leftButtons}>
          <TouchableOpacity style={styles.iconButton} onPress={toggleFavorite}>
            <Text style={{ fontSize: 26 }}>{isFavorit ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={salinTeks}>
            <Text style={{ fontSize: 20 }}>📋</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/semuadoa')}>
          <Text style={styles.buttonHomeIcon}>🏠</Text>
        </TouchableOpacity>
      </View>
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

  iconButton: {
    backgroundColor: '#5e2e2e',
    borderRadius: 30,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },

  homeButton: {
    backgroundColor: '#5e2e2e',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#843c3c',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#5e2e2e',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },

  bottomContainer: {            
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },

  leftButtons: {               
    flexDirection: 'row',
    gap: 10,
  },
})