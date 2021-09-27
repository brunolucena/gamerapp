import React from 'react';

import {ForTradeContainer, ForTradeText} from './ForTradeStyles';
import MyListItem from 'src/Components/MyListItem';
import {MyColors} from 'src/Theme/FoundationConfig';

interface Props {
  forTrade: boolean;
  setForTrade: Function;
}

function ForTrade(props: Props) {
  const {forTrade, setForTrade} = props;

  function handleSetForTrade() {
    setForTrade(!forTrade);
  }

  return (
    <ForTradeContainer>
      <MyListItem
        onPress={handleSetForTrade}
        switchProps={{
          onValueChange: handleSetForTrade,
          thumbColor: forTrade ? MyColors.secondary : '#e5e5e5',
          value: forTrade,
        }}
        title="Quero trocar"
      />

      <ForTradeText>
        Ao colocar um item para troca, ele ficará disponível para a rede de
        gamers e você receberá propostas.
      </ForTradeText>
    </ForTradeContainer>
  );
}

export default ForTrade;
