import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Utils & Theme
import { loadTasks, saveTasks, loadTheme, saveTheme } from './src/utils/storage';
import { getTheme } from './src/theme/colors';

// Components
import SearchBar from './src/components/SearchBar';
import FilterButtons from './src/components/FilterButtons';
import TaskItem from './src/components/TaskItem';
import AddTaskModal from './src/components/AddTaskModal';
import EditTaskModal from './src/components/EditTaskModal';
import StatisticsModal from './src/components/StatisticsModal';

export default function App() {
  // === STATE ===
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Theme
  const theme = getTheme(isDarkMode);

  // === LOAD DATA ===
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [savedTasks, savedTheme] = await Promise.all([
      loadTasks(),
      loadTheme(),
    ]);
    setTasks(savedTasks);
    setIsDarkMode(savedTheme);
  };

  // === SAVE TASKS ===
  useEffect(() => {
    if (tasks.length > 0) {
      saveTasks(tasks);
    }
  }, [tasks]);

  // === TOGGLE DARK MODE ===
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    saveTheme(newMode);
  };

  // === TASK FUNCTIONS ===

  const addTask = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  const deleteTask = (id) => {
    Alert.alert('ยืนยันการลบ', 'คุณต้องการลบงานนี้หรือไม่?', [
      { text: 'ยกเลิก', style: 'cancel' },
      {
        text: 'ลบ',
        style: 'destructive',
        onPress: () => {
          setTasks(tasks.filter((task) => task.id !== id));
        },
      },
    ]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (task) => {
    setEditingTask(task);
    setShowEditModal(true);
  };

  const saveEditedTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const clearCompleted = () => {
    const completedCount = tasks.filter((task) => task.completed).length;
    if (completedCount === 0) {
      Alert.alert('แจ้งเตือน', 'ไม่มีงานที่ทำเสร็จแล้ว');
      return;
    }

    Alert.alert(
      'ยืนยันการลบ',
      `คุณต้องการลบงานที่ทำเสร็จแล้วทั้งหมด (${completedCount} งาน) หรือไม่?`,
      [
        { text: 'ยกเลิก', style: 'cancel' },
        {
          text: 'ลบ',
          style: 'destructive',
          onPress: () => {
            setTasks(tasks.filter((task) => !task.completed));
          },
        },
      ]
    );
  };

  // === FILTER & SEARCH ===

  const getFilteredTasks = () => {
    let filtered = tasks;

    // Filter by status
    if (filter === 'completed') {
      filtered = filtered.filter((task) => task.completed);
    } else if (filter === 'active') {
      filtered = filtered.filter((task) => !task.completed);
    }

    // Search
    if (searchText.trim() !== '') {
      filtered = filtered.filter((task) =>
        task.text.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Sort: incomplete first, then by priority (high -> low), then by due date
    filtered.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      const priorityOrder = { high: 0, medium: 1, low: 2 };
      const aPriority = priorityOrder[a.priority] ?? 1;
      const bPriority = priorityOrder[b.priority] ?? 1;

      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }

      if (a.dueDate && b.dueDate) {
        return a.dueDate - b.dueDate;
      }
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;

      return b.createdAt - a.createdAt;
    });

    return filtered;
  };

  // === STATS ===
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const activeTasks = totalTasks - completedTasks;

  const filteredTasks = getFilteredTasks();

  // === RENDER ===
  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />

      {/* HEADER */}
      <View style={[styles.header, { backgroundColor: theme.headerBackground }]}>
        <View style={styles.headerTop}>
          <Text style={[styles.headerTitle, { color: theme.textOnPrimary }]}>
            📝 To-Do List Pro
          </Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              onPress={() => setShowStatsModal(true)}
              style={styles.iconButton}
            >
              <Ionicons name="stats-chart" size={24} color={theme.textOnPrimary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleDarkMode} style={styles.iconButton}>
              <Ionicons
                name={isDarkMode ? 'sunny' : 'moon'}
                size={24}
                color={theme.textOnPrimary}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.stats}>
          <Text style={[styles.statsText, { color: theme.textOnPrimary }]}>
            ทั้งหมด: {totalTasks} | เสร็จ: {completedTasks} | เหลือ: {activeTasks}
          </Text>
        </View>
      </View>

      {/* SEARCH BAR */}
      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        onClear={() => setSearchText('')}
        theme={theme}
      />

      {/* FILTER BUTTONS */}
      <FilterButtons
        selectedFilter={filter}
        onFilterChange={setFilter}
        theme={theme}
      />

      {/* TASK LIST */}
      {filteredTasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={64} color={theme.textMuted} />
          <Text style={[styles.emptyText, { color: theme.textMuted }]}>
            {searchText
              ? 'ไม่พบงานที่ค้นหา'
              : filter === 'all'
              ? 'ยังไม่มีงาน\nเพิ่มงานใหม่ด้านล่างเลย!'
              : filter === 'active'
              ? 'ไม่มีงานที่ค้างอยู่\nเก่งมาก! 🎉'
              : 'ยังไม่มีงานที่ทำเสร็จ'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredTasks}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={() => toggleTask(item.id)}
              onDelete={() => deleteTask(item.id)}
              onEdit={() => editTask(item)}
              theme={theme}
            />
          )}
          keyExtractor={(item) => item.id}
          style={styles.taskList}
          contentContainerStyle={styles.taskListContent}
        />
      )}

      {/* CLEAR COMPLETED BUTTON */}
      {completedTasks > 0 && (
        <TouchableOpacity
          style={[styles.clearButton, { backgroundColor: theme.error }]}
          onPress={clearCompleted}
        >
          <Text style={styles.clearButtonText}>
            ล้างงานที่เสร็จแล้ว ({completedTasks})
          </Text>
        </TouchableOpacity>
      )}

      {/* ADD BUTTON */}
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.primary }]}
        onPress={() => setShowAddModal(true)}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      {/* MODALS */}
      <AddTaskModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addTask}
        theme={theme}
      />

      <EditTaskModal
        visible={showEditModal}
        task={editingTask}
        onClose={() => {
          setShowEditModal(false);
          setEditingTask(null);
        }}
        onSave={saveEditedTask}
        theme={theme}
      />

      <StatisticsModal
        visible={showStatsModal}
        tasks={tasks}
        onClose={() => setShowStatsModal(false)}
        theme={theme}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  iconButton: {
    padding: 5,
  },
  stats: {
    marginTop: 10,
  },
  statsText: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.9,
  },
  taskList: {
    flex: 1,
  },
  taskListContent: {
    padding: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  clearButton: {
    marginHorizontal: 15,
    marginBottom: 10,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
