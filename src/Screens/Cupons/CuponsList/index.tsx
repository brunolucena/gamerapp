import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Image, Text, View} from 'react-native-ui-lib';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {GamerAppReduxStore} from 'src/Store';
import {CoupomInfo} from 'src/Models/CouponModels';
import {
  selectIsCouponSelected,
  selectCouponTitle,
  setCouponData,
  selectIsCouponValid,
  getCouponList,
} from 'src/Store/Ducks/couponDuck';
import {MyColors} from 'src/Theme/FoundationConfig';

const CouponsList = () => {
  const dispatch = useDispatch();

  const {cart, coupon, user} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {coupoms} = coupon;

  useEffect(() => {
    dispatch(getCouponList({gamerId: user.user.gamerId}));
  }, []);

  function _keyExtractor(item: CoupomInfo, index: number): string {
    return `${item.id} - ${index}`;
  }

  function _renderItem({item, index}: {item: CoupomInfo; index: number}) {
    function handleOnPress() {
      if (validation.valid) {
        dispatch(
          setCouponData({
            selectedCoupon: item,
          }),
        );
      }
    }

    const isSelected = selectIsCouponSelected(coupon, item);
    const validation = selectIsCouponValid(cart, item);

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        key={item.id + index}
        onPress={handleOnPress}
        style={[styles.coupon, isSelected && styles.selected]}>
        <View row spread centerV paddingH-20 paddingT-20 paddingB-10>
          <View row centerV>
            <MaterialCommunityIcons
              name="ticket-percent"
              color={isSelected ? MyColors.primary : '#cecece'}
              size={27}
              style={styles.icon}
            />

            <Text marginL-10 dark20 text70>
              {selectCouponTitle(item)}
            </Text>
          </View>

          {isSelected ? (
            <MaterialCommunityIcons
              name="radiobox-marked"
              color={MyColors.primary}
              size={30}
            />
          ) : (
            <MaterialCommunityIcons name="circle" color="#cecece" size={30} />
          )}
        </View>

        {!!item.description ? (
          <View paddingH-20 marginB-20>
            <Text dark20 text80>
              {item.description}
            </Text>
          </View>
        ) : (
          <View marginV-5 />
        )}

        {!validation.valid && (
          <View style={styles.invalidCupom}>
            <MaterialCommunityIcons name="lock" color="#aeaeae" size={15} />

            <Text dark20 text90 marginL-5>
              {validation.message}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  const emptyCoupon: CoupomInfo = {
    amount: 0,
    code: '',
    description: '',
    id: '',
    maximumValue: 0,
    minimumValue: 0,
    title: 'Sem cupom',
    type: '',
    validUntil: '',
  };

  return (
    <View flex paddingV-10 style={styles.container}>
      {_renderItem({item: emptyCoupon, index: 0})}

      <FlatList
        data={coupoms}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
  },
  contentContainerStyle: {
    paddingBottom: 70,
  },
  coupon: {
    marginVertical: 8,
    marginHorizontal: 13,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#cecece',
  },
  icon: {
    transform: [
      {
        rotate: '-45deg',
      },
    ],
  },
  invalidCupom: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: '#e0e0e0',
  },
  selected: {
    borderColor: '#0dac3d',
    borderWidth: 1,
  },
});

export default CouponsList;
