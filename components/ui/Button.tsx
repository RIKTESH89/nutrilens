import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator,
  View,
  useColorScheme,
  ViewStyle,
  TextStyle
} from 'react-native';
import Colors from '@/constants/Colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}: ButtonProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const getBackgroundColor = () => {
    if (disabled) return colors.neutral[300];
    
    switch (variant) {
      case 'primary':
        return colors.tint;
      case 'secondary':
        return colors.secondary;
      case 'outline':
      case 'ghost':
        return 'transparent';
      default:
        return colors.tint;
    }
  };
  
  const getBorderColor = () => {
    if (disabled) return colors.neutral[300];
    if (variant === 'outline') return variant === 'primary' ? colors.tint : colors.secondary;
    return 'transparent';
  };
  
  const getTextColor = () => {
    if (disabled) return colors.neutral[500];
    
    switch (variant) {
      case 'primary':
      case 'secondary':
        return colors.neutral[50];
      case 'outline':
        return variant === 'primary' ? colors.tint : colors.secondary;
      case 'ghost':
        return variant === 'primary' ? colors.tint : colors.secondary;
      default:
        return colors.neutral[50];
    }
  };

  const getPaddingVertical = () => {
    switch (size) {
      case 'sm': return 8;
      case 'md': return 12;
      case 'lg': return 16;
      default: return 12;
    }
  };

  const buttonStyles = {
    backgroundColor: getBackgroundColor(),
    borderColor: getBorderColor(),
    borderWidth: variant === 'outline' ? 1 : 0,
    paddingVertical: getPaddingVertical(),
    width: fullWidth ? '100%' : undefined,
  };

  const textColorStyle = { color: getTextColor() };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyles, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <Text style={[styles.text, textColorStyle, textStyle]}>{title}</Text>
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});