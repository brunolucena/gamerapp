import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';

import {InjectedNavigation} from '../../../Models/Utils';
import {SearchBar} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {GamerAppReduxStore} from '../../../Models/Redux';
import {searchProducts, clearProducts} from 'src/Store/Ducks/searchProducts';

interface Props extends InjectedNavigation {}

function SearchProductSearchBar({navigation}: Props) {
  const searchBar = useRef(null);
  const dispatch = useDispatch();
  const focusSearchBar = useSelector(
    (state: GamerAppReduxStore) => state.searchProductSearchBar.focus,
  );
  const loading = useSelector(
    (state: GamerAppReduxStore) => state.searchProducts.loading,
  );
  const [search, setSearch] = useState('');

  useEffect(() => {
    clear();
  }, []);

  useEffect(() => {
    if (focusSearchBar) {
      searchBar.current.focus();
    }
  }, [focusSearchBar]);

  const productType = navigation.getParam('productType');

  const placeholder = (type: 'game' | 'console' | 'acessory' | 'anything') => {
    switch (type) {
      case 'game':
        return 'Procure pelo seu game';
      case 'console':
        return 'Procure pelo seu console';
      case 'acessory':
        return 'Procure pelo seu acessório';
      case 'anything':
        return 'Pesquisar';
      default:
        return 'Pesquisar';
    }
  };

  const clear = () => {
    setSearch('');
    dispatch(clearProducts());
  };

  const handleSearchProducts = (search: string) => {
    if (search) {
      dispatch(searchProducts(search, productType));
    } else {
      clear();
    }
  };

  const onChangeText = (search: string) => {
    setSearch(search);
    handleSearchProducts(search);
  };

  return (
    <SearchBar
      containerStyle={styles.container}
      inputContainerStyle={styles.inputContainer}
      lightTheme
      onClear={clear}
      onChangeText={onChangeText}
      placeholder={placeholder(productType)}
      ref={searchBar}
      showLoading={loading}
      value={search}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    backgroundColor: '#fff',
  },
});

export default SearchProductSearchBar;
