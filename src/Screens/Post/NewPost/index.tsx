import NewPostImage from './NewPostImage';
import React from 'react';
import TopNavigationBar from 'src/Components/TopNavigationBar';
import {GamerAppReduxStore} from 'src/Store';
import {MyColors} from 'src/Theme/FoundationConfig';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {useSelector} from 'react-redux';
import {getNewPostPoints} from 'src/Store/Ducks/postDuck';

const NewPost: React.FC = () => {
  const {post} = useSelector((state: GamerAppReduxStore) => state);

  const {newPostType} = post;

  const headerTitle = (
    <View row>
      <Text dark20 text70>
        Novo post
      </Text>

      <Text style={styles.points}>+{getNewPostPoints(newPostType)} pontos</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopNavigationBar title={headerTitle} />

      <View style={styles.container}>
        {newPostType === 'Image' && <NewPostImage />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    backgroundColor: '#ffffff',
  },
  points: {
    marginLeft: 5,
    color: MyColors.primary,
    fontSize: 12,
  },
  safeArea: {
    flex: 1,
  },
});

export default NewPost;
