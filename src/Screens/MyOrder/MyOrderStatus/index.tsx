import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, ScrollView} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomActivityIndicator from 'src/Components/CustomActivityIndicator';
import formatDateTime from 'src/Helpers/formatDateTime';
import {GamerAppReduxStore} from 'src/Store';
import {MyColors} from 'src/Theme/FoundationConfig';
import {MyOrderStatusHistoryInfo} from 'src/Models/MyOrder';
import {getMyOrderStatus} from 'src/Store/Ducks/myOrderDuck';

const MyOrderStatus = () => {
  const dispatch = useDispatch();

  const {myOrder} = useSelector((state: GamerAppReduxStore) => state);

  const {activeMyOrderId, loading, myOrderStatus} = myOrder;

  useEffect(() => {
    dispatch(getMyOrderStatus({myOrderId: activeMyOrderId}));
  }, [activeMyOrderId, dispatch]);

  function renderItem(item: MyOrderStatusHistoryInfo) {
    const {date, description, postOfficeCode, status, statusId} = item;

    return (
      <View row>
        <View centerH>
          <View style={styles.circle} />
          <View style={styles.line} />
        </View>

        <View marginL-15 paddingB-30>
          <Text>{formatDateTime(date)}h</Text>

          <View row centerV>
            <Text
              marginR-10
              style={[
                styles.textStatus,
                statusId === '2' && styles.textStatusBlue,
                statusId === '3' && styles.textStatusGreen,
              ]}>
              {status}
            </Text>

            {statusId === '3' && (
              <MaterialCommunityIcons
                name="truck-fast"
                size={30}
                color={MyColors.primary}
              />
            )}
          </View>

          <Text style={styles.textDescription}>{description}</Text>

          {!!postOfficeCode && (
            <Text style={styles.postOfficeCode} marginT-10>
              Código rastreio: {postOfficeCode ? postOfficeCode : ''}
            </Text>
          )}
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text marginH-20 text60>
          Status do pedido
        </Text>

        <View paddingH-20 paddingV-30>
          {myOrderStatus.map(status => renderItem(status))}
        </View>
        <CustomActivityIndicator isVisible={loading} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 0,
    paddingTop: 4,
    paddingBottom: 10,
  },
  cardWrapper: {
    backgroundColor: '#ffffff',
  },
  circle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 40,
    backgroundColor: '#ffffff',
  },
  line: {
    flex: 1,
    width: 3,
    backgroundColor: '#e0e0e0',
  },
  postOfficeCode: {
    backgroundColor: '#eaeaea',
    paddingVertical: 2,
    paddingHorizontal: 5,
    color: '#0b0b0b',
    fontSize: 12,
  },
  scrollView: {
    backgroundColor: '#ffffff',
  },
  storeCard: {
    paddingVertical: 1,
    paddingHorizontal: 5,
  },
  textDescription: {
    color: '#696969',
    fontSize: 13,
  },
  textStatus: {
    marginTop: 2,
    marginBottom: 3,
    color: '#0f0f0f',
    fontSize: 18,
    fontWeight: '700',
  },
  textStatusBlue: {
    color: MyColors.secondary,
  },
  textStatusGreen: {
    color: MyColors.primary,
  },
  titleStyle: {
    color: '#383838',
    fontSize: 15,
  },
});

export default MyOrderStatus;
