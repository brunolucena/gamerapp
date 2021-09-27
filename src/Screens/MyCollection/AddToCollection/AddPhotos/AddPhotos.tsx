import React from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Image} from 'react-native-ui-lib';
import ImagePicker, {Image as IImage} from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {GamerProductImage} from '../../../../Models/GamerProductCollection';
import {deleteGamerProductCatalogImage} from 'src/Store/Ducks/gamerCollection';

import {SmallText, Title, TitleContainer} from './AddPhotosStyles';
import {MyColors} from 'src/Theme/FoundationConfig';

const {width} = Dimensions.get('screen');

const cardWidth = width / 3 - 20;
const cardHeight = cardWidth * 0.8;

interface NormalizedImage {
  imageId: string;
  imageUrl: string;
  sourceIndex: number;
  type: 'original' | 'photo';
}

interface Props {
  gamerProductCatalogId: string;
  originalImages: GamerProductImage[];
  photos: IImage[];
  setPhotos: Function;
}

const AddPhotos = (props: Props) => {
  const {gamerProductCatalogId, originalImages, photos, setPhotos} = props;

  const dispatch = useDispatch();

  const normalizedImages: NormalizedImage[] = [];

  originalImages.forEach(({imageId, imageUrl}, index) => {
    normalizedImages.push({
      imageId,
      imageUrl,
      sourceIndex: index,
      type: 'original',
    });
  });

  photos.forEach(({path}, index) => {
    normalizedImages.push({
      imageId: '',
      imageUrl: path,
      sourceIndex: index,
      type: 'photo',
    });
  });

  const addPhoto = (photo: IImage) => {
    const newPhotos = [...photos, photo];

    setPhotos(newPhotos);
  };

  const deletePhoto = (photo: IImage) => {
    const newPhotos = photos.filter(p => p.path !== photo.path);

    setPhotos(newPhotos);
  };

  const openImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropperActiveWidgetColor: MyColors.primary,
      cropperToolbarTitle: 'Editar imagem',
      cropping: true,
      compressImageQuality: 0.6,
      compressImageMaxWidth: 800,
      includeBase64: true,
    })
      .then(response => {
        // Se o response for somente uma imagem.
        if (!Array.isArray(response)) {
          addPhoto(response);
        } else {
          response.forEach(image => {
            addPhoto(image);
          });
        }
      })
      .catch(error => {
        // Usuário cancelou
        console.log(error);
      });
  };

  const renderImage = (index: number) => {
    const image = normalizedImages[index];

    const imageId = image ? image.imageId : '';
    const imageUrl = image ? image.imageUrl : '';
    const sourceIndex = image ? image.sourceIndex : null;
    const type = image ? image.type : '';

    function handleOnPress() {
      if (type === 'original') {
        Alert.alert('Excluir foto', 'Deseja excluir essa foto?', [
          {
            text: 'Cancelar',
          },
          {
            text: 'Confirmar',
            onPress: function() {
              dispatch(
                deleteGamerProductCatalogImage({
                  gamerProductCatalogId,
                  imageId,
                }),
              );
            },
          },
        ]);
      } else if (type === 'photo') {
        Alert.alert('Excluir foto', 'Deseja excluir essa foto?', [
          {
            text: 'Cancelar',
          },
          {
            text: 'Confirmar',
            onPress: function() {
              if (typeof sourceIndex === 'number') {
                deletePhoto(photos[sourceIndex]);
              }
            },
          },
        ]);
      } else {
        openImagePicker();
      }
    }

    return (
      <TouchableOpacity activeOpacity={0.5} onPress={handleOnPress}>
        <View style={styles.photoContainer}>
          {image ? (
            <Image
              resizeMode="contain"
              source={{uri: imageUrl}}
              style={styles.image}
            />
          ) : (
            <Icon name="camera-alt" color="#2699fb" size={cardWidth * 0.3} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.section}>
      <TitleContainer>
        <Title>Adicione fotos</Title>

        <SmallText>(Case, mídia, estado da mídia...)</SmallText>
      </TitleContainer>

      <View style={styles.photosContainer}>
        {renderImage(0)}
        {renderImage(1)}
        {renderImage(2)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: cardHeight - 8,
    width: cardWidth - 8,
    padding: 3,
  },
  photosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  photoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    height: cardHeight,
    width: cardWidth,
  },
  section: {
    marginTop: 10,
    marginBottom: 4,
  },
  text: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 13,
    paddingLeft: 13,
    fontSize: 16,
  },
});

export default AddPhotos;
