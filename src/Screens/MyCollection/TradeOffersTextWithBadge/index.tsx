import React, {useEffect} from 'react';
import {} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {GamerAppReduxStore} from '../../../Models/Redux';
import {listRepos} from 'src/Store/Ducks/testRepos';

import TextWithBadge from '../../../Components/TextWithBadge';

interface Props {
  color: string | undefined;
  text: string;
}

function TradeOffersTextWithBadge(props: Props) {
  const dispatch = useDispatch();
  const testRepos = useSelector((state: GamerAppReduxStore) => state.testRepos);

  // useEffect(() => {
  //   dispatch(listRepos('Bruno'));
  // }, []);

  return <TextWithBadge {...props} badgeCount={testRepos.repos.length} />;
}

export default TradeOffersTextWithBadge;
