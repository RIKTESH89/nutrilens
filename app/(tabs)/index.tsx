import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import MealCard from '@/components/MealCard';
import HealthMetricCard from '@/components/HealthMetricCard';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { CirclePlus as PlusCircle, Utensils, TrendingUp } from 'lucide-react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [activeTab, setActiveTab] = useState('today');

  const todayMeals = [
    {
      id: '1',
      imageUrl: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg',
      title: 'Breakfast Bowl',
      timestamp: 'Today, 8:30 AM',
      calories: 450,
      nutrients: [
        { name: 'Protein', amount: '15g' },
        { name: 'Carbs', amount: '65g' },
        { name: 'Fat', amount: '12g' }
      ],
      healthScore: 85
    },
    {
      id: '2',
      imageUrl: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg',
      title: 'Grilled Salmon Salad',
      timestamp: 'Today, 12:45 PM',
      calories: 520,
      nutrients: [
        { name: 'Protein', amount: '32g' },
        { name: 'Carbs', amount: '28g' },
        { name: 'Fat', amount: '25g' }
      ],
      healthScore: 92
    }
  ];
  
  const recommendedMeals = [
    {
      id: '3',
      imageUrl: 'https://images.pexels.com/photos/1833349/pexels-photo-1833349.jpeg',
      title: 'Mediterranean Quinoa Bowl',
      timestamp: 'Recommended for dinner',
      calories: 480,
      nutrients: [
        { name: 'Protein', amount: '18g' },
        { name: 'Carbs', amount: '58g' },
        { name: 'Fat', amount: '20g' }
      ],
      healthScore: 90
    }
  ];
  
  const renderHealthMetrics = () => {
    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.metricsContainer}
      >
        <HealthMetricCard
          title="Daily Calories"
          value={1850}
          unit="kcal"
          change={-12}
          changeLabel="vs goal"
          status="normal"
        />
        <HealthMetricCard
          title="Protein"
          value={85}
          unit="g"
          change={5}
          changeLabel="vs target"
          status="normal"
        />
        <HealthMetricCard
          title="Sugar"
          value={45}
          unit="g"
          change={22}
          changeLabel="vs limit"
          status="warning"
          info="High sugar intake detected"
        />
        <HealthMetricCard
          title="Hydration"
          value={1.2}
          unit="L"
          change={-35}
          changeLabel="vs target"
          status="warning"
        />
      </ScrollView>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={[styles.welcomeText, { color: colors.text }]}>
          Hello, <Text style={{ fontWeight: '700' }}>Sarah</Text>
        </Text>
        <Text style={[styles.dateText, { color: colors.neutral[500] }]}>
          Wednesday, May 24
        </Text>
      </View>

      {/* Health Overview Card */}
      <Card elevation={2} style={styles.overviewCard}>
        <View style={styles.overviewHeader}>
          <Text style={[styles.overviewTitle, { color: colors.text }]}>Today's Health Overview</Text>
          <TouchableOpacity>
            <TrendingUp size={20} color={colors.tint} />
          </TouchableOpacity>
        </View>
        {renderHealthMetrics()}
      </Card>

      {/* Meals Section */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Meals</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'today' && { backgroundColor: colors.green[100] }
            ]}
            onPress={() => setActiveTab('today')}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === 'today' ? colors.tint : colors.neutral[500] }
              ]}
            >
              Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'recommended' && { backgroundColor: colors.green[100] }
            ]}
            onPress={() => setActiveTab('recommended')}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === 'recommended' ? colors.tint : colors.neutral[500] }
              ]}
            >
              Recommended
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Meal Cards */}
      <View style={styles.mealsContainer}>
        {activeTab === 'today' ? (
          todayMeals.map(meal => (
            <MealCard
              key={meal.id}
              imageUrl={meal.imageUrl}
              title={meal.title}
              timestamp={meal.timestamp}
              calories={meal.calories}
              nutrients={meal.nutrients}
              healthScore={meal.healthScore}
            />
          ))
        ) : (
          recommendedMeals.map(meal => (
            <MealCard
              key={meal.id}
              imageUrl={meal.imageUrl}
              title={meal.title}
              timestamp={meal.timestamp}
              calories={meal.calories}
              nutrients={meal.nutrients}
              healthScore={meal.healthScore}
            />
          ))
        )}
      </View>

      {/* Add Meal Button */}
      {activeTab === 'today' && (
        <Button 
          title="Add Meal" 
          onPress={() => {}} 
          leftIcon={<PlusCircle size={20} color="white" />}
          style={styles.addButton}
        />
      )}

      {/* Personalized Tip */}
      <Card elevation={1} style={styles.tipCard}>
        <View style={styles.tipHeader}>
          <Utensils size={20} color={colors.secondary} />
          <Text style={[styles.tipTitle, { color: colors.text }]}>Personalized Tip</Text>
        </View>
        <Text style={[styles.tipContent, { color: colors.neutral[700] }]}>
          Based on your recent meals and glucose levels, try adding more fiber to your breakfast
          to help maintain steady blood sugar throughout the day.
        </Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 16,
  },
  overviewCard: {
    marginBottom: 24,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  metricsContainer: {
    paddingBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  mealsContainer: {
    marginBottom: 24,
  },
  addButton: {
    marginBottom: 24,
  },
  tipCard: {
    marginBottom: 24,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  tipContent: {
    fontSize: 14,
    lineHeight: 20,
  }
});