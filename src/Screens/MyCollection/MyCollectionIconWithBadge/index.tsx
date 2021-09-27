import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {GamerAppReduxStore} from '../../../Models/Redux';
import {listRepos} from 'src/Store/Ducks/testRepos';

import IconWithBadge from '../../../Components/IconWithBadge';

interface Props {
  color: string | undefined;
  name: string;
  size: number;
}

function MyCollectionIconWithBadge(props: Props) {
  const dispatch = useDispatch();
  // TODO pegar informação correta da store
  const testRepos = useSelector((state: GamerAppReduxStore) => state.testRepos);

  // useEffect(() => {
  //   // TODO colocar action correta
  //   dispatch(listRepos('Bruno'));
  // }, []);

  return <IconWithBadge {...props} badgeCount={testRepos.repos.length} />;
}

export default MyCollectionIconWithBadge;
