// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';

import ListItem from './components/ListItem';

import articles from './dummy/articles.json';

export default function App() {
  return (
    <SafeAreaView style={[styles.container, styles.AndroidSafeArea]}>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <ListItem
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
