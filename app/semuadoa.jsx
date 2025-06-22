import { useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SemuaDoa() {
    const [doaList, setDoaList] = useState([]);
    const [ showModal, setShowModal ] = useState(false) ;
    const router = useRouter();

    useEffect(() => {
        const fetchDoa = async () => {
            try {
                const response = await fetch('https://open-api.my.id/api/doa');
                const json = await response.json();
                setDoaList(json);
            }   catch (error) {
                console.error('Error fetching doa list:', error);
            }
        };
        fetchDoa();
    }, []);


    return (
        <View style={{ flex: 1, backgroundColor: '#843c3c' }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.headerContainer}>
                    <Image source={require('../assets/images/bulubuku.png')} style={styles.headerImage} />
                    <Text style={styles.headerText}>Daftar Doa Harian</Text>
                </View>

                <View style={styles.listContainer}>
                    {doaList.map((doa) => (
                        <TouchableOpacity
                            key={doa.id}
                            style={styles.doaCard}
                            onPress={() => router.push(`/detaildoa/${doa.id}`)}>
                            <Text style={styles.doaText}>{doa.judul.toLowerCase()}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <Modal transparent={true} visible={showModal} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Semangat terus sayang 😘✨</Text>
                        <TouchableOpacity onPress={() => setShowModal(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Tutup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.notesButton} onPress={() => setShowModal(true)}>
                    <Text style={styles.buttonText}>Notes</Text>
                </TouchableOpacity>

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
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
    },

    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },

    headerImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },

    headerText: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#5e2e2e',
        paddingHorizontal: 35,
        paddingVertical: 10,
        borderRadius: 30,
    },

    listContainer: {
        width: '100%',
    },

    doaCard: {
        backgroundColor: '#a15d5d',
        paddingVertical: 20,
        borderRadius: 30,
        marginBottom: 15,
        alignItems: 'center',
    },

    doaText: {
        color: '#fff',
        fontSize: 16,
        textTransform: 'capitalize',
    },

    bottomContainer: {
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },

    notesButton: {
        backgroundColor: '#5e2e2e',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 20,
    },

    homeButton: {
        backgroundColor: '#5e2e2e',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
    },

    buttonHomeIcon: {
        fontSize: 24,
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
});