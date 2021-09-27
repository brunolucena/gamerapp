import React, {useCallback, useEffect} from 'react';
import {RefreshControl, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
// import Swipeout, {SwipeoutButtonProperties} from 'react-native-swipeout';

import {
  getGamerWishlist,
  setGamerCollectionData,
} from 'src/Store/Ducks/gamerCollection';

import {setSelectedProduct} from 'src/Store/Ducks/productDetails';

import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';

import {
  EmptyListContainer,
  EmptyListText,
  MyWishlistSafeAreaView,
  MyWishlistScrollView,
  MyWishlistText,
  TextContainer,
} from './WishlistStyles';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {GamerAppReduxStore} from 'src/Store';
import {View} from 'react-native-ui-lib';
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

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {gamerCollection: gamerCollectionRedux, user: userRedux} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {gamerId} = userRedux.user;
  const {
    activeGamerId,
    gamer,
    loading,
    refreshing,
    shouldReload,
    wishlist,
  } = gamerCollectionRedux;

  useEffect(() => {
    if (gamerId) {
      dispatch(
        getGamerWishlist({
          gamerId: activeGamerId,
        }),
      );
    }
  }, [dispatch, gamerId]);

  useFocusEffect(
    React.useCallback(() => {
      if (shouldReload) {
        dispatch(
          getGamerWishlist({
            gamerId: activeGamerId,
          }),
        );
      }
    }, [shouldReload, dispatch, gamerId]),
  );

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
    dispatch(setGamerCollectionData({refreshing: true}));

    dispatch(
      getGamerWishlist({
        gamerId: activeGamerId,
      }),
    );
  }, [dispatch, gamerId]);

  function renderContent() {
    return (
      <MyWishlistSafeAreaView>
        <MyWishlistScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {isEmpty ? (
            <EmptyListContainer>
              <EmptyListText>
                {!loading && `Nenhum item na wishlist de ${gamer.name}`}
              </EmptyListText>
            </EmptyListContainer>
          ) : (
            <>
              <TouchableOpacity onPress={handleAddToWishlist}>
                <TextContainer>
                  <MyWishlistText>
                    Bem vindo a wishlist de {gamer.name}!
                  </MyWishlistText>
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
            </>
          )}
        </MyWishlistScrollView>

        <CustomActivityIndicator isVisible={loading} />
      </MyWishlistSafeAreaView>
    );
  }

  return renderContent();
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

export default Wishlist;
