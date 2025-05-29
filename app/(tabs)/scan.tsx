import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  useColorScheme,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Camera, Aperture, Camera as FlipCamera, Check, X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function ScanScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [photo, setPhoto] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  
  // Mock function to simulate analysis
  const analyzeMeal = async () => {
    setAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock results
    setResults({
      foodItems: [
        { name: 'Grilled Chicken Breast', confidence: 0.92, calories: 165, protein: 31, carbs: 0, fat: 3.6 },
        { name: 'Brown Rice', confidence: 0.89, calories: 215, protein: 5, carbs: 45, fat: 1.8 },
        { name: 'Steamed Broccoli', confidence: 0.94, calories: 55, protein: 3.7, carbs: 11, fat: 0.6 }
      ],
      totalNutrition: {
        calories: 435,
        protein: 39.7,
        carbs: 56,
        fat: 6,
        fiber: 7.2,
        sugar: 3.8
      },
      healthScore: 88,
      recommendations: [
        "This meal is well-balanced with good protein content",
        "Consider adding some healthy fats like avocado or olive oil"
      ]
    });
    
    setAnalyzing(false);
  };
  
  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };
  
  const takePicture = async () => {
    // Mocking the picture capture for web
    if (Platform.OS === 'web') {
      setPhoto('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg');
      return;
    }
    
    // In a real app, we would capture the actual photo
    setPhoto('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg');
  };
  
  const resetCamera = () => {
    setPhoto(null);
    setResults(null);
  };
  
  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={colors.tint} />
      </View>
    );
  }
  
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={[styles.permissionText, { color: colors.text }]}>
          We need your permission to use the camera
        </Text>
        <Button
          title="Grant Permission"
          onPress={requestPermission}
          variant="primary"
          style={styles.permissionButton}
        />
      </View>
    );
  }
  
  if (results) {
    // Show results
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.resultHeader}>
          <Text style={[styles.resultTitle, { color: colors.text }]}>Meal Analysis</Text>
          <View style={[styles.scoreContainer, { backgroundColor: colors.green[500] }]}>
            <Text style={styles.scoreText}>{results.healthScore}</Text>
          </View>
        </View>
        
        <Image
          source={{ uri: photo! }}
          style={styles.resultImage}
        />
        
        <Card style={styles.nutritionCard}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Total Nutrition</Text>
          <View style={styles.macrosContainer}>
            <View style={styles.macroItem}>
              <Text style={[styles.macroValue, { color: colors.text }]}>{results.totalNutrition.calories}</Text>
              <Text style={[styles.macroLabel, { color: colors.neutral[500] }]}>Calories</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={[styles.macroValue, { color: colors.text }]}>{results.totalNutrition.protein}g</Text>
              <Text style={[styles.macroLabel, { color: colors.neutral[500] }]}>Protein</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={[styles.macroValue, { color: colors.text }]}>{results.totalNutrition.carbs}g</Text>
              <Text style={[styles.macroLabel, { color: colors.neutral[500] }]}>Carbs</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={[styles.macroValue, { color: colors.text }]}>{results.totalNutrition.fat}g</Text>
              <Text style={[styles.macroLabel, { color: colors.neutral[500] }]}>Fat</Text>
            </View>
          </View>
        </Card>
        
        <Card style={styles.detectedItemsCard}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Detected Food Items</Text>
          {results.foodItems.map((item, index) => (
            <View key={index} style={styles.foodItem}>
              <View style={styles.foodItemHeader}>
                <Text style={[styles.foodItemName, { color: colors.text }]}>{item.name}</Text>
                <Text style={[styles.foodItemConfidence, { color: colors.neutral[500] }]}>
                  {Math.round(item.confidence * 100)}% match
                </Text>
              </View>
              <View style={styles.foodItemNutrients}>
                <Text style={[styles.foodItemNutrient, { color: colors.neutral[700] }]}>
                  {item.calories} cal
                </Text>
                <Text style={[styles.foodItemNutrient, { color: colors.neutral[700] }]}>
                  {item.protein}g protein
                </Text>
                <Text style={[styles.foodItemNutrient, { color: colors.neutral[700] }]}>
                  {item.carbs}g carbs
                </Text>
                <Text style={[styles.foodItemNutrient, { color: colors.neutral[700] }]}>
                  {item.fat}g fat
                </Text>
              </View>
            </View>
          ))}
        </Card>
        
        <Card style={styles.recommendationsCard}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Personalized Recommendations</Text>
          {results.recommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationItem}>
              <View style={[styles.recommendationBullet, { backgroundColor: colors.tint }]} />
              <Text style={[styles.recommendationText, { color: colors.neutral[700] }]}>{rec}</Text>
            </View>
          ))}
        </Card>
        
        <View style={styles.buttonsContainer}>
          <Button
            title="Save to Diary"
            onPress={() => {}}
            variant="primary"
            style={{ flex: 1, marginRight: 8 }}
          />
          <Button
            title="New Scan"
            onPress={resetCamera}
            variant="outline"
            style={{ flex: 1, marginLeft: 8 }}
          />
        </View>
      </ScrollView>
    );
  }
  
  if (photo) {
    // Show captured photo and analysis options
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: photo }}
          style={styles.previewImage}
        />
        
        {analyzing ? (
          <View style={styles.analyzeOverlay}>
            <ActivityIndicator size="large" color={colors.tint} />
            <Text style={[styles.analyzeText, { color: colors.text }]}>
              Analyzing your meal...
            </Text>
          </View>
        ) : (
          <View style={styles.previewActions}>
            <TouchableOpacity
              style={[styles.previewActionButton, { backgroundColor: colors.error }]}
              onPress={resetCamera}
            >
              <X size={24} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.previewActionButton, { backgroundColor: colors.tint }]}
              onPress={analyzeMeal}
            >
              <Check size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
  
  // Camera view
  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <View style={[styles.cameraContainer, { backgroundColor: colors.neutral[300] }]}>
          <Camera size={48} color={colors.neutral[500]} style={styles.cameraPlaceholder} />
          <Text style={[styles.cameraPlaceholderText, { color: colors.neutral[600] }]}>
            Camera preview unavailable on web
          </Text>
          <Button 
            title="Simulate Photo Capture" 
            onPress={takePicture} 
            variant="primary"
            style={styles.simulateButton}
          />
        </View>
      ) : (
        <CameraView
          style={styles.cameraContainer}
          facing={facing}
        >
          <View style={styles.cameraControls}>
            <TouchableOpacity 
              style={styles.flipButton} 
              onPress={toggleCameraFacing}
            >
              <FlipCamera size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            style={styles.captureButtonContainer}
            onPress={takePicture}
          >
            <View style={styles.captureButton}>
              <Aperture size={28} color="white" />
            </View>
          </TouchableOpacity>
        </CameraView>
      )}
      
      <View style={styles.instructions}>
        <Card style={styles.instructionCard}>
          <Text style={[styles.instructionTitle, { color: colors.text }]}>
            Take a photo of your meal
          </Text>
          <Text style={[styles.instructionText, { color: colors.neutral[600] }]}>
            Position your camera directly above your plate for the best results. Make sure all food items are visible.
          </Text>
        </Card>
      </View>
    </View>
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
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  permissionButton: {
    width: 200,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPlaceholder: {
    marginBottom: 16,
  },
  cameraPlaceholderText: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  simulateButton: {
    width: 250,
  },
  cameraControls: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  flipButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  captureButtonContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#34D399',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.8)',
  },
  instructions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  instructionCard: {
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  previewImage: {
    flex: 1,
    width: '100%',
  },
  previewActions: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    alignSelf: 'center',
  },
  previewActionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  analyzeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  analyzeText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginTop: 16,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  scoreContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  resultImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  nutritionCard: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  macroLabel: {
    fontSize: 14,
  },
  detectedItemsCard: {
    marginBottom: 16,
  },
  foodItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  foodItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  foodItemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  foodItemConfidence: {
    fontSize: 14,
  },
  foodItemNutrients: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  foodItemNutrient: {
    fontSize: 14,
    marginRight: 16,
  },
  recommendationsCard: {
    marginBottom: 24,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  recommendationBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 8,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  }
});