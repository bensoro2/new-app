import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES, PRIORITIES } from '../constants/categories';

export default function AddTaskModal({ visible, onClose, onAdd, theme }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('personal');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAdd = () => {
    if (text.trim() === '') return;

    const newTask = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      category,
      priority,
      dueDate: dueDate ? dueDate.getTime() : null,
      createdAt: Date.now(),
    };

    onAdd(newTask);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setText('');
    setCategory('personal');
    setPriority('medium');
    setDueDate(null);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>
              เพิ่มงานใหม่
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {/* Task Input */}
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              ชื่องาน
            </Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.inputBackground, color: theme.text },
              ]}
              placeholder="ใส่ชื่องาน..."
              placeholderTextColor={theme.textMuted}
              value={text}
              onChangeText={setText}
              multiline
            />

            {/* Category */}
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              หมวดหมู่
            </Text>
            <View style={styles.optionsRow}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.option,
                    { backgroundColor: theme.inputBackground },
                    category === cat.id && {
                      backgroundColor: cat.color,
                    },
                  ]}
                  onPress={() => setCategory(cat.id)}
                >
                  <Ionicons
                    name={cat.icon}
                    size={20}
                    color={category === cat.id ? '#fff' : cat.color}
                  />
                  <Text
                    style={[
                      styles.optionText,
                      { color: theme.text },
                      category === cat.id && { color: '#fff' },
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Priority */}
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              ลำดับความสำคัญ
            </Text>
            <View style={styles.optionsRow}>
              {PRIORITIES.map((pri) => (
                <TouchableOpacity
                  key={pri.id}
                  style={[
                    styles.option,
                    { backgroundColor: theme.inputBackground },
                    priority === pri.id && {
                      backgroundColor: pri.color,
                    },
                  ]}
                  onPress={() => setPriority(pri.id)}
                >
                  <Ionicons
                    name={pri.icon}
                    size={20}
                    color={priority === pri.id ? '#fff' : pri.color}
                  />
                  <Text
                    style={[
                      styles.optionText,
                      { color: theme.text },
                      priority === pri.id && { color: '#fff' },
                    ]}
                  >
                    {pri.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Due Date */}
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              วันครบกำหนด (ถ้ามี)
            </Text>
            <TouchableOpacity
              style={[
                styles.dateButton,
                { backgroundColor: theme.inputBackground },
              ]}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons
                name="calendar"
                size={20}
                color={theme.primary}
                style={styles.dateIcon}
              />
              <Text style={[styles.dateText, { color: theme.text }]}>
                {dueDate
                  ? `${dueDate.getDate()}/${dueDate.getMonth() + 1}/${dueDate.getFullYear()}`
                  : 'เลือกวันที่'}
              </Text>
              {dueDate && (
                <TouchableOpacity
                  onPress={() => setDueDate(null)}
                  style={styles.clearDate}
                >
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={theme.textMuted}
                  />
                </TouchableOpacity>
              )}
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={dueDate || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
                minimumDate={new Date()}
              />
            )}
          </ScrollView>

          {/* Buttons */}
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.cancelButton,
                { backgroundColor: theme.inputBackground },
              ]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, { color: theme.text }]}>
                ยกเลิก
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.addButton,
                { backgroundColor: theme.primary },
              ]}
              onPress={handleAdd}
            >
              <Text style={[styles.buttonText, { color: '#fff' }]}>
                เพิ่มงาน
              </Text>
            </TouchableOpacity>
          </View>
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
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
  },
  input: {
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    minHeight: 50,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
  },
  dateIcon: {
    marginRight: 10,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
  },
  clearDate: {
    padding: 5,
  },
  buttons: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {},
  addButton: {},
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
