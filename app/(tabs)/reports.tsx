import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import Colors from '@/constants/Colors';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { FileText, Upload, ChevronRight, CircleAlert as AlertCircle } from 'lucide-react-native';

export default function ReportsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const [reports, setReports] = useState([
    {
      id: '1',
      name: 'Blood Work Analysis',
      date: '2024-03-15',
      type: 'Laboratory',
      size: '2.4 MB',
      key_findings: [
        'Vitamin D deficiency',
        'Slightly elevated cholesterol',
        'Normal blood sugar levels'
      ]
    },
    {
      id: '2',
      name: 'Annual Physical Report',
      date: '2024-02-20',
      type: 'Medical Examination',
      size: '1.8 MB',
      key_findings: [
        'Blood pressure: 120/80',
        'BMI: 24.5',
        'Good overall health'
      ]
    }
  ]);

  const handleUploadReport = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true
      });

      if (result.assets && result.assets[0]) {
        const newReport = {
          id: Date.now().toString(),
          name: result.assets[0].name,
          date: new Date().toISOString().split('T')[0],
          type: 'Uploaded Document',
          size: `${(result.assets[0].size / (1024 * 1024)).toFixed(1)} MB`,
          key_findings: ['Processing...']
        };

        setReports([newReport, ...reports]);
        // Here you would typically upload the file to your backend
        // and process it with Gemini for analysis
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Medical Reports</Text>
        <Button
          title="Upload Report"
          onPress={handleUploadReport}
          leftIcon={<Upload size={20} color="white" />}
          style={styles.uploadButton}
        />
      </View>

      <Card style={styles.infoCard}>
        <View style={styles.infoHeader}>
          <AlertCircle size={20} color={colors.secondary} />
          <Text style={[styles.infoTitle, { color: colors.text }]}>Why Upload Reports?</Text>
        </View>
        <Text style={[styles.infoText, { color: colors.neutral[600] }]}>
          Your medical reports help us provide more accurate dietary recommendations and meal plans
          tailored to your specific health needs.
        </Text>
      </Card>

      {reports.map((report) => (
        <Card key={report.id} style={styles.reportCard}>
          <View style={styles.reportHeader}>
            <FileText size={24} color={colors.secondary} />
            <View style={styles.reportInfo}>
              <Text style={[styles.reportName, { color: colors.text }]}>{report.name}</Text>
              <Text style={[styles.reportMeta, { color: colors.neutral[500] }]}>
                {report.date} • {report.type} • {report.size}
              </Text>
            </View>
            <ChevronRight size={20} color={colors.neutral[400]} />
          </View>

          <View style={styles.findingsContainer}>
            <Text style={[styles.findingsTitle, { color: colors.text }]}>Key Findings</Text>
            {report.key_findings.map((finding, index) => (
              <View key={index} style={styles.findingItem}>
                <View style={[styles.bullet, { backgroundColor: colors.secondary }]} />
                <Text style={[styles.findingText, { color: colors.neutral[700] }]}>{finding}</Text>
              </View>
            ))}
          </View>
        </Card>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  uploadButton: {
    minWidth: 140,
  },
  infoCard: {
    marginBottom: 16,
    backgroundColor: '#F0F9FF',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 28,
  },
  reportCard: {
    marginBottom: 16,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  reportInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  reportName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  reportMeta: {
    fontSize: 12,
  },
  findingsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  findingsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  findingItem: {
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
  findingText: {
    fontSize: 14,
    flex: 1,
  },
});