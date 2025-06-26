import React, { useState, useEffect } from 'react';
import {View,Text,FlatList,StyleSheet,TouchableOpacity,TextInput,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Menu } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import RefreshButton from '../components/RefreshButton';

const categoryOptions = ['All', 'Work', 'Study', 'Travel'];

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    filterFavorites();
  }, [searchQuery, categoryFilter, favorites]);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem('favorites');
      const parsed = stored ? JSON.parse(stored) : [];
      setFavorites(parsed.reverse());
    } catch (e) {
      console.error('Error loading favorites:', e);
    }
  };

  const filterFavorites = () => {
    let filtered = [...favorites];
    if (categoryFilter !== 'All') {
      filtered = filtered.filter((item) => item.category === categoryFilter);
    }
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (item) =>
          item.input.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.output.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredFavorites(filtered);
  };

  const removeFavorite = async (index) => {
    const updated = [...favorites];
    updated.splice(index, 1);
    await AsyncStorage.setItem('favorites', JSON.stringify(updated));
    setFavorites(updated);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <View style={{ flex: 1 }}>
        <Text style={styles.input}>{item.input}</Text>
        <Text style={styles.output}>{item.output}</Text>
        {item.category && (
          <Text style={styles.category}>Category: {item.category}</Text>
        )}
      </View>
      <TouchableOpacity onPress={() => removeFavorite(index)}>
        <Ionicons name="heart-dislike" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          placeholder="Search favorites..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <Text style={styles.dropdown}>{categoryFilter} ⌄</Text>
            </TouchableOpacity>
          }
        >
          {categoryOptions.map((cat) => (
            <Menu.Item
              key={cat}
              onPress={() => {
                setCategoryFilter(cat);
                setMenuVisible(false);
              }}
              title={cat}
            />
          ))}
        </Menu>
      </View>
    <RefreshButton onRefresh={loadFavorites} />
      {filteredFavorites.length > 0 ? (
        <FlatList
          data={filteredFavorites}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noItems}>No favorites found.</Text>
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
    marginRight: 10,
  },
  dropdown: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#aaa',
    backgroundColor: '#eee',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 12,
    marginVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  input: { fontWeight: 'bold', fontSize: 16 },
  output: { marginTop: 4, color: '#333' },
  category: { marginTop: 6, fontSize: 12, color: '#666' },
  noItems: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
});

export default FavoritesScreen;
