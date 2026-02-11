import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar({ value, onChangeText, onClear, theme }) {
  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      <Ionicons
        name="search"
        size={20}
        color={theme.textMuted}
        style={styles.icon}
      />
      <TextInput
        style={[
          styles.input,
          { color: theme.text, backgroundColor: theme.inputBackground },
        ]}
        placeholder="ค้นหางาน..."
        placeholderTextColor={theme.textMuted}
        value={value}
        onChangeText={onChangeText}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Ionicons name="close-circle" size={20} color={theme.textMuted} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 16,
  },
  clearButton: {
    marginLeft: 10,
  },
});
