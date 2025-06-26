// components/CategoryModal.js
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CategoryModal = ({ visible, onClose, translation }) => {
  const [category, setCategory] = useState('');

  const handleSave = async () => {
    if (!translation || !category.trim()) return;

    const entry = { ...translation, category };
    const oldFavorites = await AsyncStorage.getItem('favorites');
    const favorites = oldFavorites ? JSON.parse(oldFavorites) : [];

    favorites.push(entry);
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));

    setCategory('');
    onClose();
    alert('Saved to category!');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text>Enter Category:</Text>
          <TextInput
            value={category}
            onChangeText={setCategory}
            placeholder="e.g., Travel"
            style={styles.input}
          />
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={onClose} color="gray" />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
  modal: { backgroundColor: 'white', padding: 20, borderRadius: 8, width: '80%' },
  input: { borderBottomWidth: 1, marginBottom: 10 },
});

export default CategoryModal;
