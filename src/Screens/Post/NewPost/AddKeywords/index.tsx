import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyButton from 'src/Components/Button';
import React, {useState} from 'react';
import TopNavigationBar from 'src/Components/TopNavigationBar';
import {GamerAppReduxStore} from 'src/Store';
import {MyColors} from 'src/Theme/FoundationConfig';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {setPostDuckData} from 'src/Store/Ducks/postDuck';
import {Text, TextField, View} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

interface KeywordProps {
  onPress: any;
  text: string;
}

const Keyword: React.FC<KeywordProps> = ({onPress, text}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.keywordContainer}>
      <Text dark10 text70>
        {text}
      </Text>

      <MaterialCommunityIcons
        color={MyColors.warn}
        name="close"
        size={15}
        style={styles.keywordDeleteIcon}
      />
    </TouchableOpacity>
  );
};

const AddKeywords: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {post} = useSelector((state: GamerAppReduxStore) => state);

  const [keywords, setKeywords] = useState(post.newPostKeywords);
  const [text, setText] = useState('');

  function addKeyword() {
    if (text) {
      setKeywords([...keywords, text]);
      setText('');
    }
  }

  function onChangeText(text: string) {
    setText(text);
  }

  function onPress() {
    navigation.navigate('PostNavigation', {screen: 'NewPost'});
  }

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        dispatch(
          setPostDuckData({
            newPostKeywords: keywords,
          }),
        );
      };
    }, [keywords]),
  );

  return (
    <ScrollView style={styles.scrollView}>
      <TopNavigationBar title="Keywords" />

      <View paddingH-10 marginB-40>
        <Text center dark20 margin-20 text70>
          Adicione keywords para ajudar {'\n'}a encontrar seu post
        </Text>

        <View>
          <TextField
            onEndEditing={addKeyword}
            onChangeText={onChangeText}
            placeholder="keyword"
            rightButtonProps={{
              iconColor: '#191919',
              iconSource: require('./assets/plus.png'),
              onPress: addKeyword,
              style: styles.textFieldIcon,
            }}
            value={text}
          />
        </View>

        <View centerV row style={styles.keywordsContainer}>
          {keywords.map((keyword, index) => {
            function removeKeyword() {
              const newKeywords = [...keywords];

              newKeywords.splice(index, 1);

              setKeywords(newKeywords);
            }

            return <Keyword onPress={removeKeyword} text={keyword} />;
          })}
        </View>
      </View>

      <MyButton label="OK" onPress={onPress} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
  },
  keywordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#dcebff',
    borderRadius: 5,
  },
  keywordDeleteIcon: {
    marginLeft: 3,
    top: 1,
  },
  keywordsContainer: {
    flexWrap: 'wrap',
  },
  textFieldIcon: {
    bottom: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#dddddd',
    borderRadius: 6,
  },
});

export default AddKeywords;
