import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Provider } from 'react-native-paper';

import Languageselecter from '../components/Languageselecter';
import TextsInput from '../components/TextsInput';
import TextOutput from '../components/TextOutput';
import SaveTofavorite from '../components/SaveTofavorite';
import CategoryModal from '../components/CategoryModal';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'hi', name: 'Hindi' },
  { code: 'de', name: 'German' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ur', name: 'Urdu' },
];

const HomeScreen = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('es');
  const [loading, setLoading] = useState(false);

  const [fromMenuVisible, setFromMenuVisible] = useState(false);
  const [toMenuVisible, setToMenuVisible] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const translateText = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get('https://api.mymemory.translated.net/get', {
        params: {
          q: inputText,
          langpair: `${fromLang}|${toLang}`,
        },
      });

      const translated = response.data.responseData.translatedText;
      setTranslatedText(translated);

      const newEntry = {
        input: inputText,
        output: translated,
        from: fromLang,
        to: toLang,
        timestamp: Date.now(),
      };

      const oldHistory = await AsyncStorage.getItem('translationHistory');
      const history = oldHistory ? JSON.parse(oldHistory) : [];
      history.push(newEntry);
      await AsyncStorage.setItem('translationHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Translation error:', error.message);
      setTranslatedText('Translation failed');
    }
    setLoading(false);
  };

  const translationObj = {
    input: inputText,
    output: translatedText,
    from: fromLang,
    to: toLang,
    timestamp: Date.now(),
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title}>Language Translator</Text>

        <Languageselecter
          label="From:"
          selectedLang={fromLang}
          visible={fromMenuVisible}
          setVisible={setFromMenuVisible}
          setSelectedLang={setFromLang}
          languages={languages}
        />

        <Languageselecter
          label="To:"
          selectedLang={toLang}
          visible={toMenuVisible}
          setVisible={setToMenuVisible}
          setSelectedLang={setToLang}
          languages={languages}
        />

        <TextsInput inputText={inputText} setInputText={setInputText} />

        <Button title="Translate" onPress={translateText} />

        <TextOutput loading={loading} translatedText={translatedText} />

        <SaveTofavorite translation={translationObj} />

        <Button title="Save to Category" onPress={() => setModalVisible(true)} />

        <CategoryModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          translation={translationObj}
        />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 45, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
});
export default HomeScreen;
