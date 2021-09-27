import React, {useState} from 'react';
import {
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {EditProfileRequest} from '../../../Models/User';
import {editProfile} from 'src/Store/Ducks/user';

import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';
import EditProfileListItem from './EditProfileListItem/EditProfileListItem';

import {
  EditProfileSafeAreaView,
  EditProfileScrollView,
} from './EditProfileStyles';
import {useNavigation} from '@react-navigation/native';
import {GamerAppReduxStore} from 'src/Store';
import MyListItem from 'src/Components/MyListItem';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userRedux = useSelector((state: GamerAppReduxStore) => state.user);

  const {loading, user} = userRedux;

  const {
    cpf: userCpf,
    email: userEmail,
    firstName: name,
    gamerId,
    lastName,
    phoneNumber: userPhoneNumber,
  } = user;

  const [cpf, setCpf] = useState(userCpf);
  const [email, setEmail] = useState(userEmail);
  const [fullName, setFullName] = useState(`${name} ${lastName}`);
  const [phoneNumber, setPhoneNumber] = useState(userPhoneNumber);

  const handleOnSubmitEditing = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
    label: string,
  ) => {
    const {text} = e.nativeEvent;

    const data: EditProfileRequest = {
      documentCpf: '',
      email: '',
      gamerId,
      fullName: '',
      phoneNumber: '',
    };

    switch (label) {
      case 'CPF':
        data.documentCpf = text;
        break;

      case 'Nome Completo':
        data.fullName = text;

        break;

      case 'Telefone':
        data.phoneNumber = text;
        break;

      case 'E-mail':
        data.email = text;
        break;

      default:
        break;
    }

    dispatch(editProfile(data));
  };

  function handleNavigateChangePassword() {
    navigation.navigate('ChangePassword');
  }

  return (
    <EditProfileSafeAreaView>
      <EditProfileScrollView>
        <EditProfileListItem
          autoCompleteType="name"
          fieldName="fullName"
          handleOnSubmitEditing={handleOnSubmitEditing}
          key="nome-completo"
          label="Nome Completo"
          onChangeText={setFullName}
          textContentType="name"
          value={fullName}
        />

        <EditProfileListItem
          autoCompleteType="tel"
          fieldName="phoneNumber"
          handleOnSubmitEditing={handleOnSubmitEditing}
          key="telefone"
          keyboardType="phone-pad"
          label="Telefone"
          maxLength={15}
          onChangeText={setPhoneNumber}
          textContentType="telephoneNumber"
          value={phoneNumber}
        />

        <EditProfileListItem
          fieldName="cpf"
          handleOnSubmitEditing={handleOnSubmitEditing}
          key="cpf"
          keyboardType="number-pad"
          label="CPF"
          maxLength={14}
          onChangeText={setCpf}
          value={cpf}
        />

        <EditProfileListItem
          disabled
          fieldName="email"
          handleOnSubmitEditing={handleOnSubmitEditing}
          hideChevron
          key="email"
          label="E-mail"
          onChangeText={setEmail}
          value={email}
        />

        <MyListItem
          onPress={handleNavigateChangePassword}
          subtitle="******"
          title="Alterar senha"
          titleStyle={styles.titleStyle}
        />
      </EditProfileScrollView>

      <CustomActivityIndicator isVisible={loading} />
    </EditProfileSafeAreaView>
  );
};
const styles = StyleSheet.create({
  titleStyle: {
    color: '#2b2b2b',
    fontWeight: '400',
    fontSize: 15,
    marginBottom: 6,
  },
});

export default EditProfile;
