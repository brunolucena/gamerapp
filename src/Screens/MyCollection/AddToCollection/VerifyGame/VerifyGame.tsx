import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ImagePicker, {ImagePickerResponse} from 'react-native-image-picker';
import MyListItem from 'src/Components/MyListItem';
import MyButton from 'src/Components/Button';

interface Props {
  setVerifyGame: Function;
  setVerifyGameImage: Function;
  verifyGame: boolean;
  verifyGameImage: ImagePickerResponse | undefined;
}

const options = {
  title: 'Selfie com seu produto',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

function VerifyGame(props: Props) {
  const {
    setVerifyGame,
    setVerifyGameImage,
    verifyGame,
    // verifyGameImage,
  } = props;

  const [hasVerifyGameImage, setHasVerifyGameImage] = useState(false);

  const openImagePicker = () => {
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setVerifyGameImage(response);
        setHasVerifyGameImage(true);
      }
    });
  };

  const clearImage = () => {
    setVerifyGameImage({});
    setHasVerifyGameImage(false);
  };

  function handleVerifyGame() {
    setVerifyGame(!verifyGame);
  }

  function handleExcluirFoto() {
    Alert.alert('Excluir foto', 'Deseja excluir essa foto?', [
      {
        text: 'Cancelar',
      },
      {
        text: 'Confirmar',
        onPress: clearImage,
      },
    ]);
  }

  return (
    <View style={[styles.section, styles.verifyGame]}>
      <MyListItem
        onPress={handleVerifyGame}
        title="Verificar jogo"
        switchProps={{
          onValueChange: handleVerifyGame,
          value: verifyGame,
        }}
      />

      <Text style={styles.text}>
        Ao verificar um jogo, você será melhor pontuado nas sugestões de troca.
      </Text>

      <Text style={[styles.text, styles.textSmall]}>
        Essa foto não será exibida no app.
      </Text>

      {hasVerifyGameImage && (
        <TouchableOpacity activeOpacity={0.5} onPress={handleExcluirFoto}>
          {/* <Card
            containerStyle={styles.card}
            image={{uri: verifyGameImage?.uri}}
            imageProps={{resizeMode: 'cover'}}
          /> */}
        </TouchableOpacity>
      )}

      <MyButton onPress={openImagePicker} label="Tirar foto" />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  card: {
    width: 200,
    height: 'auto',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginBottom: 14,
  },
  section: {
    marginTop: 10,
  },
  text: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 16,
    paddingLeft: 16,
    fontSize: 16,
  },
  textSmall: {
    paddingTop: 5,
    fontSize: 13,
  },
  verifyGame: {
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});

export default VerifyGame;
