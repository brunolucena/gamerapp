import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import {changeUserMainAddress} from 'src/Store/Ducks/user';

import {Address} from '../../../Models/User';

import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';

import {
  AddressContainer,
  AddressText,
  AddressTextSecondary,
  AddressTop,
  Addresses,
  ButtonContainer,
  MyAddressesSafeAreaView,
  MyAddressesScrollView,
} from './MyAddressesStyles';
import MyButton from 'src/Components/Button';
import {useNavigation} from '@react-navigation/native';
import {GamerAppReduxStore} from 'src/Store';

function MyAdresses() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userRedux = useSelector((state: GamerAppReduxStore) => state.user);

  const {user, loading} = userRedux;

  const {addresses, gamerId} = user;

  const handleChangeUserMainAddress = (addressId: string) => {
    dispatch(changeUserMainAddress({addressId, gamerId}));
  };

  function handleNavigate() {
    navigation.navigate('ProfileNewAddressCep');
  }

  return (
    <MyAddressesSafeAreaView>
      <MyAddressesScrollView>
        <Addresses>
          {addresses.map((address: Address) => {
            const {
              bairro,
              cep,
              complemento,
              id,
              localidade,
              logradouro,
              numero,
              tipo,
              uf,
            } = address;

            const isSelected = user.mainAddressId === id;

            return (
              <TouchableWithoutFeedback
                onPress={() => handleChangeUserMainAddress(id)}>
                <AddressContainer borderWidth={isSelected ? '1px' : '0'}>
                  <AddressTop>
                    <AddressTextSecondary>{tipo}</AddressTextSecondary>

                    {isSelected && (
                      <Icon name="md-checkmark" size={25} color="#1c60d6" />
                    )}
                  </AddressTop>

                  <AddressText>
                    {`${logradouro} ${numero}, ${bairro}, ${
                      complemento ? complemento : ''
                    }`}
                  </AddressText>

                  <AddressText>{`${localidade} - ${uf}, ${cep}`}</AddressText>
                </AddressContainer>
              </TouchableWithoutFeedback>
            );
          })}
        </Addresses>

        <ButtonContainer>
          <MyButton
            clear
            type="secondary"
            label="Cadastrar novo"
            onPress={handleNavigate}
          />
        </ButtonContainer>
      </MyAddressesScrollView>

      <CustomActivityIndicator isVisible={loading} />
    </MyAddressesSafeAreaView>
  );
}

export default MyAdresses;
