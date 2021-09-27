import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {Image, View} from 'react-native-ui-lib';
import Modal from 'react-native-modal';
import {Image as IImage} from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';

import {
  addGameToGamerCollection,
  getGamerProductCatalogDetails,
  setActiveAddGameToCollectionForSale,
  setActiveAddGameToCollectionForTrade,
  setActiveAddGameToCollectionMediaType,
  setActiveAddGameToCollectionPlatform,
} from 'src/Store/Ducks/gamerCollection';

import PoliticasVendaETroca from '../../Terms/PoliticasVendaETroca';
import TermosDeUso from '../../Terms/TermosDeUso';

import AddPhotos from './AddPhotos/AddPhotos';
// import VerifyGame from './VerifyGame/VerifyGame';

import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';
import ForTrade from './ForTrade/ForTrade';

import {Header, ProductName} from './AddToCollectionStyles';
import Platform from './Platform/Platform';
import {ActiveAddGameToCollectionPlatform} from '../../../Models/GamerProductCollection';
import MediaType from './MediaType/MediaType';
import MyButton from 'src/Components/Button';
import {GamerAppReduxStore} from 'src/Store';

interface Props {}

function AddToCollection() {
  const dispatch = useDispatch();

  const [photos, setPhotos] = useState<IImage[]>([]);
  const [politicasOpened, setPoliticasOpened] = useState(false);
  const [termosDeUsoOpened, setTermosDeUsoOpened] = useState(false);
  // const [verifyGame, setVerifyGame] = useState(false);
  // const [verifyGameImage, setVerifyGameImage] = useState<ImagePickerResponse>();

  const {gamerCollection: gamerCollectionRedux, user: userRedux} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {activeAddGameToCollection, loading} = gamerCollectionRedux;
  const {gamerId} = userRedux.user;

  const {
    availablePlatforms,
    forTrade,
    gamerProductCatalogId,
    images,
    mediaType,
    platformId,
    price,
    productId,
    productImageUrl,
    productName,
    type: category,
  } = activeAddGameToCollection;

  useEffect(() => {
    dispatch(
      getGamerProductCatalogDetails({
        gamerProductCatalogId: gamerProductCatalogId || '',
        productId,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToCollection = () => {
    // Get base64 images
    const base64Photos = photos.map(
      photo => `data:image/jpeg;base64,${photo.data}`,
    );

    const {
      forTrade: forTradeActive,
      mediaType: mediaTypeActive,
      platformId: platformIdActive,
    } = activeAddGameToCollection;

    dispatch(
      addGameToGamerCollection(
        {
          forSale: false,
          forTrade: mediaType === 'Digital' ? false : forTradeActive,
          gamerId,
          imagesBase64: base64Photos,
          mediaType: mediaTypeActive === 'Fisica' ? 1 : 2,
          platformId: platformIdActive,
          price: typeof price === 'string' ? parseFloat(price) : price,
          productId,
          gamerProductCatalogId,
        },
        gamerProductCatalogId ? 'Update' : 'New',
      ),
    );
  };

  // const handleSetForSale = (forSale2: boolean) => {
  //   dispatch(setActiveAddGameToCollectionForSale(forSale2));
  // };

  const handleSetForTrade = (forTrade2: boolean) => {
    dispatch(setActiveAddGameToCollectionForTrade(forTrade2));
  };

  const handleSetMediaType = (mediaType2: 'Fisica' | 'Digital') => {
    dispatch(setActiveAddGameToCollectionMediaType(mediaType2));
  };

  const handleSetPlatformId = (platform: ActiveAddGameToCollectionPlatform) => {
    dispatch(setActiveAddGameToCollectionPlatform(platform));
  };

  const togglePoliticas = () => {
    setPoliticasOpened(!politicasOpened);
  };

  const toggleTermosDeUso = () => {
    setTermosDeUsoOpened(!termosDeUsoOpened);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View paddingB-20>
          <Header>
            {!!productImageUrl && (
              <Image source={{uri: productImageUrl}} style={styles.image} />
            )}
            <ProductName>{productName}</ProductName>
          </Header>

          <View style={styles.content}>
            <AddPhotos
              gamerProductCatalogId={gamerProductCatalogId || ''}
              originalImages={images}
              photos={photos}
              setPhotos={setPhotos}
            />

            {category === 'Game' && (
              <>
                <Platform
                  availablePlatforms={availablePlatforms}
                  selectedPlatformId={platformId}
                  setSelectedPlatform={handleSetPlatformId}
                />

                <View style={styles.divider} />
              </>
            )}

            {category === 'Game' && (
              <>
                <MediaType
                  availableMediaTypes={['Fisica', 'Digital']}
                  selectedMediaType={mediaType}
                  setSelectedMediaType={handleSetMediaType}
                />

                <View style={styles.divider} />
              </>
            )}

            {mediaType === 'Fisica' && (
              <>
                <ForTrade forTrade={forTrade} setForTrade={handleSetForTrade} />

                <View style={styles.divider} />
              </>
            )}

            {/* <VerifyGame
              verifyGame={verifyGame}
              setVerifyGame={setVerifyGame}
              verifyGameImage={verifyGameImage}
              setVerifyGameImage={setVerifyGameImage}
            /> */}
          </View>
        </View>
      </ScrollView>

      <View>
        <MyButton
          disabled={loading}
          onPress={addToCollection}
          label={gamerProductCatalogId ? 'Salvar' : 'Adicionar na coleção'}
          type="secondary"
        />

        {/* <View style={styles.bottomText}>
          <Text style={[styles.text, styles.textSmall]}>
            Li e Aceito os
          </Text>

          <MyButton
            label="Termos de Uso"
            clear
            onPress={toggleTermosDeUso}
          />

          <Text style={styles.textSmall}>e</Text>

          <MyButton
            label="Política de Vendas e Troca"
            clear
            onPress={togglePoliticas}
          />
        </View> */}
      </View>

      {/* <Modal isVisible={politicasOpened} onBackdropPress={togglePoliticas}>
        <PoliticasVendaETroca />
      </Modal>

      <Modal isVisible={termosDeUsoOpened} onBackdropPress={toggleTermosDeUso}>
        <TermosDeUso />
      </Modal> */}

      <CustomActivityIndicator isVisible={loading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // bottomText: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   alignItems: 'center',
  // },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f5f4f4',
  },
  content: {
    paddingHorizontal: 10,
  },
  divider: {
    marginVertical: 8,
  },
  // text: {
  //   paddingTop: 10,
  //   paddingBottom: 10,
  //   paddingRight: 16,
  //   paddingLeft: 16,
  //   fontSize: 16,
  // },
  // textSmall: {
  //   fontSize: 10,
  // },
  image: {
    height: 80,
    width: 80,
    resizeMode: 'cover',
  },
});

export default AddToCollection;
