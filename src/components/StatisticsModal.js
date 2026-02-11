import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES, PRIORITIES } from '../constants/categories';

export default function StatisticsModal({ visible, tasks, onClose, theme }) {
  // Calculate statistics
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const active = total - completed;
  const completionRate = total > 0 ? ((completed / total) * 100).toFixed(1) : 0;

  // By Category
  const byCategory = CATEGORIES.map((cat) => ({
    ...cat,
    count: tasks.filter((t) => t.category === cat.id).length,
  }));

  // By Priority
  const byPriority = PRIORITIES.map((pri) => ({
    ...pri,
    count: tasks.filter((t) => t.priority === pri.id).length,
  }));

  // Overdue tasks
  const overdue = tasks.filter((t) => {
    if (!t.dueDate || t.completed) return false;
    return new Date(t.dueDate) < new Date();
  }).length;

  // Due today
  const dueToday = tasks.filter((t) => {
    if (!t.dueDate || t.completed) return false;
    const today = new Date();
    const due = new Date(t.dueDate);
    return (
      due.getDate() === today.getDate() &&
      due.getMonth() === today.getMonth() &&
      due.getFullYear() === today.getFullYear()
    );
  }).length;

  const StatCard = ({ icon, label, value, color }) => (
    <View style={[styles.statCard, { backgroundColor: theme.inputBackground }]}>
      <Ionicons name={icon} size={32} color={color} />
      <Text style={[styles.statValue, { color: theme.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
        {label}
      </Text>
    </View>
  );

  const ProgressBar = ({ value, total, color }) => {
    const percentage = total > 0 ? (value / total) * 100 : 0;
    return (
      <View style={[styles.progressBar, { backgroundColor: theme.inputBackground }]}>
        <View
          style={[
            styles.progressFill,
            { width: `${percentage}%`, backgroundColor: color },
          ]}
        />
      </View>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>📊 สถิติ</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {/* Overview */}
            <View style={styles.statsRow}>
              <StatCard
                icon="checkbox-outline"
                label="ทั้งหมด"
                value={total}
                color={theme.primary}
              />
              <StatCard
                icon="checkmark-done"
                label="เสร็จแล้ว"
                value={completed}
                color={theme.success}
              />
              <StatCard
                icon="time-outline"
                label="ค้างอยู่"
                value={active}
                color={theme.warning}
              />
            </View>

            {/* Completion Rate */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                อัตราความสำเร็จ
              </Text>
              <View style={styles.completionRate}>
                <Text style={[styles.percentageText, { color: theme.success }]}>
                  {completionRate}%
                </Text>
                <ProgressBar
                  value={completed}
                  total={total}
                  color={theme.success}
                />
              </View>
            </View>

            {/* Deadlines */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                กำหนดส่ง
              </Text>
              <View style={styles.deadlineRow}>
                <View style={styles.deadlineItem}>
                  <Ionicons name="alert-circle" size={24} color={theme.error} />
                  <Text style={[styles.deadlineValue, { color: theme.text }]}>
                    {overdue}
                  </Text>
                  <Text style={[styles.deadlineLabel, { color: theme.textSecondary }]}>
                    เลยกำหนด
                  </Text>
                </View>
                <View style={styles.deadlineItem}>
                  <Ionicons name="today" size={24} color={theme.warning} />
                  <Text style={[styles.deadlineValue, { color: theme.text }]}>
                    {dueToday}
                  </Text>
                  <Text style={[styles.deadlineLabel, { color: theme.textSecondary }]}>
                    ครบวันนี้
                  </Text>
                </View>
              </View>
            </View>

            {/* By Category */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                ตามหมวดหมู่
              </Text>
              {byCategory.map((cat) => (
                <View key={cat.id} style={styles.categoryItem}>
                  <View style={styles.categoryInfo}>
                    <Ionicons name={cat.icon} size={20} color={cat.color} />
                    <Text style={[styles.categoryName, { color: theme.text }]}>
                      {cat.name}
                    </Text>
                  </View>
                  <Text style={[styles.categoryCount, { color: theme.textSecondary }]}>
                    {cat.count} งาน
                  </Text>
                </View>
              ))}
            </View>

            {/* By Priority */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                ตามความสำคัญ
              </Text>
              {byPriority.map((pri) => (
                <View key={pri.id} style={styles.categoryItem}>
                  <View style={styles.categoryInfo}>
                    <Ionicons name={pri.icon} size={20} color={pri.color} />
                    <Text style={[styles.categoryName, { color: theme.text }]}>
                      {pri.name}
                    </Text>
                  </View>
                  <Text style={[styles.categoryCount, { color: theme.textSecondary }]}>
                    {pri.count} งาน
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Close Button */}
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: theme.primary }]}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>ปิด</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  completionRate: {
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressBar: {
    width: '100%',
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
  deadlineRow: {
    flexDirection: 'row',
    gap: 15,
  },
  deadlineItem: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
  },
  deadlineValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 8,
  },
  deadlineLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryName: {
    fontSize: 16,
  },
  categoryCount: {
    fontSize: 14,
  },
  closeButton: {
    margin: 20,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
