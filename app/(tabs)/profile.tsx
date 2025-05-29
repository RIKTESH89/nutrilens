import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  useColorScheme,
  TouchableOpacity,
  Switch,
  TextInput
} from 'react-native';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import { User, Settings, Heart, Weight, Activity, FileText, ChevronRight, Bell, Lock, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [activeSection, setActiveSection] = useState<'profile' | 'medical' | 'settings'>('profile');
  
  // User profile data
  const [profile, setProfile] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    age: 32,
    gender: 'Female',
    height: 168, // cm
    weight: 65, // kg
    weightGoal: 'maintain',
    activityLevel: 'moderate',
    dietaryPreferences: ['Low Carb', 'Pescatarian'],
    allergies: ['Peanuts', 'Shellfish'],
    healthConditions: ['Prediabetes', 'Hypertension'],
    dailyCalorieGoal: 1800,
  });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    mealReminders: true,
    weeklyReports: true,
    recommendations: true,
    goalProgress: true,
  });
  
  const renderProfileSection = () => (
    <>
      <Card style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={[styles.profileAvatarPlaceholder, { backgroundColor: colors.green[200] }]}>
            <User size={40} color={colors.green[700]} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.text }]}>{profile.name}</Text>
            <Text style={[styles.profileEmail, { color: colors.neutral[500] }]}>{profile.email}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={[styles.editProfileText, { color: colors.secondary }]}>Edit Profile</Text>
        </TouchableOpacity>
      </Card>
      
      <Card style={styles.statsCard}>
        <View style={styles.statRow}>
          <View style={styles.stat}>
            <Text style={[styles.statValue, { color: colors.text }]}>{profile.height} cm</Text>
            <Text style={[styles.statLabel, { color: colors.neutral[500] }]}>Height</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={[styles.statValue, { color: colors.text }]}>{profile.weight} kg</Text>
            <Text style={[styles.statLabel, { color: colors.neutral[500] }]}>Weight</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={[styles.statValue, { color: colors.text }]}>22.3</Text>
            <Text style={[styles.statLabel, { color: colors.neutral[500] }]}>BMI</Text>
          </View>
        </View>
      </Card>
      
      <Card style={styles.preferencesCard}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Dietary Preferences</Text>
        <View style={styles.chipContainer}>
          {profile.dietaryPreferences.map((pref, index) => (
            <View 
              key={index} 
              style={[styles.chip, { backgroundColor: colors.green[100] }]}
            >
              <Text style={[styles.chipText, { color: colors.tint }]}>{pref}</Text>
            </View>
          ))}
          <TouchableOpacity 
            style={[styles.addChip, { borderColor: colors.neutral[300] }]}
          >
            <Text style={{ color: colors.neutral[500] }}>+ Add</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 16 }]}>Allergies</Text>
        <View style={styles.chipContainer}>
          {profile.allergies.map((allergy, index) => (
            <View 
              key={index} 
              style={[styles.chip, { backgroundColor: colors.error + '20' }]}
            >
              <Text style={[styles.chipText, { color: colors.error }]}>{allergy}</Text>
            </View>
          ))}
          <TouchableOpacity 
            style={[styles.addChip, { borderColor: colors.neutral[300] }]}
          >
            <Text style={{ color: colors.neutral[500] }}>+ Add</Text>
          </TouchableOpacity>
        </View>
      </Card>
      
      <Card style={styles.goalsCard}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Nutrition Goals</Text>
        
        <View style={styles.goalItem}>
          <Text style={[styles.goalLabel, { color: colors.text }]}>Daily Calories</Text>
          <View style={styles.goalValueContainer}>
            <TextInput
              style={[styles.goalInput, { color: colors.text }]}
              value={profile.dailyCalorieGoal.toString()}
              keyboardType="numeric"
            />
            <Text style={[styles.goalUnit, { color: colors.neutral[500] }]}>kcal</Text>
          </View>
        </View>
        
        <View style={styles.goalItem}>
          <Text style={[styles.goalLabel, { color: colors.text }]}>Weight Goal</Text>
          <View style={styles.segmentedControl}>
            <TouchableOpacity 
              style={[
                styles.segment, 
                profile.weightGoal === 'lose' && { backgroundColor: colors.blue[100] }
              ]}
            >
              <Text 
                style={[
                  styles.segmentText, 
                  { color: profile.weightGoal === 'lose' ? colors.secondary : colors.neutral[500] }
                ]}
              >
                Lose
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.segment, 
                profile.weightGoal === 'maintain' && { backgroundColor: colors.green[100] }
              ]}
            >
              <Text 
                style={[
                  styles.segmentText, 
                  { color: profile.weightGoal === 'maintain' ? colors.tint : colors.neutral[500] }
                ]}
              >
                Maintain
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.segment, 
                profile.weightGoal === 'gain' && { backgroundColor: colors.blue[100] }
              ]}
            >
              <Text 
                style={[
                  styles.segmentText, 
                  { color: profile.weightGoal === 'gain' ? colors.secondary : colors.neutral[500] }
                ]}
              >
                Gain
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.goalItem}>
          <Text style={[styles.goalLabel, { color: colors.text }]}>Activity Level</Text>
          <View style={styles.segmentedControl}>
            <TouchableOpacity 
              style={[
                styles.segment, 
                profile.activityLevel === 'sedentary' && { backgroundColor: colors.neutral[200] }
              ]}
            >
              <Text 
                style={[
                  styles.segmentText, 
                  { color: profile.activityLevel === 'sedentary' ? colors.neutral[700] : colors.neutral[500] }
                ]}
              >
                Low
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.segment, 
                profile.activityLevel === 'moderate' && { backgroundColor: colors.green[100] }
              ]}
            >
              <Text 
                style={[
                  styles.segmentText, 
                  { color: profile.activityLevel === 'moderate' ? colors.tint : colors.neutral[500] }
                ]}
              >
                Moderate
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.segment, 
                profile.activityLevel === 'active' && { backgroundColor: colors.blue[100] }
              ]}
            >
              <Text 
                style={[
                  styles.segmentText, 
                  { color: profile.activityLevel === 'active' ? colors.secondary : colors.neutral[500] }
                ]}
              >
                Active
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </>
  );
  
  const renderMedicalSection = () => (
    <>
      <Card style={styles.medicalCard}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Health Conditions</Text>
        <View style={styles.chipContainer}>
          {profile.healthConditions.map((condition, index) => (
            <View 
              key={index} 
              style={[styles.chip, { backgroundColor: colors.blue[100] }]}
            >
              <Text style={[styles.chipText, { color: colors.secondary }]}>{condition}</Text>
            </View>
          ))}
          <TouchableOpacity 
            style={[styles.addChip, { borderColor: colors.neutral[300] }]}
          >
            <Text style={{ color: colors.neutral[500] }}>+ Add</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.healthMetricsContainer}>
          <Text style={[styles.subsectionTitle, { color: colors.text }]}>Recent Health Metrics</Text>
          
          <View style={styles.metricItem}>
            <View style={styles.metricHeader}>
              <View style={styles.metricIconContainer}>
                <Heart size={16} color={colors.error} />
              </View>
              <Text style={[styles.metricName, { color: colors.text }]}>Blood Pressure</Text>
            </View>
            <Text style={[styles.metricValue, { color: colors.text }]}>128/85 mmHg</Text>
            <Text style={[styles.metricDate, { color: colors.neutral[500] }]}>Updated 3 days ago</Text>
          </View>
          
          <View style={styles.metricItem}>
            <View style={styles.metricHeader}>
              <View style={[styles.metricIconContainer, { backgroundColor: colors.blue[100] }]}>
                <Activity size={16} color={colors.blue[600]} />
              </View>
              <Text style={[styles.metricName, { color: colors.text }]}>Blood Glucose</Text>
            </View>
            <Text style={[styles.metricValue, { color: colors.text }]}>115 mg/dL</Text>
            <Text style={[styles.metricDate, { color: colors.neutral[500] }]}>Updated 1 week ago</Text>
          </View>
          
          <View style={styles.metricItem}>
            <View style={styles.metricHeader}>
              <View style={[styles.metricIconContainer, { backgroundColor: colors.green[100] }]}>
                <Weight size={16} color={colors.green[600]} />
              </View>
              <Text style={[styles.metricName, { color: colors.text }]}>Cholesterol</Text>
            </View>
            <Text style={[styles.metricValue, { color: colors.text }]}>Total: 185 mg/dL</Text>
            <Text style={[styles.metricDate, { color: colors.neutral[500] }]}>Updated 2 weeks ago</Text>
          </View>
        </View>
      </Card>
      
      <Card style={styles.medicalCard}>
        <View style={styles.medicationHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Medications</Text>
          <TouchableOpacity>
            <Text style={{ color: colors.secondary }}>Add New</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.medicationItem}>
          <Text style={[styles.medicationName, { color: colors.text }]}>Metformin</Text>
          <Text style={[styles.medicationDosage, { color: colors.neutral[600] }]}>500mg, twice daily</Text>
          <Text style={[styles.medicationInfo, { color: colors.neutral[500] }]}>For blood sugar management</Text>
        </View>
        
        <View style={[styles.medicationItem, { borderBottomWidth: 0 }]}>
          <Text style={[styles.medicationName, { color: colors.text }]}>Lisinopril</Text>
          <Text style={[styles.medicationDosage, { color: colors.neutral[600] }]}>10mg, once daily</Text>
          <Text style={[styles.medicationInfo, { color: colors.neutral[500] }]}>For blood pressure</Text>
        </View>
      </Card>
      
      <Card style={styles.medicalCard}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Medical Records</Text>
        
        <TouchableOpacity style={styles.documentItem}>
          <FileText size={20} color={colors.secondary} />
          <View style={styles.documentInfo}>
            <Text style={[styles.documentName, { color: colors.text }]}>Lab Results</Text>
            <Text style={[styles.documentDate, { color: colors.neutral[500] }]}>April 15, 2024</Text>
          </View>
          <ChevronRight size={20} color={colors.neutral[400]} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.documentItem}>
          <FileText size={20} color={colors.secondary} />
          <View style={styles.documentInfo}>
            <Text style={[styles.documentName, { color: colors.text }]}>Physical Exam</Text>
            <Text style={[styles.documentDate, { color: colors.neutral[500] }]}>January 20, 2024</Text>
          </View>
          <ChevronRight size={20} color={colors.neutral[400]} />
        </TouchableOpacity>
        
        <Button
          title="Upload Medical Report"
          onPress={() => {}}
          variant="outline"
          style={styles.uploadButton}
        />
      </Card>
    </>
  );
  
  const renderSettingsSection = () => (
    <>
      <Card style={styles.settingsCard}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Notifications</Text>
        
        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>Meal Reminders</Text>
          <Switch
            value={notificationSettings.mealReminders}
            onValueChange={(value) => 
              setNotificationSettings({...notificationSettings, mealReminders: value})
            }
            trackColor={{ false: colors.neutral[300], true: colors.tint }}
            thumbColor="white"
          />
        </View>
        
        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>Weekly Reports</Text>
          <Switch
            value={notificationSettings.weeklyReports}
            onValueChange={(value) => 
              setNotificationSettings({...notificationSettings, weeklyReports: value})
            }
            trackColor={{ false: colors.neutral[300], true: colors.tint }}
            thumbColor="white"
          />
        </View>
        
        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>Recommendations</Text>
          <Switch
            value={notificationSettings.recommendations}
            onValueChange={(value) => 
              setNotificationSettings({...notificationSettings, recommendations: value})
            }
            trackColor={{ false: colors.neutral[300], true: colors.tint }}
            thumbColor="white"
          />
        </View>
        
        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>Goal Progress</Text>
          <Switch
            value={notificationSettings.goalProgress}
            onValueChange={(value) => 
              setNotificationSettings({...notificationSettings, goalProgress: value})
            }
            trackColor={{ false: colors.neutral[300], true: colors.tint }}
            thumbColor="white"
          />
        </View>
      </Card>
      
      <Card style={styles.settingsCard}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
        
        <TouchableOpacity style={styles.settingLink}>
          <View style={styles.settingLinkContent}>
            <Lock size={20} color={colors.neutral[500]} />
            <Text style={[styles.settingLinkText, { color: colors.text }]}>Privacy Settings</Text>
          </View>
          <ChevronRight size={20} color={colors.neutral[400]} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingLink}>
          <View style={styles.settingLinkContent}>
            <Bell size={20} color={colors.neutral[500]} />
            <Text style={[styles.settingLinkText, { color: colors.text }]}>Notification Preferences</Text>
          </View>
          <ChevronRight size={20} color={colors.neutral[400]} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingLink}>
          <View style={styles.settingLinkContent}>
            <Settings size={20} color={colors.neutral[500]} />
            <Text style={[styles.settingLinkText, { color: colors.text }]}>App Settings</Text>
          </View>
          <ChevronRight size={20} color={colors.neutral[400]} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingLink}>
          <View style={styles.settingLinkContent}>
            <HelpCircle size={20} color={colors.neutral[500]} />
            <Text style={[styles.settingLinkText, { color: colors.text }]}>Help & Support</Text>
          </View>
          <ChevronRight size={20} color={colors.neutral[400]} />
        </TouchableOpacity>
      </Card>
      
      <TouchableOpacity style={[styles.logoutButton, { borderColor: colors.error }]}>
        <LogOut size={20} color={colors.error} />
        <Text style={[styles.logoutText, { color: colors.error }]}>Log Out</Text>
      </TouchableOpacity>
      
      <Text style={[styles.versionText, { color: colors.neutral[400] }]}>
        Version 1.0.0
      </Text>
    </>
  );
  
  return (
    <View style={styles.container}>
      {/* Section Navigation */}
      <View style={[styles.sectionNav, { backgroundColor: colors.card }]}>
        <TouchableOpacity
          style={[
            styles.sectionNavButton,
            activeSection === 'profile' && styles.activeSectionNavButton,
            activeSection === 'profile' && { borderBottomColor: colors.tint }
          ]}
          onPress={() => setActiveSection('profile')}
        >
          <Text
            style={[
              styles.sectionNavText,
              { color: activeSection === 'profile' ? colors.tint : colors.neutral[500] }
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.sectionNavButton,
            activeSection === 'medical' && styles.activeSectionNavButton,
            activeSection === 'medical' && { borderBottomColor: colors.tint }
          ]}
          onPress={() => setActiveSection('medical')}
        >
          <Text
            style={[
              styles.sectionNavText,
              { color: activeSection === 'medical' ? colors.tint : colors.neutral[500] }
            ]}
          >
            Medical
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.sectionNavButton,
            activeSection === 'settings' && styles.activeSectionNavButton,
            activeSection === 'settings' && { borderBottomColor: colors.tint }
          ]}
          onPress={() => setActiveSection('settings')}
        >
          <Text
            style={[
              styles.sectionNavText,
              { color: activeSection === 'settings' ? colors.tint : colors.neutral[500] }
            ]}
          >
            Settings
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {activeSection === 'profile' && renderProfileSection()}
        {activeSection === 'medical' && renderMedicalSection()}
        {activeSection === 'settings' && renderSettingsSection()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  sectionNav: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sectionNavButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeSectionNavButton: {
    borderBottomWidth: 2,
  },
  sectionNavText: {
    fontSize: 16,
    fontWeight: '500',
  },
  scrollContent: {
    padding: 16,
  },
  profileCard: {
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileAvatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
  },
  editProfileButton: {
    alignItems: 'flex-end',
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '500',
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 14,
  },
  preferencesCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  addChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  goalsCard: {
    marginBottom: 16,
  },
  goalItem: {
    marginBottom: 16,
  },
  goalLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  goalValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: 100,
  },
  goalUnit: {
    marginLeft: 8,
    fontSize: 16,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '500',
  },
  medicalCard: {
    marginBottom: 16,
  },
  healthMetricsContainer: {
    marginTop: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  metricItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metricIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  metricName: {
    fontSize: 16,
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
    marginLeft: 32,
  },
  metricDate: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 32,
  },
  medicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  medicationItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 14,
    marginBottom: 4,
  },
  medicationInfo: {
    fontSize: 12,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  documentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '500',
  },
  documentDate: {
    fontSize: 12,
  },
  uploadButton: {
    marginTop: 8,
  },
  settingsCard: {
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  settingLabel: {
    fontSize: 16,
  },
  settingLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  settingLinkContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLinkText: {
    marginLeft: 12,
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginVertical: 24,
    borderWidth: 1,
    borderRadius: 8,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  versionText: {
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 12,
  },
});