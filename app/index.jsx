import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
    const [doa, setDoa] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchDoa = async () => {
            try {
                const response = await fetch('https://open-api.my.id/api/doa');
                const json = await response.json();
                console.log('DATA API:', json);
                
                if (json && json.length > 0) {
                    const randomIndex = Math.floor(Math.random() * json.length);
                    setDoa(json[randomIndex]);
                } else {
                    console.log('Data kosong atau format tidak sesuai');
                }

                setLoading(false);
            }   catch (error) {
                console.error('Gagal mengambil daya doa: ', error);
                setLoading(false);
            }
        };

        fetchDoa();
    }, []);

    if (loading) {
        return <ActivityIndicator size = "large" color = "#843c3c" style={{ marginTop: 50}} />;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Hafalkan Doa Ini</Text>

            {doa ? (
                <View style={styles.card}>
                    <Text style={styles.label}>Judul : </Text>
                    <Text style={styles.value}>{doa.judul}</Text>

                    <Text style={styles.label}>Arab : </Text>
                    <Text style={styles.value}>{doa.arab}</Text>

                    <Text style={styles.label}>Latin : </Text>
                    <Text style={styles.value}>{doa.latin}</Text>

                    <Text style={styles.label}>Terjemah : </Text>
                    <Text style={styles.value}>{doa.terjemah}</Text>
                </View>
            )   : (
                <Text style={{ color: 'red', marginTop: 20 }}>Data tidak ditemukan</Text>
            )}

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonDoa} onPress={() => router.push('/semuadoa')}>
                    <Text style={styles.buttonText}>SEMUA DOA</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonMotivasi} onPress={() => router.push('/motivasi')}>
                    <Text style={styles.buttonText}>MOTIVASI</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonFavorit} onPress={() => router.push('/favoritdoa')}>
                    <Text style={styles.buttonText}>LIHAT DOA FAVORIT</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#843c3c',
        flexGrow: 1,
        alignItems: 'center',
        paddingTop: 40,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        backgroundColor: '#5e2e2e',
        color: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        overflow: 'hidden',
        textAlign: 'center',
    },

    card: {
        backgroundColor: '#a15d5d',
        padding: 20,
        borderRadius: 20,
        width: '100%',
        marginBottom: 30,
    },

    label: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 10,
        fontSize: 16,
    },

    value: {
        color: '#fff',
        fontSize: 15,
    },

    buttonContainer: {
        width: '100%',
        gap: 15,
        marginBottom: 30,
    },

    buttonDoa: {
        backgroundColor: '#5e2e2e',
        paddingVertical: 15,
        borderRadius: 20,
        alignItems: 'center',
    },

    buttonMotivasi: {
        backgroundColor: '#5e2e2e',
        paddingVertical: 15,
        borderRadius: 20,
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    buttonFavorit: {
        backgroundColor: '#5e2e2e',
        paddingVertical: 15,
        borderRadius: 20,
        alignItems: 'center',
    },
});