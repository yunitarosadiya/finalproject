import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const motivasiList = [
  "✨ Sesungguhnya sesudah kesulitan itu ada kemudahan. (QS Al-Insyirah: 6)",
  "🕊️ Jangan bersedih, Allah selalu bersamamu. (QS At-Taubah: 40)",
  "🌿 Allah tidak membebani seseorang melainkan sesuai kesanggupannya. (QS Al-Baqarah: 286)",
  "🌙 Jangan tinggalkan doa, sebab doa adalah kekuatan seorang hamba.",
  "💖 Bersyukurlah walau hanya sedikit, karena Allah akan menambahkannya.",
];

export default function Motivasi() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>🌟 MOTIVASI</Text>

        {motivasiList.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.motivasiText}>{item}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/')}>
        <Text style={styles.buttonHomeIcon}>🏠</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#843c3c',
  },

  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#5e2e2e',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },

  motivasiText: {
    fontSize: 15,
    color: '#5e2e2e',
    textAlign: 'center',
    lineHeight: 24,
  },

  homeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#5e2e2e',
    padding: 15,
    borderRadius: 30,
  },

  buttonHomeIcon: {
    fontSize: 24,
    color: '#fff',
  },
});