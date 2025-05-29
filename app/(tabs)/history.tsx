import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import MealCard from '@/components/MealCard';
import Card from '@/components/ui/Card';
import { Calendar, ArrowLeft, ArrowRight, ChartBar as BarChart, Download } from 'lucide-react-native';

export default function HistoryScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<'meals' | 'stats'>('meals');
  
  // Format date to display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // Navigate to previous day
  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };
  
  // Navigate to next day
  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };
  
  // Sample meal data for history
  const historyMeals = [
    {
      id: '1',
      imageUrl: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
      title: 'Avocado Toast',
      timestamp: '8:15 AM',
      calories: 380,
      nutrients: [
        { name: 'Protein', amount: '12g' },
        { name: 'Carbs', amount: '42g' },
        { name: 'Fat', amount: '18g' }
      ],
      healthScore: 82
    },
    {
      id: '2',
      imageUrl: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg',
      title: 'Chicken Caesar Salad',
      timestamp: '12:30 PM',
      calories: 450,
      nutrients: [
        { name: 'Protein', amount: '35g' },
        { name: 'Carbs', amount: '15g' },
        { name: 'Fat', amount: '25g' }
      ],
      healthScore: 88
    },
    {
      id: '3',
      imageUrl: 'https://images.pexels.com/photos/1147255/pexels-photo-1147255.jpeg',
      title: 'Pasta with Vegetables',
      timestamp: '6:45 PM',
      calories: 520,
      nutrients: [
        { name: 'Protein', amount: '18g' },
        { name: 'Carbs', amount: '75g' },
        { name: 'Fat', amount: '12g' }
      ],
      healthScore: 75
    }
  ];
  
  // Daily nutrition summary data
  const dailySummary = {
    totalCalories: 1350,
    goalCalories: 1800,
    macros: {
      protein: { amount: 65, goal: 90, unit: 'g' },
      carbs: { amount: 132, goal: 200, unit: 'g' },
      fat: { amount: 55, goal: 60, unit: 'g' }
    },
    micronutrients: {
      fiber: { amount: 22, goal: 25, unit: 'g' },
      sugar: { amount: 35, goal: 36, unit: 'g' },
      sodium: { amount: 1800, goal: 2300, unit: 'mg' },
      calcium: { amount: 750, goal: 1000, unit: 'mg' }
    }
  };
  
  const renderProgressBar = (current: number, goal: number, color: string) => {
    const percentage = Math.min((current / goal) * 100, 100);
    return (
      <View style={styles.progressBarContainer}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${percentage}%`, backgroundColor: color }
          ]} 
        />
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      {/* Date Navigation */}
      <View style={[styles.dateNav, { backgroundColor: colors.card }]}>
        <TouchableOpacity onPress={goToPreviousDay} style={styles.dateNavButton}>
          <ArrowLeft size={20} color={colors.text} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.dateDisplay}>
          <Calendar size={16} color={colors.text} style={styles.calendarIcon} />
          <Text style={[styles.dateText, { color: colors.text }]}>
            {formatDate(currentDate)}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={goToNextDay} style={styles.dateNavButton}>
          <ArrowRight size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      {/* View Type Toggle */}
      <View style={styles.viewToggle}>
        <TouchableOpacity
          style={[
            styles.viewToggleButton,
            viewType === 'meals' && { backgroundColor: colors.green[100] }
          ]}
          onPress={() => setViewType('meals')}
        >
          <Text
            style={[
              styles.viewToggleText,
              { color: viewType === 'meals' ? colors.tint : colors.neutral[500] }
            ]}
          >
            Meals
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.viewToggleButton,
            viewType === 'stats' && { backgroundColor: colors.green[100] }
          ]}
          onPress={() => setViewType('stats')}
        >
          <Text
            style={[
              styles.viewToggleText,
              { color: viewType === 'stats' ? colors.tint : colors.neutral[500] }
            ]}
          >
            Statistics
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {viewType === 'meals' ? (
          /* Meals View */
          <View>
            {historyMeals.map(meal => (
              <MealCard
                key={meal.id}
                imageUrl={meal.imageUrl}
                title={meal.title}
                timestamp={meal.timestamp}
                calories={meal.calories}
                nutrients={meal.nutrients}
                healthScore={meal.healthScore}
              />
            ))}
          </View>
        ) : (
          /* Statistics View */
          <View>
            {/* Calories Summary */}
            <Card style={styles.statsCard}>
              <View style={styles.statsCardHeader}>
                <Text style={[styles.statsCardTitle, { color: colors.text }]}>
                  Calories
                </Text>
                <Text style={[styles.statsGoalText, { color: colors.neutral[500] }]}>
                  {dailySummary.totalCalories} / {dailySummary.goalCalories} kcal
                </Text>
              </View>
              
              {renderProgressBar(
                dailySummary.totalCalories, 
                dailySummary.goalCalories, 
                colors.green[500]
              )}
              
              <View style={styles.calorieBreakdown}>
                <Text style={[styles.calorieRemaining, { color: colors.text }]}>
                  {Math.max(0, dailySummary.goalCalories - dailySummary.totalCalories)} kcal remaining
                </Text>
              </View>
            </Card>
            
            {/* Macros Summary */}
            <Card style={styles.statsCard}>
              <Text style={[styles.statsCardTitle, { color: colors.text }]}>
                Macronutrients
              </Text>
              
              {/* Protein */}
              <View style={styles.nutrientRow}>
                <View style={styles.nutrientLabelContainer}>
                  <Text style={[styles.nutrientLabel, { color: colors.text }]}>Protein</Text>
                  <Text style={[styles.nutrientValue, { color: colors.neutral[500] }]}>
                    {dailySummary.macros.protein.amount} / {dailySummary.macros.protein.goal} {dailySummary.macros.protein.unit}
                  </Text>
                </View>
                {renderProgressBar(
                  dailySummary.macros.protein.amount, 
                  dailySummary.macros.protein.goal, 
                  colors.secondary
                )}
              </View>
              
              {/* Carbs */}
              <View style={styles.nutrientRow}>
                <View style={styles.nutrientLabelContainer}>
                  <Text style={[styles.nutrientLabel, { color: colors.text }]}>Carbs</Text>
                  <Text style={[styles.nutrientValue, { color: colors.neutral[500] }]}>
                    {dailySummary.macros.carbs.amount} / {dailySummary.macros.carbs.goal} {dailySummary.macros.carbs.unit}
                  </Text>
                </View>
                {renderProgressBar(
                  dailySummary.macros.carbs.amount, 
                  dailySummary.macros.carbs.goal, 
                  colors.accent
                )}
              </View>
              
              {/* Fat */}
              <View style={styles.nutrientRow}>
                <View style={styles.nutrientLabelContainer}>
                  <Text style={[styles.nutrientLabel, { color: colors.text }]}>Fat</Text>
                  <Text style={[styles.nutrientValue, { color: colors.neutral[500] }]}>
                    {dailySummary.macros.fat.amount} / {dailySummary.macros.fat.goal} {dailySummary.macros.fat.unit}
                  </Text>
                </View>
                {renderProgressBar(
                  dailySummary.macros.fat.amount, 
                  dailySummary.macros.fat.goal, 
                  colors.warning
                )}
              </View>
            </Card>
            
            {/* Micronutrients Summary */}
            <Card style={styles.statsCard}>
              <Text style={[styles.statsCardTitle, { color: colors.text }]}>
                Micronutrients
              </Text>
              
              {Object.entries(dailySummary.micronutrients).map(([key, value]) => (
                <View key={key} style={styles.nutrientRow}>
                  <View style={styles.nutrientLabelContainer}>
                    <Text style={[styles.nutrientLabel, { color: colors.text }]}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Text>
                    <Text style={[styles.nutrientValue, { color: colors.neutral[500] }]}>
                      {value.amount} / {value.goal} {value.unit}
                    </Text>
                  </View>
                  {renderProgressBar(
                    value.amount, 
                    value.goal, 
                    colors.blue[400]
                  )}
                </View>
              ))}
            </Card>
            
            <TouchableOpacity style={[styles.exportButton, { backgroundColor: colors.secondary }]}>
              <Download size={20} color="white" />
              <Text style={styles.exportButtonText}>Export Daily Report</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  dateNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  dateNavButton: {
    padding: 8,
  },
  dateDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  calendarIcon: {
    marginRight: 8,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
  },
  viewToggle: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  viewToggleButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 16,
    marginHorizontal: 4,
  },
  viewToggleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  scrollContent: {
    padding: 16,
    paddingTop: 8,
  },
  statsCard: {
    marginBottom: 16,
  },
  statsCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statsCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  statsGoalText: {
    fontSize: 14,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 6,
  },
  calorieBreakdown: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  calorieRemaining: {
    fontSize: 14,
    fontWeight: '500',
  },
  nutrientRow: {
    marginBottom: 16,
  },
  nutrientLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  nutrientLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  nutrientValue: {
    fontSize: 14,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  exportButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
});