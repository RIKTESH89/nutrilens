import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import Card from './ui/Card';
import Colors from '@/constants/Colors';
import { Brain, TrendingUp, AlertTriangle } from 'lucide-react-native';

interface AIInsight {
  type: 'observation' | 'recommendation' | 'warning';
  content: string;
}

interface AIInsightsCardProps {
  insights: AIInsight[];
  title?: string;
}

export default function AIInsightsCard({ insights, title = 'AI Health Insights' }: AIInsightsCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'observation':
        return <Brain size={20} color={colors.secondary} />;
      case 'recommendation':
        return <TrendingUp size={20} color={colors.success} />;
      case 'warning':
        return <AlertTriangle size={20} color={colors.warning} />;
    }
  };

  const getInsightColor = (type: AIInsight['type']) => {
    switch (type) {
      case 'observation':
        return colors.secondary;
      case 'recommendation':
        return colors.success;
      case 'warning':
        return colors.warning;
    }
  };

  return (
    <Card style={styles.card}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      
      {insights.map((insight, index) => (
        <View key={index} style={styles.insightContainer}>
          <View style={[styles.iconContainer, { backgroundColor: getInsightColor(insight.type) + '20' }]}>
            {getInsightIcon(insight.type)}
          </View>
          <Text style={[styles.insightText, { color: colors.neutral[700] }]}>
            {insight.content}
          </Text>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  insightContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    paddingTop: 4,
  },
});