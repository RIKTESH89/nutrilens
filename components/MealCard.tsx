import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, useColorScheme } from 'react-native';
import Card from '@/components/ui/Card';
import Colors from '@/constants/Colors';
import { Info } from 'lucide-react-native';

type NutrientType = {
  name: string;
  amount: string;
  percentage?: string;
};

interface MealCardProps {
  imageUrl: string;
  title: string;
  timestamp: string;
  calories: number;
  nutrients: NutrientType[];
  healthScore: number;
  onPress?: () => void;
}

export default function MealCard({
  imageUrl,
  title,
  timestamp,
  calories,
  nutrients,
  healthScore,
  onPress,
}: MealCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const getHealthScoreColor = () => {
    if (healthScore >= 80) return colors.green[500];
    if (healthScore >= 60) return colors.green[400];
    if (healthScore >= 40) return colors.warning;
    return colors.error;
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <Card elevation={1} style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.headerContent}>
            <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
            <Text style={[styles.timestamp, { color: colors.neutral[500] }]}>{timestamp}</Text>
          </View>
          <View style={[styles.scoreContainer, { backgroundColor: getHealthScoreColor() }]}>
            <Text style={styles.scoreText}>{healthScore}</Text>
          </View>
        </View>

        <Image source={{ uri: imageUrl }} style={styles.image} />

        <View style={styles.nutritionSection}>
          <View style={styles.calorieBox}>
            <Text style={[styles.calorieValue, { color: colors.text }]}>{calories}</Text>
            <Text style={[styles.calorieLabel, { color: colors.neutral[500] }]}>calories</Text>
          </View>

          <View style={styles.nutrientsList}>
            {nutrients.slice(0, 3).map((nutrient, index) => (
              <View key={index} style={styles.nutrientItem}>
                <Text style={[styles.nutrientAmount, { color: colors.text }]}>{nutrient.amount}</Text>
                <Text style={[styles.nutrientName, { color: colors.neutral[500] }]}>{nutrient.name}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.moreInfo}>
              <Info size={20} color={colors.secondary} />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 14,
  },
  scoreContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  nutritionSection: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
  },
  calorieBox: {
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  calorieValue: {
    fontSize: 22,
    fontWeight: '700',
  },
  calorieLabel: {
    fontSize: 14,
  },
  nutrientsList: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nutrientItem: {
    alignItems: 'center',
  },
  nutrientAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  nutrientName: {
    fontSize: 12,
  },
  moreInfo: {
    padding: 8,
  },
});