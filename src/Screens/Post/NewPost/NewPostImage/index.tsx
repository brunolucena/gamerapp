import Avatar from 'src/Components/Avatar';
import CustomActivityIndicator from 'src/Components/CustomActivityIndicator';
import getInitialLetters from 'src/Helpers/getInitialLetters';
import KeywordsComponent from '../KeywordsComponent';
import MyButton from 'src/Components/Button';
import React, { Fragment, useEffect, useState } from 'react';
import WithImagePicker from 'src/Components/WithImagePicker';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet
  } from 'react-native';
import { GamerAppReduxStore } from 'src/Store';
import { getBase64FormatedString } from 'src/Helpers/functions';
import { Image as IImage } from 'react-native-image-crop-picker';
import { MyColors } from 'src/Theme/FoundationConfig';
import { setPostDuckData } from 'src/Store/Ducks/postDuck';
import { Text, TextField, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const {width: screenWidth} = Dimensions.get('window');

const NewPostImage: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {post, user} = useSelector((state: GamerAppReduxStore) => state);

  const {loading, title} = post;  
  const {firstName, imageUrl: userImageUrl, lastName} = user.user;

  const fullName = `${firstName} ${lastName}`;

  const [dimensions, setDimensions] = useState({height: 0, width: 0});
  const [newPostImage, setNewPostImage] = useState(post.newPostImage);
  const [text, setText] = useState(post.title);

  function onImagesAdded(images: IImage[]) {
    const image = images[0];

    if (image?.data) {
      setNewPostImage(getBase64FormatedString(image.data))
    }
  }

  function onNext() {
    navigation.navigate('PostNavigation', {screen: 'AddTags'});
  }

  useEffect(() => {
    Image.getSize(newPostImage, (width, height) => {
      const proportion = height / width;

      setDimensions({
        height: proportion * screenWidth,
        width: screenWidth,
      });
    });
  }, [newPostImage]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        dispatch(setPostDuckData({
          newPostImage,
          title: text,
        }));
      };
    }, [newPostImage, text])
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <View centerV paddingH-10 row spread>
          <View centerV paddingV-15 row>
            <Avatar
              backgroundColor="#f3f2f2"
              imageSource={
                userImageUrl
                  ? {uri: userImageUrl}
                  : require('../../../../Assets/images/home/profile.png')
              }
              name={fullName}
            />

            <Text dark20 marginL-10 text70>
              {fullName}
            </Text>
          </View>

          <MyButton disabled={!newPostImage} label="Próximo" onPress={onNext} size="medium" />
        </View>

        <View paddingH-10 paddingT-15>
          <TextField
            hideUnderline
            multiline
            numberOfLines={5}
            onChangeText={(text) => setText(text)}
            placeholder="Escreva seu post..."
            placeholderTextColor="#b1b1b1"
            style={styles.textField}
            value={title}
          />
        </View>

        <KeywordsComponent />

        <View marginT-30>
          <WithImagePicker onImagesAdded={onImagesAdded} openOnLoad>
            <Fragment>
              {!newPostImage &&
                <Text marginB-10 marginH-10>
                  Adicionar Imagem
                </Text>
              }

              <Image
                resizeMode="contain"
                source={{uri: newPostImage}}
                style={{height: dimensions.height, width: dimensions.width}}
              />
            </Fragment>
          </WithImagePicker>
        </View>

        <CustomActivityIndicator isVisible={loading} />
      </View>
    </ScrollView>
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
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f2f2',
  },
  safeArea: {
    flex: 1,
  },
  textField: {
    marginBottom: 0,
    padding: 10,
    borderWidth: 1,
    backgroundColor: '#fbfbfb',
    borderColor: '#bcbcbc',
    borderRadius: 6,
  },
});

export default NewPostImage;
