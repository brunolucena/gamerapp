import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Text, View, Image} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker, {Image as IImage} from 'react-native-image-crop-picker';

import MyButton from 'src/Components/Button';
import ProductCard from '../ProductCard';
import {
  saveSellerAddProduct,
  sellerAddProductAddImage,
  sellerAddProductRemoveImage,
} from 'src/Store/Ducks/sellerAddProduct';
import {GamerAppReduxStore} from 'src/Store';
import ButtonWithIcon from 'src/Components/ButtonWithIcon';

const {width: screenWidth} = Dimensions.get('window');

const cardWidth = screenWidth / 2 - 20;
const cardHeight = cardWidth * 0.8;

const SellProductPhotos = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [photos, setPhotos] = useState<IImage[]>([]);

  const {images, imagesNormalized, state} = useSelector(
    (gamerAppState: GamerAppReduxStore) => gamerAppState.sellerAddProduct,
  );

  function handleAddImage(imageBase64: string) {
    dispatch(sellerAddProductAddImage(imageBase64));
  }

  function handleRemoveImage(imageIndex: number) {
    dispatch(sellerAddProductRemoveImage(imageIndex));

    const newPhotos = photos;

    newPhotos.splice(imageIndex, 1);

    setPhotos(newPhotos);
    dispatch(
      saveSellerAddProduct({
        imagesNormalized: newPhotos,
      }),
    );
  }

  function handleNext() {
    navigation.navigate('SellProductPrice');
  }

  const openImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
      compressImageQuality: 0.6,
      compressImageMaxWidth: 800,
      includeBase64: true,
    })
      .then(response => {
        // Se o response for somente uma imagem.
        if (!Array.isArray(response)) {
          handleAddImage(`data:image/jpeg;base64,${response.data}`);
          setPhotos([...photos, response]);
          dispatch(
            saveSellerAddProduct({
              imagesNormalized: [...imagesNormalized, response],
            }),
          );
        } else {
          let newPhotos = [...photos];
          let newImagesNormalized = [...imagesNormalized];

          response.forEach(image => {
            handleAddImage(`data:image/jpeg;base64,${image.data}`);

            newPhotos.push(image);
            newImagesNormalized.push(image);
          });

          dispatch(
            saveSellerAddProduct({
              imagesNormalized: newImagesNormalized,
            }),
          );
          setPhotos(newPhotos);
        }
      })
      .catch(error => {
        // Usuário cancelou
        console.log(error);
      });
  };

  function _keyExtractor(item: IImage, index: number): string {
    return String(index);
  }

  function _renderItem({item, index}: {item: IImage; index: number}) {
    function handleOnPress() {
      Alert.alert('Excluir foto', 'Deseja excluir essa foto?', [
        {
          text: 'Cancelar',
        },
        {
          text: 'Confirmar',
          onPress: function() {
            handleRemoveImage(index);
          },
        },
      ]);
    }

    return (
      <TouchableOpacity activeOpacity={0.5} onPress={handleOnPress}>
        <View marginR-15>
          <Image source={{uri: item.path}} style={styles.image} />
        </View>
      </TouchableOpacity>
    );
  }

  const hasImages = images.length > 0;

  return (
    <View style={styles.container}>
      <ProductCard />

      <Text marginH-20 marginT-20 dark10>
        {imagesNormalized.length} foto(s)
      </Text>

      {hasImages ? (
        <View marginT-10 marginB-40 marginH-20>
          <FlatList
            data={imagesNormalized}
            horizontal
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
          />
        </View>
      ) : (
        <View paddingT-40 paddingB-55 paddingH-20>
          <Text dark20 text60>
            Ótimo, vamos adicionar fotos?
          </Text>

          <Text dark20 text70>
            *Obrigatório para jogos usados
          </Text>
        </View>
      )}

      <View paddingH-10>
        {hasImages ? (
          <View>
            <View paddingH-10>
              <ButtonWithIcon
                icon={<Icon name="camera-alt" color="#ffffff" size={21} />}
                label="Adicionar fotos"
                onPress={openImagePicker}
              />
            </View>

            <MyButton label="Próximo" onPress={handleNext} type="primary" />
          </View>
        ) : (
          <ButtonWithIcon
            icon={<Icon name="camera-alt" color="#ffffff" size={21} />}
            label="Adicionar fotos"
            onPress={openImagePicker}
          />
        )}

        {state === 'Novo' && (
          <MyButton clear label="Pular" onPress={handleNext} type="secondary" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: '#f2f2f2',
  },
  image: {
    height: cardHeight - 8,
    width: cardWidth - 8,
    padding: 3,
  },
  photoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    backgroundColor: '#ffffff',
    height: cardHeight,
    width: cardWidth,
  },
});

export default SellProductPhotos;
