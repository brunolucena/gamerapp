import React, {useCallback, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import Swipeout, {SwipeoutButtonProperties} from 'react-native-swipeout';

import {setSelectedProduct} from 'src/Store/Ducks/productDetails';
import {getMyWishlist, setMyCollectionData} from 'src/Store/Ducks/myCollection';

import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';

import {
  EmptyContentContainer,
  EmptyContentHeaderText,
  EmptyListContainer,
  EmptyListText,
  MyWishlistSafeAreaView,
  MyWishlistScrollView,
  MyWishlistText,
  TextContainer,
} from './MyWishlistStyles';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {GamerAppReduxStore} from 'src/Store';
import {Image, View} from 'react-native-ui-lib';
import MyButton from 'src/Components/Button';
import MyListItem from 'src/Components/MyListItem';
import {MyColors} from 'src/Theme/FoundationConfig';

interface ItemsData {
  description?: string;
  gamerWishListId: string;
  id: string;
  imageUrl: string;
  name: string;
  platformName: string;
  type: string;
}

const MyWishlist = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userRedux = useSelector((state: GamerAppReduxStore) => state.user);

  const {gamerId} = userRedux.user;

  const myCollectionRedux = useSelector(
    (state: GamerAppReduxStore) => state.myCollection,
  );

  const {
    gamer,
    loading,
    refreshing,
    shouldReload,
    wishlist,
  } = myCollectionRedux;

  useEffect(() => {
    if (gamerId) {
      dispatch(
        getMyWishlist({
          gamerId,
        }),
      );
    }
  }, [dispatch, gamerId]);

  useFocusEffect(
    React.useCallback(() => {
      if (shouldReload) {
        dispatch(
          getMyWishlist({
            gamerId,
          }),
        );
      }
    }, [shouldReload, dispatch, gamerId]),
  );

  const isMyCollection = true;

  const isEmpty = wishlist.length === 0;

  const itemsData: ItemsData[] = [];

  wishlist.forEach(item => {
    const {
      category,
      gamerWishListId,
      imageUrl,
      name,
      platformName,
      productId,
    } = item;

    itemsData.push({
      gamerWishListId,
      id: productId,
      imageUrl,
      name,
      platformName,
      type: category,
    });
  });

  function handleAddToWishlist() {
    navigation.navigate('CreateWishlist');
  }

  const onRefresh = useCallback(() => {
    dispatch(setMyCollectionData({refreshing: true}));

    dispatch(
      getMyWishlist({
        gamerId,
      }),
    );
  }, [dispatch, gamerId]);

  function renderIsEmptyContent() {
    return (
      <EmptyContentContainer>
        <Image source={require('../../../Assets/images/trade/wishlist.png')} />

        <EmptyContentHeaderText>
          Monte a sua lista de desejos!
        </EmptyContentHeaderText>

        <MyButton
          onPress={handleAddToWishlist}
          label="Criar minha wishlist"
          style={styles.createWishlistButton}
        />
      </EmptyContentContainer>
    );
  }

  function renderContent() {
    return (
      <MyWishlistSafeAreaView>
        {isEmpty ? (
          <EmptyListContainer>
            <EmptyListText>
              {!loading && `Nenhum item na wishlist de ${gamer.name}`}
            </EmptyListText>
          </EmptyListContainer>
        ) : (
          <MyWishlistScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <TouchableOpacity onPress={handleAddToWishlist}>
              <TextContainer>
                <View />

                <MyWishlistText>
                  {isMyCollection
                    ? 'Adicionar a sua wishlist'
                    : `Bem vindo a wishlist de ${gamer.name}!`}
                </MyWishlistText>

                {isMyCollection && <Icon name="plus" color="#ffffff" />}
              </TextContainer>
            </TouchableOpacity>

            {itemsData.map((item, index) => {
              const {
                gamerWishListId,
                id,
                imageUrl,
                name,
                platformName,
                type,
              } = item;

              // const swipeoutBtns: SwipeoutButtonProperties[] = [
              //   {
              //     onPress: () => {
              //       console.log(`excluir ${gamerWishListId} ${name}`);
              //     },
              //     text: 'Excluir',
              //     type: 'delete',
              //   },
              // ];

              function handleOnPress() {
                if (type === 'Game') {
                  dispatch(
                    setSelectedProduct({
                      productId: id,
                      productImagePath: imageUrl,
                      productName: name,
                    }),
                  );

                  navigation.navigate('ProductDetails');
                }
              }

              return (
                // <Swipeout
                //   key={`${gamerWishListId} - ${index}`}
                //   style={styles.listContainer}
                //   right={swipeoutBtns}>
                <MyListItem
                  arrowColor={MyColors.secondary}
                  key={`${gamerWishListId} - ${index}`}
                  leftAvatar={{uri: imageUrl}}
                  onPress={handleOnPress}
                  subtitle={platformName}
                  title={name}
                />
                // </Swipeout>
              );
            })}
          </MyWishlistScrollView>
        )}

        <CustomActivityIndicator isVisible={loading} />
      </MyWishlistSafeAreaView>
    );
  }

  return isEmpty && isMyCollection ? renderIsEmptyContent() : renderContent();
};

const styles = StyleSheet.create({
  createWishlistButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  listContainer: {
    marginBottom: 2,
  },
});

export default MyWishlist;
