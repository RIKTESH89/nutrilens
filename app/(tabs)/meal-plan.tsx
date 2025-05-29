import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme, Image } from 'react-native';
import Colors from '@/constants/Colors';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Card';
import { Calendar, Clock, ChefHat, Utensils, ShoppingCart } from 'lucide-react-native';

export default function MealPlanScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const [weeklyPlan] = useState({
    generated: '2024-03-20',
    meals: [
      {
        day: 'Monday',
        meals: [
          {
            type: 'Breakfast',
            name: 'Greek Yogurt Power Bowl',
            image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg',
            calories: 380,
            protein: '15g',
            carbs: '45g',
            fat: '12g',
            recipe: {
              ingredients: [
                '1 cup Greek yogurt',
                '1/2 cup mixed berries',
                '1/4 cup granola',
                '1 tbsp honey',
                'Chia seeds'
              ],
              instructions: [
                'Layer yogurt in a bowl',
                'Top with berries and granola',
                'Drizzle with honey',
                'Sprinkle chia seeds'
              ]
            }
          },
          {
            type: 'Lunch',
            name: 'Mediterranean Quinoa Bowl',
            image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
            calories: 450,
            protein: '18g',
            carbs: '58g',
            fat: '20g',
            recipe: {
              ingredients: [
                '1 cup cooked quinoa',
                'Cherry tomatoes',
                'Cucumber',
                'Kalamata olives',
                'Feta cheese',
                'Olive oil'
              ],
              instructions: [
                'Cook quinoa according to package',
                'Chop vegetables',
                'Combine all ingredients',
                'Drizzle with olive oil'
              ]
            }
          },
          {
            type: 'Dinner',
            name: 'Grilled Salmon with Roasted Vegetables',
            image: 'https://images.pexels.com/photos/3655916/pexels-photo-3655916.jpeg',
            calories: 520,
            protein: '32g',
            carbs: '28g',
            fat: '25g',
            recipe: {
              ingredients: [
                '6 oz salmon fillet',
                'Mixed vegetables',
                'Olive oil',
                'Lemon',
                'Herbs'
              ],
              instructions: [
                'Preheat oven to 400°F',
                'Season salmon',
                'Roast vegetables',
                'Grill salmon'
              ]
            }
          }
        ]
      }
      // Add more days here
    ]
  });

  const renderMeal = (meal) => (
    <Card key={meal.type} style={styles.mealCard}>
      <Image source={{ uri: meal.image }} style={styles.mealImage} />
      <View style={styles.mealContent}>
        <Text style={[styles.mealType, { color: colors.neutral[500] }]}>{meal.type}</Text>
        <Text style={[styles.mealName, { color: colors.text }]}>{meal.name}</Text>
        
        <View style={styles.nutritionInfo}>
          <View style={styles.nutritionItem}>
            <Text style={[styles.nutritionValue, { color: colors.text }]}>{meal.calories}</Text>
            <Text style={[styles.nutritionLabel, { color: colors.neutral[500] }]}>calories</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={[styles.nutritionValue, { color: colors.text }]}>{meal.protein}</Text>
            <Text style={[styles.nutritionLabel, { color: colors.neutral[500] }]}>protein</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={[styles.nutritionValue, { color: colors.text }]}>{meal.carbs}</Text>
            <Text style={[styles.nutritionLabel, { color: colors.neutral[500] }]}>carbs</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={[styles.nutritionValue, { color: colors.text }]}>{meal.fat}</Text>
            <Text style={[styles.nutritionLabel, { color: colors.neutral[500] }]}>fat</Text>
          </View>
        </View>

        <View style={styles.recipeSection}>
          <Text style={[styles.recipeTitle, { color: colors.text }]}>Recipe</Text>
          <View style={styles.ingredientsList}>
            {meal.recipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.bullet, { backgroundColor: colors.secondary }]} />
                <Text style={[styles.ingredientText, { color: colors.neutral[700] }]}>
                  {ingredient}
                </Text>
              </View>
            ))}
          </View>
          
          <Text style={[styles.instructionsTitle, { color: colors.text }]}>Instructions</Text>
          {meal.recipe.instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionItem}>
              <Text style={[styles.instructionNumber, { color: colors.secondary }]}>
                {index + 1}.
              </Text>
              <Text style={[styles.instructionText, { color: colors.neutral[700] }]}>
                {instruction}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Card>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Weekly Meal Plan</Text>
        <Text style={[styles.subtitle, { color: colors.neutral[500] }]}>
          Generated on {weeklyPlan.generated}
        </Text>
      </View>

      <Card style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Calendar size={20} color={colors.secondary} />
          <Text style={[styles.summaryText, { color: colors.text }]}>7-day personalized plan</Text>
        </View>
        <View style={styles.summaryItem}>
          <Clock size={20} color={colors.secondary} />
          <Text style={[styles.summaryText, { color: colors.text }]}>3 meals per day</Text>
        </View>
        <View style={styles.summaryItem}>
          <ChefHat size={20} color={colors.secondary} />
          <Text style={[styles.summaryText, { color: colors.text }]}>Easy-to-follow recipes</Text>
        </View>
      </Card>

      {weeklyPlan.meals.map((day) => (
        <View key={day.day} style={styles.daySection}>
          <Text style={[styles.dayTitle, { color: colors.text }]}>{day.day}</Text>
          {day.meals.map(renderMeal)}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  summaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    padding: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  daySection: {
    marginBottom: 24,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  mealCard: {
    marginBottom: 16,
  },
  mealImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  mealContent: {
    padding: 16,
  },
  mealType: {
    fontSize: 14,
    marginBottom: 4,
  },
  mealName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  nutritionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  nutritionLabel: {
    fontSize: 12,
  },
  recipeSection: {
    marginTop: 8,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  ingredientsList: {
    marginBottom: 16,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  ingredientText: {
    fontSize: 14,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  instructionNumber: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
    minWidth: 20,
  },
  instructionText: {
    fontSize: 14,
    flex: 1,
  },
});