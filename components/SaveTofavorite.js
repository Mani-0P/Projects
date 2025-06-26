import React from 'react';
import { Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SaveTofavorite = ({ translation }) => {
  const handleSave = async () => {
    if (!translation?.input || !translation?.output) return;

    const oldFavorites = await AsyncStorage.getItem('favorites');
    const favorites = oldFavorites ? JSON.parse(oldFavorites) : [];

    favorites.push({ ...translation, id: Date.now() });
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Saved to favorites!');
  };
  return <Button title="💛 Save to Favorites" onPress={handleSave} />;
};

export default SaveTofavorite;
