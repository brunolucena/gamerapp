import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import WithTap from 'src/Components/WithTap';
import {GamerAppReduxStore} from 'src/Store';
import {Image, View} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Avatar from 'src/Components/Avatar';
import {selectUserFullName} from 'src/Store/Ducks/user';

const TopBar: React.FC = () => {
  const navigation = useNavigation();
  const {user} = useSelector((state: GamerAppReduxStore) => state);

  const {imageUrl: userImageUrl} = user.user;

  function handleNavigateProfile() {
    navigation.navigate('Profile');
  }

  function handleNavigateStorybook() {
    navigation.navigate('Storybook');
  }

  function handlePressTrophy() {
    navigation.navigate('Ranking', {screen: 'RankingList'});
  }

  return (
    <View centerV paddingH-15 paddingV-10 row spread style={styles.container}>
      <TouchableOpacity onPress={handleNavigateProfile}>
        <Avatar
          backgroundColor="#f3f2f2"
          imageProps={{
            resizeMode: 'contain',
          }}
          imageSource={
            userImageUrl
              ? {uri: userImageUrl}
              : require('../../../Assets/images/home/profile.png')
          }
          name={selectUserFullName(user.user)}
          size={36}
        />
      </TouchableOpacity>

      <WithTap onTimesPressedFinish={handleNavigateStorybook}>
        <Image
          resizeMode="contain"
          source={require('../../../Assets/images/logo/logo-green.png')}
          style={styles.logo}
        />
      </WithTap>

      <View>
        <TouchableOpacity onPress={handlePressTrophy}>
          <View>
            <Icon color="#ffb023" name="ios-trophy" size={30} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  logo: {
    height: 22,
  },
});

export default TopBar;
