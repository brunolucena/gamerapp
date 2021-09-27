import React, {useEffect} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text, View, Picker, PickerItemValue} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';

import {MyColors} from 'src/Theme/FoundationConfig';
import ProductCard from '../ProductCard';
import {getAvailableGamerProductsCatalog} from 'src/Store/Ducks/productDetails';
import {GamerAppReduxStore} from 'src/Store';
import CheckBox from 'react-native-check-box';
import CustomActivityIndicator from 'src/Components/CustomActivityIndicator';
import {saveSellerAddProduct} from 'src/Store/Ducks/sellerAddProduct';
import MyButton from 'src/Components/Button';

const SellProductPlatforms = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {productDetails, sellerAddProduct, user} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {availablePlatforms, loadingGamers: loading} = productDetails;
  const {platformId, productId} = sellerAddProduct;
  const {gamerId} = user.user;

  useEffect(() => {
    dispatch(
      getAvailableGamerProductsCatalog({
        gamerId,
        productId,
        catalogType: 1,
        page: 1,
        filters: [],
      }),
    );
  }, [dispatch, gamerId, productId]);

  function handleToggle(item: {label: string, value: string}) {
    dispatch(
      saveSellerAddProduct({
        platformId: item.value,
      }),
    );
  }

  function getLabel(): string {
    const selectedPlatform = availablePlatforms.find(
      platform => platform.id === platformId,
    );

    return selectedPlatform?.name || '';
  }

  function handleNext() {
    navigation.navigate('SellProductState');
  }

  return (
    <View style={styles.container}>
      <ProductCard />

      <View>
        <View marginB-20>
          <View padding-19>
            <Text text60 dark20 marginT-25>
              Ok, de qual plataforma é esse item?
            </Text>
          </View>

          <View paddingH-16 marginT-10>
            <Picker
              getLabel={getLabel}
              value={platformId}
              // @ts-ignore
              onChange={handleToggle}>
              {availablePlatforms.map((platform, index) => {
                return <Picker.Item key={`${platform.id} - ${index}`} label={platform.name} value={platform.id} />;
              })}
            </Picker>

            {/* {availablePlatforms.map(platform => {
              const {name} = platform;
              
              function handleToggle() {}
              
              return (
                <View style={styles.item}>
                <CheckBox
                checkedCheckBoxColor={MyColors.primary}
                rightText={name}
                isChecked={true}
                onClick={handleToggle}
                style={styles.checkbox}
                />
                </View>
                );
              })} */}
          </View>
        </View>

        <MyButton disabled={loading} label="Próximo" onPress={handleNext} type="secondary" />
      </View>

      <CustomActivityIndicator isVisible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    maxWidth: 300,
    marginHorizontal: 8,
    padding: 15,
    borderColor: '#c7c7c7',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  cardText: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#343434',
    fontSize: 18,
  },
  container: {
    borderTopWidth: 1,
    borderColor: '#f2f2f2',
  },
  checkbox: {
    margin: 0,
    marginLeft: 0,
    borderWidth: 0,
  },
  item: {
    marginBottom: 20,
    paddingBottom: 20,
    borderColor: '#cccccc',
    borderBottomWidth: 1,
  },
});

export default SellProductPlatforms;
