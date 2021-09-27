import React, {useEffect} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {GamerAppReduxStore} from 'src/Store';
import {loadTags} from 'src/Store/Ducks/tagsDuck';
import {MyColors} from 'src/Theme/FoundationConfig';
import {selectIsTagSelected, setFeedData} from 'src/Store/Ducks/feedDuck';
import {TagModel} from 'src/Models/Tag';
import {Text, View} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';

const Tags: React.FC = () => {
  const dispatch = useDispatch();
  const {feed, tags: tagsRedux} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {tags} = tagsRedux;

  function keyExtractor(item: TagModel, index: number): string {
    return `${item.id} - ${index}`;
  }

  function renderItem({item}: {item: TagModel}) {
    const isSelected = selectIsTagSelected(feed, item);

    function onPress() {
      dispatch(
        setFeedData({
          selectedTags: isSelected ? [] : [item],
        }),
      );
    }

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.tagContainer, isSelected && styles.tagSelected]}>
        <Text dark20 style={[isSelected && styles.tagSelectedText]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  }

  useEffect(() => {
    dispatch(loadTags({}));
  }, [dispatch]);

  return (
    <View centerV paddingH-5 row spread style={styles.container}>
      <FlatList
        data={tags}
        keyExtractor={keyExtractor}
        horizontal
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDEDED',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  flatList: {
    paddingVertical: 15,
  },
  logo: {
    height: 22,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f3f2f2',
  },
  tagContainer: {
    marginHorizontal: 5,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: '#fafafa',
  },
  tagSelected: {
    backgroundColor: MyColors.primary,
  },
  tagSelectedText: {
    color: '#ffffff',
  },
});

export default Tags;
