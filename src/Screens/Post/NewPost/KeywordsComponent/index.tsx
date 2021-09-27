import React from 'react';
import {GamerAppReduxStore} from 'src/Store';
import {MyColors} from 'src/Theme/FoundationConfig';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const KeywordsComponent: React.FC = () => {
  const navigation = useNavigation();
  const {post} = useSelector((state: GamerAppReduxStore) => state);

  const {newPostKeywords} = post;

  function onPress() {
    navigation.navigate('PostNavigation', {screen: 'AddKeywords'});
  }

  return (
    <View centerV paddingH-10 row>
      <Text dark20>Keywords</Text>

      <View style={styles.separator} />

      <TouchableOpacity onPress={onPress} style={styles.textContainer}>
        <Text color={MyColors.secondary}>
          {newPostKeywords.length > 0
            ? newPostKeywords.map(
                (keyword, index) =>
                  `${keyword}${index + 1 < newPostKeywords.length ? ', ' : ''}`,
              )
            : 'Adicionar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 15,
    width: 2,
    marginRight: 5,
    marginLeft: 15,
    backgroundColor: '#dcdcdc',
  },
  textContainer: {
    padding: 10,
  },
});

export default KeywordsComponent;
