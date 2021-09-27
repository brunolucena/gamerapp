import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, NativeSyntheticEvent, TextInputSubmitEditingEventData} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RadioButton, RadioGroup, Text, View, Image, Picker} from 'react-native-ui-lib';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';

import MyButton from 'src/Components/Button';
import MyListItem from 'src/Components/MyListItem';
import StoreCard from 'src/Components/StoreCard';
import {MyColors} from 'src/Theme/FoundationConfig';
import {formatCurrency} from 'src/Helpers/formatCurrency';
import {useDispatch, useSelector} from 'react-redux';
import {GamerAppReduxStore} from 'src/Store';
import { selectUserMainAddress, editProfile } from 'src/Store/Ducks/user';
import formatAddress from 'src/Helpers/formatAddress';
import { selectCartAmount, removeItem, getPostOfficeShipping, setCartData } from 'src/Store/Ducks/cartDuck';
import { setActiveSellerId } from 'src/Store/Ducks/sellerDucks';
import EditProfileListItem from 'src/Screens/Profile/EditProfile/EditProfileListItem/EditProfileListItem';
import { EditProfileRequest } from 'src/Models/User';
import { getCouponList } from 'src/Store/Ducks/couponDuck';

function OrderRequest() {
  const [modalDetailsOpened, setModalDetailsOpened] = useState({activeProductId: '', opened: false});
  const [modalConfirmOpened, setModalConfirmOpened] = useState(false);
  
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  const {cart, coupon, user} = useSelector(
    (state: GamerAppReduxStore) => state,
    );
    
  const { cpf: cpfUser, gamerId } = user.user;
  const { coupoms, loading: loadingCoupons, selectedCoupon } = coupon;  
  
  const hasCoupom = !!selectedCoupon.id;
    
  const [cpf, setCpf] = useState(cpfUser);

  const {items, loadingShippingOptions, paymentMethod, selectedShippingOption, shippingOptions, store} = cart;
  const address = selectUserMainAddress(user);
  
  const price = selectCartAmount(cart);

  useEffect(() => {
    if (address && store && cart.items.length > 0) {
      dispatch(getPostOfficeShipping({
        fromZipCode: address.cep,
        productIds: items.map(item => item.productId),
        toZipCode: store.zipCode,
      }));
    }
  }, [address, dispatch, store, cart.items]);

  useEffect(() => {
    dispatch(getCouponList({gamerId}));
  }, []);

  function handleAdicionarMaisItens() {
    dispatch(setActiveSellerId(cart.activeStoreId));

    navigation.navigate('SellerStoreSee');
  }

  function handleNavigatePerfil() {
    navigation.navigate('GamerProduct', {screen: 'GamerProductSeller'});
  }
  
  function handleOnSubmitEditing(
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
    label: string,
  ) {
    const {text} = e.nativeEvent;

    const data: EditProfileRequest = {
      documentCpf: text,
      gamerId,
      fullName: '',
      phoneNumber: '',
    };

    dispatch(editProfile(data));
  };

  function handleQuestionPress() {
    //
  }

  function isValid() {
    let isValid = true;

    if (cart.items.length === 0) {
      isValid = false;
    } else if (!address) {
      isValid = false;
    } else if (!cpfUser || !cpf) {
      isValid = false;
    } else if (loadingShippingOptions) {
      isValid = false;
    } else if (!selectedShippingOption.postOfficeServiceId) {
      isValid = false;
    } else if (price.details.subtotal < store.orderMinimumValue) {
      isValid = false;
    }

    return isValid;
  }

  const valid = isValid();

  function renderButton() {
    function openModal() {
      setModalConfirmOpened(true);
    }

    return (
      <View padding-10>
        <MyButton
          disabled={!valid}
          label="Comprar"
          type="secondary"
          onPress={handleConfirm}
        />
      </View>
    );
  }

  function renderCpf() {
    return (
      <View marginT-10 paddingH-5>
        <EditProfileListItem
          containerStyle={styles.containerStyle}
          fieldName="cpf"
          handleOnSubmitEditing={handleOnSubmitEditing}
          isCard
          key="cpf"
          keyboardType="number-pad"
          label="Insira seu CPF"
          maxLength={14}
          onChangeText={setCpf}
          title="CPF"
          value={cpf}
        />
      </View>
    )
  }

  const [paymentInstallments, setPaymentInstallments] = useState('1');

  function renderCoupon() {
    function handlePressCupon() {
      navigation.navigate('CouponsList');
    }

    /**
     * Se tiver um cupom selecionado, exibe o cupom, se não 
     * exibe a quantidade de cupons disponíveis ou carregando.
     */
    function getSubtitle(): string {
      let subtitle = '';

      if (hasCoupom) {
        subtitle = 'Cupom aplicado';
      } else if (loadingCoupons) {
        subtitle = 'Carregando';
      } else {
        if (coupoms.length === 1) {
          subtitle = `${coupoms.length} disponível`;
        } else {
          subtitle = `${coupoms.length} disponíveis`
        }
      }

      return subtitle;
    }

    /**
     * Exibe o cupom selecionado ou texto Cupoms
     */
    function getTitle(): string {
      let title = 'Cupom';

      if (hasCoupom) {
        title = selectedCoupon.title;
      }

      return title;
    }

    return (
      <View marginV-15>
        <MyListItem
          arrowColor={MyColors.secondary}
          leftAvatar={require('../../../Assets/images/coupon.png')}
          leftAvatarRound={false}
          onPress={handlePressCupon}
          title={getTitle()}
          titleStyle={styles.titleStyle}
          subtitle={getSubtitle()}
        />
      </View>
    );
  }

  function renderErrors() {
    return !valid && (
      <View marginT-20 paddingH-20>
        {price.details.subtotal < store.orderMinimumValue ?
          <Text red20>*O pedido mínimo para esta loja é {formatCurrency(store.orderMinimumValue)}</Text>
          :
          <Text red20>*Preencha todos os campos</Text>
        } 
      </View>
    )
  }

  function handleNavigatePaymentMethods() {
    navigation.navigate('PaymentMethods');
  }

  function renderPagamentoCredito(number: string, flag: string) {
    return (
      <MyListItem
        arrowColor={MyColors.secondary}
        leftAvatar={require('../../../Assets/images/wallet.png')}
        leftAvatarRound={false}
        leftAvatarStyle={styles.wallet}
        onPress={handleNavigatePaymentMethods}
        title="Cartão de Crédito"
        titleStyle={styles.titleStyle}
        subtitle={`${flag} ${number}`}
      />
    );
  }

  function renderPagamentoEmtpy() {
    return (
      <MyListItem
        arrowColor={MyColors.secondary}
        leftAvatar={require('../../../Assets/images/wallet.png')}
        leftAvatarRound={false}
        leftAvatarStyle={styles.wallet}
        onPress={handleNavigatePaymentMethods}
        title="Adicione Pagamento"
        titleStyle={styles.titleStyle}
        subtitle="Cartão de crédito ou PayPal"
      />
    );
  }
  
  function renderPayPal() {
    const selected = false;
    
    function renderPayPalImage() {
      return (
        <Image
          source={require('../../../Assets/images/paypal.png')}
          style={styles.paypal}
        />
      );
    }

    function renderLeftElement() {
      return (
        <View row spread centerV marginR-10 paddingV-10>
          <View>
            {renderPayPalImage()}
            {/* <Text dark30>rafxxxx@gxxx.br</Text> */}
          </View>

          {selected && (
            <View>
              <Text color={MyColors.secondary}>Padrão</Text>
            </View>
          )}
        </View>
      );
    }

    return (
      <MyListItem
        containerStyle={styles.itemContainer}
        leftElement={renderLeftElement()}
        onPress={handleNavigatePaymentMethods}
        title=""
      />
    );
  }

  function renderPaymentInstallments() {
    function handleChangeInstallments(installments: string) {
      setPaymentInstallments(installments);
    }

    return (
      <View>
        <RadioGroup
          initialValue={paymentInstallments}
          value={paymentInstallments}>
          <View marginT-1 paddingH-15 row centerV bg-white>
            <View>
              <RadioButton
                // @ts-ignore
                color={MyColors.secondary}
                value="1"
                onPress={() => handleChangeInstallments('1')}
              />
            </View>

            <TouchableOpacity
              containerStyle={styles.installment}
              onPress={() => handleChangeInstallments('1')}>
              <View marginL-17 paddingV-10>
                <Text dark20>A vista</Text>

                <Text dark50>{formatCurrency(211)} em 1x no cartão</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View marginT-1 paddingV-10 paddingH-15 row centerV bg-white>
            <View>
              <RadioButton
                // @ts-ignore
                color={MyColors.secondary}
                value="2"
                onPress={() => handleChangeInstallments('2')}
              />
            </View>

            <TouchableOpacity
              containerStyle={styles.installment}
              onPress={() => handleChangeInstallments('2')}>
              <View marginL-17>
                <Text dark20>Parcelado</Text>

                <Text dark50>Em até 6x de {formatCurrency(41.21)}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </RadioGroup>
      </View>
    );
  }

  function renderPagamento() {
    function hasPaymentMethods(): boolean {
      return true;
    }

    return (
      <View marginH-5 marginT-17>
        <Text marginL-17 marginB-3 marginB-10 dark20>
          Pagamento
        </Text>

        {hasPaymentMethods() ? (
            paymentMethod === 'paypal' ? renderPayPal() : 
          <>
            {/* {renderPagamentoCredito('XXXX-XXXX-XX1921', 'VISA')}
            {renderPaymentInstallments()} */}
          </>
        ) : (
          renderPagamentoEmtpy()
        )}
      </View>
    );
  }

  function handleNavigationAddresses() {
    navigation.navigate('ProfileAddresses');
  }

  function renderAddress() {
    return (
      <View marginH-5 marginT-5>
        <Text marginL-17 marginB-3 marginV-10 dark20>
          Entregar em
        </Text>

        <MyListItem
          containerStyle={styles.card}
          isCard
          leftAvatar={require('../../../Assets/images/localization.png')}
          leftAvatarRound={false}
          title={!address ? "Selecione um endereço" : formatAddress(address)}
          titleStyle={styles.titleStyle}
          subtitle={address?.tipo}
          subtitleTop
          onPress={handleNavigationAddresses}
        />
      </View>
    );
  }

  function renderSeller() {
    return (
      <View marginH-5 marginB-5>
        <Text marginL-17 marginB-3 marginT-13 dark20>
          Vendedor
        </Text>

        <StoreCard
          actionText="Ver"
          containerStyle={styles.storeCard}
          image={{uri: store.imageUrl}}
          name={store.name}
          stars={store.stars || 0}
          city={store.city}
          state={store.state}
          isCard
          backgroundColor="#ffffff"
          onPress={handleNavigatePerfil}
        />
      </View>
    );
  }

  function renderProduct(
    name: string,
    price: number,
    platform: string,
    id: string,
  ) {
    function handleOpenProductDetails() {
      setModalDetailsOpened({activeProductId: id, opened: true});
    }

    return (
      <View key={id} bg-white paddingV-5 paddingH-20 row spread centerV>
        <View>
          <Text text70>
            {name} {formatCurrency(price)}
          </Text>
          <Text dark40>{platform}</Text>
        </View>

        <View>
          <TouchableOpacity onPress={handleOpenProductDetails}>
            <Icon name="dots-vertical" color={MyColors.primary} size={30} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderProducts() {
    return (
      <View marginT-6>
        <View paddingV-4 bg-white />

        {items.map(item => {
          const {name, price, platform, id} = item;

          return renderProduct(name, price?.current || price?.original, platform, id);
        })}

        <View paddingV-4 bg-white />

        <View bg-white marginV-2>
          <MyButton
            clear
            label="Adicionar mais itens"
            onPress={handleAdicionarMaisItens}
            type="secondary"
            style={styles.button}
          />
        </View>
      </View>
    );
  }

  function renderPrice() {
    function getLabel(): string {  
      return `Selecionar Entrega\n${loadingShippingOptions ? "Carregando..." : `${selectedShippingOption.serviceName} ${selectedShippingOption.shippingDays ? `${selectedShippingOption.shippingDays} dias` : ""}`}`;
    }

    function handleToggle({value}: {value: string}) {
      const shippingOption = shippingOptions.find(s => s.postOfficeServiceId === value);

      if (shippingOption) {
        dispatch(
          setCartData({selectedShippingOption: shippingOption})
        );
      }
    }

    return (
      <View bg-white padding-20>
        <View row spread centerV>
          <Text dark40>Subtotal</Text>
          <Text dark40>{formatCurrency(price.details.subtotal)}</Text>
        </View>

        {hasCoupom &&
          <View row spread centerV marginT-10>
            <Text dark40>Cupom</Text>
            <Text dark40>{formatCurrency(price.discount)}</Text>
          </View>
        }

        <View marginT-10 row>
          <View flex>
            <Picker
              getLabel={getLabel}
              style={{borderBottomWidth: 0, color: MyColors.secondary, fontSize: 15}}
              // @ts-ignore
              onChange={handleToggle}>
              {shippingOptions.map((shippingOption, index) => {
                const { postOfficeServiceId, serviceName, shippingDays, shippingValue } = shippingOption;
                
                return <Picker.Item key={`${serviceName} - ${index}`} label={`${serviceName} / ${shippingDays} dias / ${formatCurrency(shippingValue)}`} value={postOfficeServiceId} />;
              })}
            </Picker>
          </View>

          <View marginL-20 paddingT-3>
            <Text dark40>{formatCurrency(selectedShippingOption.shippingValue)}</Text>
          </View>
        </View>

        <View row spread centerV marginT-10>
          <Text text60>Total</Text>
          <Text dark40>{formatCurrency(price.total)}</Text>
        </View>

        {
          !!price.details.cashback &&

          <View row spread centerV>
            <View row centerV>
              <Text marginR-5 style={styles.textGreen}>
                Cashback GamerPay
              </Text>
              <AntIcon
                name="questioncircle"
                size={16}
                color="#d5d5d5"
                onPress={handleQuestionPress}
              />
            </View>
            <Text style={styles.textGreen}>{formatCurrency(price.details.cashback || 0)}</Text>
          </View>
        }
      </View>
    );
  }

  function handleConfirm() {
    setModalConfirmOpened(false);

    navigation.navigate('PayPal');
  }

  function renderModalConfirm() {
    function handleCloseModal() {
      setModalConfirmOpened(false);
    }

    return (
      <Modal
        style={styles.modalConfirm}
        isVisible={modalConfirmOpened}
        onBackButtonPress={handleCloseModal}
        onBackdropPress={handleCloseModal}>
        <View bg-white style={styles.modalContent}>
          <View centerH marginV-20 paddingH-20>
            <Text text60 dark10>
              Confirme sua compra
            </Text>

            <Text dark30 text70 marginT-10 center>
              Você confirma a compra da Loja The Games Shop
            </Text>
          </View>

          <MyButton
            label="Confirmar"
            type="secondary"
            onPress={handleConfirm}
          />
        </View>
      </Modal>
    );
  }

  function renderModalProductDetails() {
    const product = cart.items.find(item => item.id === modalDetailsOpened.activeProductId);

    function handleCloseModal() {
      setModalDetailsOpened({activeProductId: '', opened: false});
    }

    function handleDeleteProduct() {
      dispatch(removeItem({id: modalDetailsOpened.activeProductId}));
      handleCloseModal();
    }

    return (
      <Modal
        onBackButtonPress={handleCloseModal}
        style={styles.modalConfirm}
        isVisible={modalDetailsOpened.opened}
        onBackdropPress={handleCloseModal}>
        <View bg-white style={styles.modalContent}>
          <View centerH marginV-20 paddingH-20>
            <Text text60 dark10>
              {product?.name}
            </Text>
          </View>


          <View marginB-20>
            <MyButton
              clear
              label="Remover item"
              type="error"
              onPress={handleDeleteProduct}
            />
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <ScrollView>
      {renderAddress()}
      {renderCpf()}
      {renderSeller()}
      {renderProducts()}
      {renderPrice()}
      {renderCoupon()}
      {renderPagamento()}
      {renderErrors()}
      {renderButton()}
      {renderModalConfirm()}
      {renderModalProductDetails()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {paddingVertical: 9},
  card: {paddingHorizontal: 0, paddingVertical: 2},
  containerStyle: {
    paddingHorizontal: 0,
    paddingVertical: 2,
  },
  itemContainer: {
    marginBottom: 1,
    paddingLeft: 15,
    paddingVertical: 5,
  },
  modalContent: {borderTopRightRadius: 40, borderTopLeftRadius: 40},
  installment: {flex: 1},
  modalConfirm: {justifyContent: 'flex-end', margin: 0},
  paypal: {
    height: 22,
    width: 85,
  },
  storeCard: {paddingVertical: 1, paddingHorizontal: 5},
  textGreen: {color: '#42b063'},
  titleStyle: {color: '#383838', fontSize: 15},
  wallet: {width: 35},
});

export default OrderRequest;
