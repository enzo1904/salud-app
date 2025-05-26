import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native';

// datos de los consejos 
const HEALTH_TIPS = [
  {
    id: 1,
    text: 'Toma al menos 2L de agua al día',
    detail: 'Beber suficiente agua ayuda a mantener la temperatura corporal, transportar nutrientes y eliminar toxinas.',
    icon: '💧',
    image: require('../assets/animacion/agua.jpg'),
    color: '#3b82f6'
  },
  {
    id: 2,
    text: 'Come frutas y verduras',
    detail: 'Estos alimentos aportan vitaminas, minerales y antioxidantes necesarios para una buena salud.',
    icon: '🥗',
    image: require('../assets/animacion/verduras.jpg'),
    color: '#10b981'
  },
  {
    id: 3,
    text: 'Camina al menos 30 minutos diarios',
    detail: 'Caminar regularmente mejora la salud cardiovascular, fortalece los músculos y reduce el estrés.',
    icon: '🚶‍♂️',
    image: require('../assets/animacion/caminar.jpg'),
    color: '#f59e0b'
  },
  {
    id: 4,
    text: 'Haz pausas activas y respira',
    detail: 'Tomarte pausas cortas mejora la concentración, reduce la fatiga y previene dolores posturales.',
    icon: '🧘‍♀️',
    image: require('../assets/animacion/yoga.jpg'),
    color: '#8b5cf6'
  },
  {
    id: 5,
    text: 'Duerme al menos 7–8 horas',
    detail: 'El descanso adecuado mejora la memoria, la recuperación muscular y el estado de ánimo.',
    icon: '🛌',
    image: require('../assets/animacion/dormir.jpg'),
    color: '#ec4899'
  }
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HealthTipsScreen = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const animValues = useRef(HEALTH_TIPS.map(() => new Animated.Value(0))).current;

  const toggleCard = (id: number) => {
    const index = HEALTH_TIPS.findIndex(item => item.id === id);
    const isExpanding = expandedId !== id;
    
    // Cerrar la tarjeta actualmente abierta
    if (expandedId !== null) {
      const currentIndex = HEALTH_TIPS.findIndex(item => item.id === expandedId);
      Animated.spring(animValues[currentIndex], {
        toValue: 0,
        useNativeDriver: false
      }).start();
    }

    // Abrir/cerrar la tarjeta seleccionada
    Animated.spring(animValues[index], {
      toValue: isExpanding ? 1 : 0,
      useNativeDriver: false
    }).start();
    
    setExpandedId(isExpanding ? id : null);
  };

  const renderTipCard = ({ item, index }: { item: typeof HEALTH_TIPS[0], index: number }) => {
    const cardHeight = animValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: [150, 250] 
    });

    const detailOpacity = animValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    const arrowRotation = animValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    });

    return (
      <View style={styles.cardContainer}>
        <Animated.View style={[
          styles.card,
          { 
            height: cardHeight,
            borderLeftColor: item.color,
            borderLeftWidth: 6
          }
        ]}>
          <Image 
            source={item.image} 
            style={styles.cardBackground} 
            blurRadius={expandedId === item.id ? 1 : 0}
          />
          
          <View style={styles.cardContent}>
            <Text style={styles.cardIcon}>{item.icon}</Text>
            <Text style={styles.cardTitle}>{item.text}</Text>
            
            <Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
              <TouchableOpacity
                onPress={() => toggleCard(item.id)}
                style={[styles.expandButton, { backgroundColor: item.color }]}
                activeOpacity={0.7}
              >
                <Text style={styles.expandButtonText}>▼</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          <Animated.View style={[styles.detailContent, { opacity: detailOpacity }]}>
            <Text style={styles.detailText}>{item.detail}</Text>
          </Animated.View>
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Consejos de Salud 🧠</Text>
      
      <FlatList
        data={HEALTH_TIPS}
        renderItem={renderTipCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

//estilos
const styles = StyleSheet.create({
  screenContainer: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#f8fafc' 
  },
  screenTitle: { 
    fontSize: 26,
    fontWeight: '800',
    marginVertical: 20,
    color: '#1e293b',
    textAlign: 'center',
    letterSpacing: 0.5
  },
  listContainer: {
    paddingBottom: 24
  },
  cardContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  card: {
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  cardBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
    opacity: 0.8
  },
  cardContent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  cardIcon: {
    fontSize: 28,
    marginRight: 12
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1
  },
  expandButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  expandButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: -2
  },
  detailContent: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  detailText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#334155'
  }
});

export default HealthTipsScreen;