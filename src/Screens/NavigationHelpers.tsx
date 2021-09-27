import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import MyButton from 'src/Components/Button';
import {MyColors} from 'src/Theme/FoundationConfig';
import {View} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import MyTextField from 'src/Components/TextField';
import {AddProductFrom} from 'src/Models/Seller';
import {NavigationProp, NavigationState} from '@react-navigation/native';

export const defaultHeader = (
  navigation: NavigationProp<
    Record<string, object | undefined>,
    string,
    NavigationState,
    {},
    {}
  >,
  headerTitle: string,
  style = 'white',
  goBack?: any,
) => {
  function handleGoBack() {
    if (goBack) {
      navigation.navigate(goBack);
    } else {
      navigation.goBack();
    }
  }

  const renderBackButton = () => {
    return (
      <MyButton
        label=""
        round
        backgroundColor="transparent"
        onPress={handleGoBack}>
        <Icon name="md-arrow-back" color={MyColors.primary} size={24} />
      </MyButton>
    );
  };

  return {
    headerLeft: () => renderBackButton(),
    headerTitle,
    headerStyle: {
      elevation: 0, // for android
      shadowOpacity: 0, // for ios
      borderBottomWidth: 0, // for ios
      ...(style === 'gray' && {
        backgroundColor: '#f2f2f2',
      }),
    },
  };
};

export const headerWithSearch = (data: {
  addProductFrom: AddProductFrom;
  goBack?: any;
  handleSearch: () => any;
  navigation: any;
  onChangeText: (search: string) => any;
  search: string;
}) => {
  const {
    addProductFrom,
    goBack,
    handleSearch,
    navigation,
    onChangeText,
    search,
  } = data;

  function handleGoBack() {
    if (goBack) {
      navigation.navigate(goBack);
    } else {
      navigation.goBack();
    }
  }

  const renderBackButton = () => {
    return (
      <Icon
        name="md-arrow-back"
        color={MyColors.primary}
        size={24}
        onPress={handleGoBack}
      />
    );
  };

  function renderSearchBar() {
    return (
      <MyTextField
        containerStyle={styles.container}
        handleChangeText={onChangeText}
        hideUnderline
        onBlur={handleSearch}
        placeholder={
          addProductFrom === 'collection'
            ? 'Busque na sua coleção'
            : 'Pesquisar'
        }
        style={styles.style}
        title=""
        value={search}
      />
    );
  }

  const header = () => {
    return (
      <View centerV row style={styles.headerStyle} paddingH-20>
        {renderBackButton()}
        {renderSearchBar()}
      </View>
    );
  };

  return {
    header: () => header(),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginLeft: 20,
    paddingTop: 36,
  },
  headerStyle: {
    backgroundColor: '#ffffff',
    elevation: 0, // for android
    shadowOpacity: 0, // for ios
    borderBottomWidth: 0, // for ios
  },
  style: {
    alignItems: 'center',
    paddingBottom: 0,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
