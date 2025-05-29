import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import Card from '@/components/ui/Card';
import Colors from '@/constants/Colors';
import { CircleAlert as AlertCircle } from 'lucide-react-native';

interface HealthMetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeLabel?: string;
  status?: 'normal' | 'warning' | 'critical';
  info?: string;
}

export default function HealthMetricCard({
  title,
  value,
  unit,
  change,
  changeLabel,
  status = 'normal',
  info,
}: HealthMetricCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const getStatusColor = () => {
    switch(status) {
      case 'warning':
        return colors.warning;
      case 'critical':
        return colors.error;
      default:
        return colors.success;
    }
  };

  const getChangeColor = () => {
    if (!change) return colors.neutral[500];
    return change > 0 ? colors.success : colors.error;
  };

  const changeSymbol = change && change > 0 ? '↑' : '↓';

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {info && (
          <AlertCircle size={16} color={colors.neutral[400]} />
        )}
      </View>
      
      <View style={styles.valueContainer}>
        <Text style={[styles.value, { color: colors.text }]}>
          {value}
          {unit && <Text style={styles.unit}> {unit}</Text>}
        </Text>
        
        {status !== 'normal' && (
          <View 
            style={[
              styles.statusIndicator, 
              { backgroundColor: getStatusColor() }
            ]}
          />
        )}
      </View>
      
      {(change !== undefined || changeLabel) && (
        <View style={styles.changeContainer}>
          {change !== undefined && (
            <Text style={[styles.change, { color: getChangeColor() }]}>
              {changeSymbol} {Math.abs(change)}%
            </Text>
          )}
          {changeLabel && (
            <Text style={[styles.changeLabel, { color: colors.neutral[500] }]}>
              {changeLabel}
            </Text>
          )}
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginHorizontal: 4,
    flex: 1,
    minWidth: 140,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
  },
  unit: {
    fontSize: 14,
    fontWeight: '400',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  change: {
    fontSize: 12,
    fontWeight: '500',
    marginRight: 4,
  },
  changeLabel: {
    fontSize: 12,
  },
});