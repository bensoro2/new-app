import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES, PRIORITIES } from '../constants/categories';

export default function TaskItem({ task, onToggle, onDelete, onEdit, theme }) {
  const category = CATEGORIES.find((c) => c.id === task.category);
  const priority = PRIORITIES.find((p) => p.id === task.priority);

  // Format due date
  const formatDueDate = () => {
    if (!task.dueDate) return null;
    const date = new Date(task.dueDate);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { text: 'เลยกำหนด', color: theme.error };
    if (diffDays === 0) return { text: 'วันนี้', color: theme.warning };
    if (diffDays === 1) return { text: 'พรุ่งนี้', color: theme.primary };
    return { text: `${diffDays} วัน`, color: theme.textSecondary };
  };

  const dueDateInfo = formatDueDate();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.cardBackground }]}
      onLongPress={onEdit}
      activeOpacity={0.7}
    >
      {/* Left: Checkbox */}
      <TouchableOpacity style={styles.checkbox} onPress={onToggle}>
        {task.completed ? (
          <Ionicons name="checkmark-circle" size={28} color={theme.success} />
        ) : (
          <Ionicons
            name="ellipse-outline"
            size={28}
            color={theme.textMuted}
          />
        )}
      </TouchableOpacity>

      {/* Middle: Task Info */}
      <View style={styles.content}>
        <Text
          style={[
            styles.taskText,
            { color: theme.text },
            task.completed && styles.taskTextCompleted,
          ]}
          numberOfLines={2}
        >
          {task.text}
        </Text>

        {/* Tags */}
        <View style={styles.tags}>
          {/* Category */}
          {category && (
            <View style={[styles.tag, { backgroundColor: category.color }]}>
              <Ionicons
                name={category.icon}
                size={12}
                color="#fff"
                style={styles.tagIcon}
              />
              <Text style={styles.tagText}>{category.name}</Text>
            </View>
          )}

          {/* Priority */}
          {priority && (
            <View style={[styles.tag, { backgroundColor: priority.color }]}>
              <Ionicons
                name={priority.icon}
                size={12}
                color="#fff"
                style={styles.tagIcon}
              />
              <Text style={styles.tagText}>{priority.name}</Text>
            </View>
          )}

          {/* Due Date */}
          {dueDateInfo && (
            <View
              style={[
                styles.tag,
                { backgroundColor: dueDateInfo.color + '20' },
              ]}
            >
              <Ionicons
                name="calendar-outline"
                size={12}
                color={dueDateInfo.color}
                style={styles.tagIcon}
              />
              <Text style={[styles.tagText, { color: dueDateInfo.color }]}>
                {dueDateInfo.text}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Right: Edit & Delete Buttons */}
      <TouchableOpacity style={styles.editButton} onPress={onEdit}>
        <Ionicons name="create-outline" size={22} color={theme.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Ionicons name="trash-outline" size={22} color={theme.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  checkbox: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    marginBottom: 8,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagIcon: {
    marginRight: 4,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  editButton: {
    padding: 5,
    marginLeft: 8,
  },
  deleteButton: {
    padding: 5,
    marginLeft: 4,
  },
});
