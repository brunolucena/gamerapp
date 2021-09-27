import React, {useEffect} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Image, Text, View} from 'react-native-ui-lib';

import CustomActivityIndicator from '../../../../Components/CustomActivityIndicator';

import {
  ProductSellerSafeAreaView,
  ProductSellerScrollView,
} from './GamerProductSellerStyles';
import StoreCard from 'src/Components/StoreCard';
import CardDefault from 'src/Components/CardDefault';
import MyButton from 'src/Components/Button';
import getColorByPlatform from 'src/Helpers/getColorByPlatform';
import GamerAppCard from 'src/Components/GamerAppCard';
import {useSelector, useDispatch} from 'react-redux';
import {GamerAppReduxStore} from 'src/Store';
import {
  getSellerProducts,
  setActiveSellerId,
} from 'src/Store/Ducks/sellerDucks';
import {setActiveGamerProductDetails} from 'src/Store/Ducks/gamerProductDetailsDuck';
import {useNavigation} from '@react-navigation/native';
import {formatCurrency} from 'src/Helpers/formatCurrency';
import formatDistance from 'src/Helpers/formatDistance';

const {width} = Dimensions.get('window');

const barWidth = (width - 44 - 15) / 5;
const cardWidth = (width - 40 - 20) / 3;

function GamerProductSeller() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {gamerProductDetails, seller, user} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {activeGamerProduct, store} = gamerProductDetails;
  const {
    city,
    distance,
    id,
    imageUrl,
    name,
    proStore,
    stars,
    state,
    storeRating,
    trustedDelivery,
  } = store || {
    city: '',
    distance: 0,
    id: '',
    imageUrl: '',
    info: [],
    name: '',
    stars: 0,
    state: '',
    storeRating: 0,
    trustedDelivery: false,
  };

  const info = gamerProductDetails.store?.info || [];

  const products = seller.products.slice(0, 3);

  useEffect(() => {
    dispatch(
      getSellerProducts({
        storeId: id,
        page: 1,
        gamerId: user.user.id,
        searchText: '',
      }),
    );
  }, [dispatch, id, user.user.id]);

  function handleVerTudo() {
    dispatch(setActiveSellerId(id));

    navigation.navigate('SellerStoreSeeAll');
  }

  const renderBar = (color: string, active?: boolean) => {
    return (
      <View
        style={[
          styles.bar,
          active && styles.barActive,
          {backgroundColor: color},
        ]}
      />
    );
  };

  return (
    <ProductSellerSafeAreaView>
      <ProductSellerScrollView>
        <View>
          <StoreCard
            actionIsBottom
            backgroundColor="#ffffff"
            image={{uri: imageUrl}}
            name={name}
            stars={stars || 0}
            city={city}
            state={state}
          />
        </View>

        <View paddingB-100>
          {proStore && 
            <View row centerV paddingH-20 paddingT-10 paddingB-5>
              <Text dark20 marginL-10 text60>
                
                Pro Store
              </Text>
            </View>
          }

          {!!storeRating &&
            <View paddingH-22 row spread centerV marginT-5>
              {renderBar('#ffcccc', storeRating === 1)}
              {renderBar('#ffe7b2', storeRating === 2)}
              {renderBar('#eae398', storeRating === 3)}
              {renderBar('#c4dd6a', storeRating === 4)}
              {renderBar('#0db534', storeRating === 5)}
            </View>
          }

          <View row spread paddingH-15 paddingT-10 paddingB-20>
            {info?.map((storeInfo, index) => {
              const {text, title} = storeInfo;

              return (
                <CardDefault
                  key={`${title} - ${text} - ${index}`}
                  subtitle={text}
                  title={title}
                  width={cardWidth}
                />
              );
            })}

            {trustedDelivery && (
              <CardDefault
                subtitle="Entrega os produtos no prazo"
                title={
                  <Image
                    source={require('../../../../Assets/images/truck-check.png')}
                    style={styles.truckCheck}
                  />
                }
                width={cardWidth}
              />
            )}
          </View>

          {products.length > 0 && (
            <View paddingH-15 marginT-5 marginB-30>
              <View row spread centerV>
                <Text text70>Mais produtos desse vendedor</Text>

                <MyButton
                  label="Ver tudo"
                  color="#696969"
                  clear
                  onPress={handleVerTudo}
                />
              </View>

              <View row>
                {products.map((product, index) => {
                  const {
                    storeProductId: productId,
                    imageUrl: productImageUrl,
                    platform,
                    offerPrice,
                    price,
                  } = product;

                  function handleNavigateProduct() {
                    dispatch(
                      setActiveGamerProductDetails({
                        catalogId: product.storeProductId,
                        catalogType: activeGamerProduct.catalogType,
                        gamerId: activeGamerProduct.gamerId,
                        id: activeGamerProduct.id,
                      }),
                    );

                    navigation.navigate('GamerProduct', {
                      screen: 'GamerProductDetails',
                    });
                  }

                  return (
                    <GamerAppCard
                      key={`${productId} - ${index}`}
                      height={(cardWidth - 30) * 1.4}
                      width={cardWidth - 10}
                      imageSource={{uri: productImageUrl}}
                      title={platform}
                      titleColor={getColorByPlatform(platform)}
                      onPress={handleNavigateProduct}
                      name={offerPrice ? formatCurrency(offerPrice) : formatCurrency(price)}
                      distance={formatDistance(distance) || undefined}
                    />
                  );
                })}
              </View>
            </View>
          )}
        </View>
      </ProductSellerScrollView>

      <CustomActivityIndicator isVisible={false} />
    </ProductSellerSafeAreaView>
  );
}

const styles = StyleSheet.create({
  bar: {
    width: barWidth,
    height: 7,
  },
  barActive: {
    height: 12,
  },
  handGraph: {
    width: 32,
    height: 36,
  },
  image: {width: 100, height: 100, resizeMode: 'contain'},
  lineThrough: {textDecorationLine: 'line-through'},
  platform: {color: '#848484'},
  truck: {width: 40, height: 20, marginRight: 10},
  truckCheck: {
    width: 47,
    height: 32,
    marginBottom: 10,
  },
});

export default GamerProductSeller;
