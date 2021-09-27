import CustomActivityIndicator from 'src/Components/CustomActivityIndicator';
import getInitialLetters from 'src/Helpers/getInitialLetters';
import MyButton from 'src/Components/Button';
import React, {useEffect, useState} from 'react';
import TopNavigationBar from 'src/Components/TopNavigationBar';
import {Avatar, Text, View} from 'react-native-ui-lib';
import {FlatList, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {GamerAppReduxStore} from 'src/Store';
import {loadTags} from 'src/Store/Ducks/tagsDuck';
import {newPost} from 'src/Store/Ducks/postDuck';
import {TagModel} from 'src/Models/Tag';
import {useDispatch, useSelector} from 'react-redux';

const AddTags: React.FC = () => {
  const dispatch = useDispatch();
  const {post, tags: tagsRedux, user} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {loading, newPostImage, newPostKeywords, title} = post;
  const {tags} = tagsRedux;
  const {firstName, gamerId, imageUrl: userImageUrl, lastName} = user.user;

  const fullName = `${firstName} ${lastName}`;

  const [newPostTags, setNewPostTags] = useState(post.newPostTags);

  function keyExtractor(item: TagModel, index: number): string {
    return `${item.id} - ${index}`;
  }

  function renderItem({item}: {item: TagModel}) {
    const {imageUrl, name} = item;

    function onPress() {
      setNewPostTags([item]);
    }

    const isSelected = newPostTags.findIndex(tag => tag.id === item.id) > -1;

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.tagContainer, isSelected && styles.tagSelected]}>
        <View centerV row>
          {imageUrl && (
            <View marginR-10>
              <Avatar
                backgroundColor="#eeecec"
                imageProps={{resizeMode: 'contain', source: {uri: imageUrl}}}
                imageSource={{uri: imageUrl}}
                size={40}
              />
            </View>
          )}

          <Text dark20 text70>
            {name}
          </Text>
        </View>

        {isSelected ? (
          <View style={styles.circleSelected}>
            <View style={styles.circleSelectedInner} />
          </View>
        ) : (
          <View style={styles.circle} />
        )}
      </TouchableOpacity>
    );
  }

  function onNext() {
    dispatch(
      newPost({
        contentUrl: '',
        gamerId,
        imageBase64: newPostImage,
        keyWords: newPostKeywords,
        postTypeEnum: 1,
        tagIds: newPostTags.map(tag => tag.id),
        title,
        type: 1,
      }),
    );
  }

  const header = (
    <View centerV marginB-20 paddingH-20 row spread>
      <View centerV paddingV-15 row>
        <Avatar
          backgroundColor="#f3f2f2"
          imageSource={
            userImageUrl
              ? {uri: userImageUrl}
              : require('../../../../Assets/images/home/profile.png')
          }
          label={getInitialLetters(fullName)}
        />

        <Text dark20 marginL-10 text70>
          {fullName}
        </Text>
      </View>

      <MyButton
        disabled={newPostTags.length === 0}
        label="Postar"
        onPress={onNext}
        size="medium"
      />
    </View>
  );

  useEffect(() => {
    dispatch(loadTags({}));
  }, [dispatch]);

  return (
    <ScrollView style={styles.scrollView}>
      <TopNavigationBar title="Escolha a categoria" />

      <View marginB-40>
        <FlatList
          ListHeaderComponent={header}
          data={tags}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />

        <CustomActivityIndicator isVisible={loading} />
      </View>
    </ScrollView>
  );
};

const circleSize = 24;
const circleInnerSize = 24 - 10;

const styles = StyleSheet.create({
  circle: {
    height: circleSize,
    width: circleSize,
    borderWidth: 2,
    borderColor: '#707070',
    borderRadius: circleSize / 2,
  },
  circleSelected: {
    alignItems: 'center',
    justifyContent: 'center',
    height: circleSize,
    width: circleSize,
    borderWidth: 2,
    borderColor: '#1563ce',
    borderRadius: circleSize / 2,
  },
  circleSelectedInner: {
    height: circleInnerSize,
    width: circleInnerSize,
    borderRadius: circleInnerSize / 2,
    backgroundColor: '#1563ce',
  },
  scrollView: {
    backgroundColor: '#ffffff',
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderColor: '#efefef',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  tagSelected: {
    backgroundColor: '#eef7ff',
  },
});

export default AddTags;
