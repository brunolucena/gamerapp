import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {View} from 'react-native-ui-lib';
import WebView, {WebViewNavigation} from 'react-native-webview';
import {useSelector, useDispatch} from 'react-redux';
import {GamerAppReduxStore} from 'src/Store';
import {
  clearApprovalUrl,
  getAccessToken,
  paypalPayment,
  paypalPaymentExecute,
} from 'src/Store/Ducks/paypalDuck';
import {selectCartAmount, selectCartItensAsPaymentRequestItens, myOrderAddNew} from 'src/Store/Ducks/cartDuck';
import { MyOrderAddNewRequest } from 'src/Models/MyOrder';
import { selectUserMainAddress } from 'src/Store/Ducks/user';
import GamerPayPrePayPal from '../GamerPayPrePayPal';

const {height, width} = Dimensions.get('screen');

const PayPal: React.FC = () => {
  const {cart, paypal, user} = useSelector((state: GamerAppReduxStore) => state);

  const { items: cartItems, paymentMethod, selectedShippingOption, store } = cart;  
  const {approvalUrl, bearerToken, executePaymentResponse} = paypal;

  const cartAmount = selectCartAmount(cart);
  const items = selectCartItensAsPaymentRequestItens(cart);
  
  const { gamerId } = user.user;
  
  const address = selectUserMainAddress(user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccessToken({}));
  }, [dispatch]);

  useEffect(() => {
    if (bearerToken) {
      const {details, total: price} = cartAmount;

      dispatch(
        paypalPayment({
          intent: 'sale',
          payer: {
            payment_method: paymentMethod,
          },
          redirect_urls: {
            return_url: 'http://gamerapp.com.br/pedido_concluido/',
            cancel_url: 'http://gamerapp.com.br/pedido_concluido/',
          },
          transactions: [
            {
              item_list: {
                items,
              },
              amount: {
                total: price.toString(),
                currency: 'BRL',
                details: {
                  subtotal: details.subtotal.toString(),
                  tax: '0',
                  shipping: details.shipping?.toString() || '0',
                  handling_fee: '0',
                  shipping_discount: details.shipping_discount?.toString() || '0',
                  insurance: '0',
                },
              },
            },
          ],
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bearerToken, dispatch]);

  useEffect(() => {
    if (executePaymentResponse.id) {
      const data: MyOrderAddNewRequest = {
        addressId: address?.id || "",
        gamerId,
        postOfficeServiceId: selectedShippingOption.postOfficeServiceId,
        products: cartItems.map(item => ({
          price: item.price.current,
          productCatalogId: item.id,
          quantity: item.quantity,
        })),
        storeId: store.id,
        paypalExecutePayment: JSON.stringify(executePaymentResponse),
        paypalId: executePaymentResponse.id,
        shippingPrice: selectedShippingOption.shippingValue,
        couponId: cart.selectedCoupon.id,
      };

      dispatch(myOrderAddNew(data));
    }
  }, [executePaymentResponse.id]);
  
  const _onNavigationStateChange = (webViewState: WebViewNavigation) => {
    if (webViewState.url.includes('http://gamerapp.com.br/pedido_concluido/')) {
      dispatch(clearApprovalUrl());

      let splited = webViewState.url.split('paymentId=')[1].split('&token=');
      
      const paymentId = splited[0];
      
      splited = splited[1].split('&PayerID=');
      const PayerID = splited[1];

      dispatch(paypalPaymentExecute({payer_id: PayerID}, paymentId));
    }
  };

  return (
    <View style={styles.container}>
      {approvalUrl ? (
        <WebView
          domStorageEnabled={true}
          javaScriptEnabled={true}
          onNavigationStateChange={_onNavigationStateChange}
          source={{uri: approvalUrl}}
          startInLoadingState={true}
          style={styles.webView}
        />
      ) : (
        <GamerPayPrePayPal />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    minHeight: height,
    width,
  },
});

export default PayPal;
