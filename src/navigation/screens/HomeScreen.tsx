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

import ListItem from './components/ListItem';
import Loading from './components/Loading';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { Article } from '../../types/article';

const URL: string = `http://newsapi.org/v2/top-headlines?country=jp&apiKey=${Constants.manifest.extra.newsApiKey}`;

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  route: RouteProp<RootStackParamList, 'Home'>;
};

export default ({ navigation, route }: Props) => {
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
        renderItem={({ item }: { item: Article }) => (
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
