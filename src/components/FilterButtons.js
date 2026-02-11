import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FILTERS } from '../constants/categories';

export default function FilterButtons({ selectedFilter, onFilterChange, theme }) {
  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      {FILTERS.map((filter) => (
        <TouchableOpacity
          key={filter.id}
          style={[
            styles.button,
            { backgroundColor: theme.inputBackground },
            selectedFilter === filter.id && {
              backgroundColor: theme.primary,
            },
          ]}
          onPress={() => onFilterChange(filter.id)}
        >
          <Text
            style={[
              styles.buttonText,
              { color: theme.textSecondary },
              selectedFilter === filter.id && {
                color: theme.textOnPrimary,
              },
            ]}
          >
            {filter.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
