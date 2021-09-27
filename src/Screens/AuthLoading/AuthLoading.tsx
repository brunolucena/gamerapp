import React from 'react';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, View} from 'react-native';

import {GamerAppReduxStore} from '../../Models/Redux';
import {InjectedNavigation} from '../../Models/Utils';

import CustomActivityIndicator from '../../Components/CustomActivityIndicator';

const AuthLoading = ({navigation}: InjectedNavigation) => {
  const userRedux = useSelector((state: GamerAppReduxStore) => state.user);

  useEffect(() => {
    const {token, tutorialDone} = userRedux;
    let toRoute = 'Tutorial';

    if (tutorialDone) {
      toRoute = 'Login';
    }

    if (token) {
      toRoute = 'App';
    }

    // navigation.navigate('Storybook');
    navigation.navigate(toRoute);
  }, []);

  return (
    <View style={styles.container}>
      <CustomActivityIndicator animating={true} size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthLoading;
