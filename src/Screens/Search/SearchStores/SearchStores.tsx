import React from 'react';
import {Text} from 'react-native';

import {GamerInfo} from '../../../Models/SearchProducts';

interface Props {
  hasNextPage: boolean;
  nextPage: Function;
  stores: GamerInfo[];
}

function SearchStores(props: Props) {
  return <Text>SearchStores</Text>;
}

export default SearchStores;
