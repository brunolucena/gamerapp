import React from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker, {Image, Options} from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';

import { getBase64FormatedString } from 'src/Helpers/functions';

import {GamerAppReduxStore} from 'src/Store';
import {logout, setProfilePicture} from 'src/Store/Ducks/user';
import CustomActivityIndicator from 'src/Components/CustomActivityIndicator';
import MyListItem from 'src/Components/MyListItem';

import {
  ProfileSafeAreaView,
  ProfileScrollView,
  Spacing,
  TrophyContainer,
  TrophyText,
} from './ProfileStyles';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userRedux = useSelector((state: GamerAppReduxStore) => state.user);

  const {loading, user} = userRedux;

  const handleLogout = () => {
    dispatch(logout());
  };

  const renderRightElement = () => {
    return (
      <TrophyContainer>
        <Icon color="#ffb023" name="ios-trophy" size={40} />

        <TrophyText>#{user.gamerRankingPosition}</TrophyText>
      </TrophyContainer>
    );
  };

  function handleNavigateEditProfile() {
    navigation.navigate('EditProfile');
  }

  function handleNavigateShare() {
    navigation.navigate('Share');
  }

  function handleNavigateProfileAddresses() {
    navigation.navigate('ProfileAddresses');
  }

  function handleNavigateWallet() {
    navigation.navigate('Wallet');
  }

  function handleNavigateCupons() {
    navigation.navigate('CouponsList');
  }

  function handleNavigateMyOrders() {
    navigation.navigate('MyOrders');
  }

  function handlePressImage() {
      ImagePicker.openPicker({
        compressImageMaxWidth: 300,
        compressImageQuality: 0.5,
        cropperCircleOverlay: true,
        cropping: true,
        height: 100,
        includeBase64: true,
        width: 100,
      })
        .then(response => {
          let images = [];
  
          // Coloca no images as imagens sempre em formato de array
          if (!Array.isArray(response)) {
            images.push(response);
          } else {
            images = response;
          }
  
          const image = images[0];

          if (image?.data) {
            dispatch(setProfilePicture({
              imageBase64: getBase64FormatedString(image.data),
              gamerId: user.gamerId,
            }))
          }
        })
        .catch(error => {
          // Usuário cancelou ou aconteceu algum erro
        });
  }

  return (
    <ProfileSafeAreaView>
      <ProfileScrollView>
        <MyListItem
          leftAvatar={{uri: user.imageUrl}}
          leftAvatarIcon
          onPress={handleNavigateEditProfile}
          onPressImage={handlePressImage}
          rightIcon={renderRightElement()}
          subtitle="Editar perfil"
          title={`${user.firstName} ${user.lastName}`}
        />

        <MyListItem
          leftAvatar={require('../../Assets/images/profile/gift.png')}
          leftAvatarContainerStyle={styles.avatarContainer}
          leftAvatarStyle={styles.avatar}
          title="Ganhe 150 pontos indicando "
          titleStyle={styles.titleStyle}
          subtitle="Convide os seus amigos!"
          onPress={handleNavigateShare}
        />

        <MyListItem
          leftAvatarContainerStyle={styles.avatarContainer}
          leftAvatarStyle={styles.avatar}
          leftAvatar={require('../../Assets/images/profile/localization.png')}
          title="Endereços"
          titleStyle={styles.titleStyle}
          subtitle="Meus endereços de entrega"
          onPress={handleNavigateProfileAddresses}
        />

        <MyListItem
          leftAvatarContainerStyle={styles.avatarContainer}
          leftAvatarStyle={styles.avatar}
          leftAvatar={require('../../Assets/images/profile/wallet.png')}
          title="Carteira"
          titleStyle={styles.titleStyle}
          subtitle="Meus pontos e saldo  "
          onPress={handleNavigateWallet}
        />

        <MyListItem
          leftAvatarContainerStyle={styles.avatarContainer}
          leftAvatarStyle={{...styles.avatar, ...styles.coupon}}
          leftAvatar={require('../../Assets/images/profile/coupon.png')}
          title="Cupons"
          titleStyle={styles.titleStyle}
          subtitle="Meus cupons de desconto"
          onPress={handleNavigateCupons}
        />

        <MyListItem
          leftAvatarContainerStyle={styles.avatarContainer}
          leftAvatarStyle={styles.avatar}
          leftAvatar={require('../../Assets/images/profile/myorders.png')}
          title="Minhas compras"
          titleStyle={styles.titleStyle}
          subtitle="Acompanhe suas compras"
          onPress={handleNavigateMyOrders}
        />

        <Spacing />

        <MyListItem
          leftAvatarContainerStyle={styles.avatarContainer}
          leftAvatarStyle={[styles.avatar, styles.avatarSmall]}
          leftAvatar={require('../../Assets/images/profile/logout.png')}
          title="Sair"
          onPress={handleLogout}
        />
      </ProfileScrollView>

      <CustomActivityIndicator isVisible={loading} />
    </ProfileSafeAreaView>
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 0,
    height: 25,
    width: 25,
  },
  avatarContainer: {
    backgroundColor: 'transparent',
  },
  avatarSmall: {
    height: 20,
    width: 20,
    marginLeft: 5,
  },
  coupon: {
    marginTop: 5,
    transform: [
      {
        rotate: "-45deg",
      }
    ],
  },
  titleStyle: {
    fontSize: 16,
  },
});

export default Profile;
