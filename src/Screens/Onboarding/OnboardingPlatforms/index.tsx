import CustomActivityIndicator from 'src/Components/CustomActivityIndicator';
import Grid from 'src/Components/Grid';
import MyButton from 'src/Components/Button';
import React, {useEffect, useState} from 'react';
import {GamerAppReduxStore} from 'src/Store';
import {Image, Text, View} from 'react-native-ui-lib';
import {loadPlatforms, savePlatforms} from 'src/Store/Ducks/platformDuck';
import {MyColors} from 'src/Theme/FoundationConfig';
import {PlatformWithImage} from 'src/Models/Platform';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const OnboardingInit = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {user, platforms} = useSelector((state: GamerAppReduxStore) => state);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  function handleNext() {
    if (selectedIds.length > 0) {
      dispatch(
        savePlatforms({
          gamerId: user.user.gamerId,
          platformIds: selectedIds,
        }),
      );
    }

    navigation.navigate('OnboardingTags');
  }

  function skip() {
    navigation.navigate('OnboardingTags');
  }

  const renderItem = (item: PlatformWithImage) => {
    const {id, imageUrl, name} = item;

    const isSelected =
      selectedIds.findIndex(idSelected => idSelected === id) > -1;

    const toggleItem = () => {
      let newIdsSelected = [...selectedIds];

      if (isSelected) {
        newIdsSelected = newIdsSelected.filter(idSelected => idSelected !== id);
      } else {
        newIdsSelected.push(id);
      }

      setSelectedIds(newIdsSelected);
    };

    return (
      <TouchableOpacity
        onPress={toggleItem}
        style={[styles.item, isSelected && styles.isSelected]}>
        {imageUrl ? (
          <Image
            resizeMode="contain"
            source={{uri: imageUrl}}
            style={styles.image}
          />
        ) : (
          <Text dark10>{name}</Text>
        )}
      </TouchableOpacity>
    );
  };

  const listHeaderComponent = (
    <View paddingV-10>
      <Text dark10 text40>
        Escolha sua{'\n'}plataforma
      </Text>

      <Text dark40 marginT-8>
        Pode ser mais de uma ok?
      </Text>
    </View>
  );

  useEffect(() => {
    dispatch(loadPlatforms({}));
  }, [dispatch]);

  useEffect(() => {
    const isLoggedIn = !!user.token;

    if (!isLoggedIn) {
      navigation.navigate('Login');
    }
  }, [dispatch]);

  return (
    <View flex style={styles.container}>
      <View paddingV-10 right>
        <MyButton clear label="Pular" onPress={skip} size="small" type="gray" />
      </View>

      <View flex paddingH-20 paddingV-15 style={styles.scrollWrapper}>
        <Grid
          data={platforms.platforms}
          gap={20}
          listHeaderComponent={listHeaderComponent}
          renderItem={renderItem}
        />
      </View>

      <View style={styles.buttonContainer}>
        <MyButton label="Próximo" onPress={handleNext} type="secondary" />
      </View>

      <CustomActivityIndicator isVisible={platforms.loading} />
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
  image: {
    height: 80,
    width: '100%',
  },
  isSelected: {
    borderColor: MyColors.primary,
    borderWidth: 2,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderColor: '#bbbbbb',
    borderRadius: 6,
    borderWidth: 1,
  },
  container: {
    backgroundColor: '#fafafa',
  },
  scrollWrapper: {
    paddingBottom: 75,
    backgroundColor: '#ffffff',
  },
});

export default OnboardingInit;
