import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import ImagePicker, {Image, Options} from 'react-native-image-crop-picker';

interface Props extends Options {
  activeOpacity?: number;
  onError?: (error: any) => any;
  onImagesAdded: (images: Image[]) => any;
  openOnLoad?: boolean;
}

const WithImagePicker: React.FC<Props> = props => {
  const {
    activeOpacity,
    children,
    compressImageMaxWidth,
    compressImageQuality,
    cropping,
    height,
    includeBase64,
    multiple,
    onError,
    onImagesAdded,
    openOnLoad,
    width,
  } = props;

  function openImagePicker() {
    ImagePicker.openPicker({
      width,
      height,
      cropping,
      multiple,
      compressImageQuality,
      compressImageMaxWidth,
      includeBase64,
    })
      .then(response => {
        let images = [];

        // Coloca no images as imagens sempre em formato de array
        if (!Array.isArray(response)) {
          images.push(response);
        } else {
          images = response;
        }

        onImagesAdded(images);
      })
      .catch(error => {
        // Usuário cancelou ou aconteceu algum erro

        if (onError) {
          onError(error);
        }
      });
  }

  useEffect(() => {
    if (openOnLoad) {
      openImagePicker();
    }
  }, [openOnLoad]);

  return (
    <TouchableOpacity activeOpacity={activeOpacity} onPress={openImagePicker}>
      {children}
    </TouchableOpacity>
  );
};

WithImagePicker.defaultProps = {
  activeOpacity: 0.5,
  compressImageMaxWidth: 800,
  compressImageQuality: 0.6,
  cropping: true,
  includeBase64: true,
  multiple: false,
};

export default WithImagePicker;
