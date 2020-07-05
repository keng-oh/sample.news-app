import React from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { AddClipAction, DeleteClipAction } from '../../store/actions/user';
import ClipButton from './components/ClipButton';
import Loading from './components/Loading';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import { RouteProp } from '@react-navigation/native';
import { State } from '../../types/state';
import { User } from '../../types/user';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Article'>;
  route: RouteProp<RootStackParamList, 'Article'>;
};

export default ({ navigation, route }: Props) => {
  const { article } = route.params;
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.user) as User;
  const { clips } = user;
  const isClipped = () => {
    return clips.some((clip) => clip.url === article.url);
  };
  const toggleClip = () => {
    if (isClipped()) {
      dispatch(DeleteClipAction({ clip: article }));
    } else {
      dispatch(AddClipAction({ clip: article }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ClipButton onPress={toggleClip} enabled={isClipped()} />
      <WebView
        source={{ uri: article.url }}
        startInLoadingState={true}
        renderLoading={() => <Loading />}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
