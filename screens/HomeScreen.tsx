import React, { useState } from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Alert,ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

export default function HomeScreen() {
  const [steps, setSteps] = useState(7850);
  const [loading, setLoading] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const navigation = useNavigation();

  const handleSync = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const newSteps = Math.floor(Math.random() * 10000);
      setSteps(newSteps);
      setLastSync(new Date().toLocaleTimeString());
      Alert.alert('Sincronización exitosa con el dispositivo BLE');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola, Enzo 👋</Text>

      <View style={styles.stepsContainer}>
        <View style={styles.stepsRow}>
          <View style={styles.animationContainer}>
            <LottieView 
              source={require('../assets/animacion/walking2.json')}
              autoPlay
              loop
              style={styles.walkAnimation}
            />
          </View>
          <View style={styles.stepsInfo}>
            <Text style={styles.steps}>{steps.toLocaleString()}</Text>
            <Text style={styles.stepsLabel}>pasos hoy</Text>
            {lastSync && <Text style={styles.syncTime}>Última sincronización: {lastSync}</Text>}
          </View>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.syncButton} 
          onPress={handleSync}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.syncButtonText}>Sincronizar dispositivo</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Consejos' as never)}
        >
          <Text style={styles.secondaryButtonText}>Ver consejos de salud</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 24, 
  backgroundColor: '#f8fafc', 
    justifyContent: 'space-between' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 24,
    color: '#333',
    textAlign: 'center' 
  },
  stepsContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between' 
  },
  animationContainer: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  walkAnimation: {
    width: 120, 
    height: 120,
  },
  stepsInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  steps: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'right' 
  },
  stepsLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
    textAlign: 'right'
  },
  syncTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
    textAlign: 'right'
  },
  buttonsContainer: {
    marginBottom: 24
  },
  syncButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  syncButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  secondaryButtonText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 16,
  },
});