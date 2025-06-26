import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import RefreshButton from '../components/RefreshButton';

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('translationHistory');
      const parsed = storedHistory ? JSON.parse(storedHistory) : [];
      const reversed = parsed.reverse();
      setHistory(reversed);
      setFilteredHistory(reversed);
    } catch (e) {
      console.error('Failed to load history:', e);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = history.filter((item) =>
      item.input.toLowerCase().includes(text.toLowerCase()) ||
      item.output.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredHistory(filtered);
  };

  const clearHistory = async () => {
    Alert.alert('Clear History', 'Are you sure you want to clear all history?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        onPress: async () => {
          await AsyncStorage.removeItem('translationHistory');
          setHistory([]);
          setFilteredHistory([]);
        },
        style: 'destructive',
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.input}>{item.input}</Text>
      <Text style={styles.output}>{item.output}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          placeholder="Search history..."
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
        <TouchableOpacity onPress={clearHistory}>
          <Ionicons name="trash" size={25} color="red" style={styles.trashIcon} />
        </TouchableOpacity>
      </View>

      <RefreshButton onRefresh={loadHistory} />

      {filteredHistory.length > 0 ? (
        <FlatList
          data={filteredHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noHistory}>No history found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 50 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 8,
    borderRadius: 6,
  },
  trashIcon: {
    marginLeft: 10,
  },
  item: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    marginVertical: 6,
    borderRadius: 6,
  },
  input: { fontWeight: 'bold' },
  output: { marginTop: 4, color: '#333' },
  noHistory: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
});

export default HistoryScreen;
