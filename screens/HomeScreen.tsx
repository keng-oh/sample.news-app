import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Platform,
} from 'react-native';

import axios from 'axios';
import Constants from 'expo-constants';

import ListItem from '../components/ListItem';
import Loading from '../components/Loading';

const URL: string = `http://newsapi.org/v2/top-headlines?country=jp&apiKey=${Constants.manifest.extra.newsApiKey}`;

export default ({ navigation }: { navigation: any }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(URL);
      setArticles(response.data.articles);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={[styles.container, styles.AndroidSafeArea]}>
      <FlatList
        data={articles}
        renderItem={({ item }: { item: any }) => (
          <ListItem
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
            onPress={() => navigation.navigate('Article', { article: item })}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {loading && <Loading />}
    </SafeAreaView>
  );
};

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
