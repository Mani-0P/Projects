import React from 'react';
import { Text } from 'react-native';
import { Menu } from 'react-native-paper';

const Languageselecter = ({ label, visible, setVisible, selectedLang, setSelectedLang, languages }) => {
  return (
    <>
      <Text>{label}</Text>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Text
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 6,
              marginTop: 5,
              backgroundColor: '#f9f9f9',
            }}
            onPress={() => setVisible(true)}
          >
            {languages.find((l) => l.code === selectedLang)?.name || 'Select'}
          </Text>
        }
      >
        {languages.map((lang) => (
          <Menu.Item
            key={lang.code}
            onPress={() => {
              setSelectedLang(lang.code);
              setVisible(false);
            }}
            title={lang.name}
          />
        ))}
      </Menu>
    </>
  );
};

export default Languageselecter;
