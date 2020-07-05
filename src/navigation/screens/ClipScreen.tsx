import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, SafeAreaView, Platform, FlatList } from 'react-native';
import ListItem from './components/ListItem';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import { RouteProp } from '@react-navigation/native';
import { State } from '../../types/state';
import { User } from '../../types/user';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Clip'>;
  route: RouteProp<RootStackParamList, 'Clip'>;
};

export default ({ navigation, route }: Props) => {
  const user = useSelector((state: State) => state.user) as User;
  const { clips } = user;
  return (
    <SafeAreaView style={[styles.container, styles.AndroidSafeArea]}>
      <FlatList
        data={clips}
        renderItem={({ item }) => (
          <ListItem
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
            onPress={() => navigation.navigate('Article', { article: item })}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
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
