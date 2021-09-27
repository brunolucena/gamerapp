import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyButton from 'src/Components/Button';
import React, {useEffect, useState} from 'react';
import {GamerAppReduxStore} from 'src/Store';
import {loadTags, saveGamerTags} from 'src/Store/Ducks/tagsDuck';
import {MyColors} from 'src/Theme/FoundationConfig';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {TagModel} from 'src/Models/Tag';
import {Image, Text, View} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setUserData} from 'src/Store/Ducks/user';

const OnboardingTags = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {user, tags: tagsRedux} = useSelector(
    (state: GamerAppReduxStore) => state,
  );
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  const {tags} = tagsRedux;

  const isLoggedIn = !!user.token;

  function completeOnboarding() {
    dispatch(
      setUserData({
        onboardingDone: true,
      }),
    );
  }

  function handleNavigate() {
    const nextScreen = isLoggedIn ? 'Home' : 'Login';

    navigation.navigate(nextScreen);
  }

  function handleNext() {
    if (selectedTagIds.length > 0) {
      dispatch(
        saveGamerTags({
          gamerId: user.user.gamerId,
          tagIds: selectedTagIds,
        }),
      );
    }

    handleNavigate();
    completeOnboarding();
  }

  function skip() {
    handleNavigate();
    completeOnboarding();
  }

  const renderItem = (item: TagModel) => {
    const {id, imageUrl, name} = item;

    const isSelected =
      selectedTagIds.findIndex(idSelected => idSelected === id) > -1;

    const toggleItem = () => {
      let newIdsSelected = [...selectedTagIds];

      if (isSelected) {
        newIdsSelected = newIdsSelected.filter(idSelected => idSelected !== id);
      } else {
        newIdsSelected.push(id);
      }

      setSelectedTagIds(newIdsSelected);
    };

    return (
      <TouchableOpacity
        onPress={toggleItem}
        style={[styles.item, isSelected && styles.isSelected]}>
        <View center style={styles.iconWrapper}>
          {imageUrl ? (
            <Image
              resizeMode="contain"
              source={{uri: imageUrl}}
              style={styles.image}
            />
          ) : isSelected ? (
            <MaterialCommunityIcons
              color="#ffffff"
              name="check-bold"
              size={17}
            />
          ) : (
            <View style={styles.circle} />
          )}
        </View>

        <Text style={[styles.text, isSelected && styles.textSelected]}>
          {name}
        </Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    dispatch(loadTags({}));
  }, [dispatch]);

  return (
    <View flex style={styles.container}>
      <View paddingV-10 right>
        <MyButton clear label="Pular" onPress={skip} size="small" type="gray" />
      </View>

      <ScrollView>
        <View paddingH-20 paddingV-10>
          <Text dark10 text40>
            Quais são{'\n'}
            seus interesses?
          </Text>

          <Text dark40 marginT-8>
            Veja só o que te interessa mais!{'\n'}
            Ah, você pode alterar depois!
          </Text>
        </View>

        <View
          flex
          marginT-15
          paddingH-10
          paddingV-6
          style={styles.itemsWrapper}>
          {tags.map(tag => renderItem(tag))}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <MyButton label="Começar" onPress={handleNext} type="secondary" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopColor: '#cecece',
    borderTopWidth: 1,
    backgroundColor: '#ffffff',
  },
  circle: {
    height: 20,
    width: 20,
    backgroundColor: '#e2e2e2',
    borderRadius: 10,
  },
  container: {
    backgroundColor: '#fafafa',
  },
  iconWrapper: {
    height: 20,
    width: 20,
  },
  image: {
    height: 30,
    width: 30,
  },
  isSelected: {
    backgroundColor: MyColors.primary,
    borderColor: MyColors.primary,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    marginVertical: 7,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderColor: '#d8d8d8',
    borderRadius: 6,
    borderWidth: 1,
  },
  itemsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 85,
    backgroundColor: '#ffffff',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
    color: '#686868',
  },
  textSelected: {
    color: '#ffffff',
  },
});

export default OnboardingTags;
