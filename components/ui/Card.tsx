import React from 'react';
import { View, StyleSheet, useColorScheme, ViewStyle } from 'react-native';
import Colors from '@/constants/Colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevation?: 0 | 1 | 2 | 3;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

export default function Card({
  children,
  style,
  elevation = 1,
  padding = 'md',
  borderRadius = 'md',
}: CardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const getShadow = () => {
    if (colorScheme === 'dark') {
      // Less pronounced shadows in dark mode
      switch (elevation) {
        case 0:
          return {};
        case 1:
          return {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 1,
          };
        case 2:
          return {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,
          };
        case 3:
          return {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 3,
          };
        default:
          return {};
      }
    } else {
      // Light mode shadows
      switch (elevation) {
        case 0:
          return {};
        case 1:
          return {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 1,
          };
        case 2:
          return {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 3.84,
            elevation: 2,
          };
        case 3:
          return {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 4.65,
            elevation: 3,
          };
        default:
          return {};
      }
    }
  };

  const getPadding = () => {
    switch (padding) {
      case 'none': return 0;
      case 'sm': return 8;
      case 'md': return 16;
      case 'lg': return 24;
      default: return 16;
    }
  };

  const getBorderRadius = () => {
    switch (borderRadius) {
      case 'none': return 0;
      case 'sm': return 4;
      case 'md': return 8;
      case 'lg': return 16;
      case 'full': return 9999;
      default: return 8;
    }
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          padding: getPadding(),
          borderRadius: getBorderRadius(),
          borderColor: colors.border,
        },
        getShadow(),
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    marginVertical: 8,
  },
});