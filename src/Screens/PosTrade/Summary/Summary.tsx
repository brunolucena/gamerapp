import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Image} from 'react-native-ui-lib';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';

import {TradeDetailsItem} from '../../../Models/Trade';
import {
  getTradeDetails,
  selectPosTradeItems,
  selectPosTradePart,
} from 'src/Store/Ducks/tradeDetails';

import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';
import SummaryPart from './SummaryPart/SummaryPart';

import {
  Divisor,
  DivisorText,
  SummaryContainer,
  SummaryContent,
  SummarySafeAreaView,
  OverlayWrapper,
} from './SummaryStyles';
import GamerAppCard from 'src/Components/GamerAppCard';
import {GamerAppReduxStore} from 'src/Store';
import {MyColors} from 'src/Theme/FoundationConfig';

const {width} = Dimensions.get('window');

let cardWidth = (width - 110) / 3;

if (cardWidth < 120) {
  cardWidth = (width - 55) / 2;
}

interface Props {}

const PosTradeSummary = () => {
  const [activeModalItens, setActiveModalItens] = useState<TradeDetailsItem[]>(
    [],
  );
  const [isModalOpened, setIsModalOpened] = useState(false);

  const dispatch = useDispatch();

  const {tradeDetails, user: userRedux} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {gamerId} = userRedux.user;
  const {activeTradeId, loading} = tradeDetails;

  const me = selectPosTradePart({state: tradeDetails, gamerId, part: 'me'});
  const myGames = selectPosTradeItems({
    state: tradeDetails,
    gamerId,
    part: 'me',
  });
  const other = selectPosTradePart({
    state: tradeDetails,
    gamerId,
    part: 'other',
  });
  const otherGames = selectPosTradeItems({
    state: tradeDetails,
    gamerId,
    part: 'other',
  });

  useEffect(() => {
    dispatch(
      getTradeDetails({
        gamerId,
        tradeId: activeTradeId,
      }),
    );
  }, [activeTradeId, dispatch, gamerId]);

  function _keyExtractor(item: TradeDetailsItem) {
    return `${item.productCatalogId}`;
  }

  function _renderItem({item}: {item: TradeDetailsItem}) {
    return (
      <GamerAppCard
        imageSource={{uri: item.imageUrl}}
        name={item.productName}
      />
    );
  }

  function handleSeeAllOther() {
    setActiveModalItens(otherGames);
    setIsModalOpened(true);
  }

  function handleSeeAllMine() {
    setActiveModalItens(myGames);
    setIsModalOpened(true);
  }

  function handleClose() {
    setIsModalOpened(false);
  }

  return (
    <SummarySafeAreaView>
      <SummaryContainer>
        <SummaryContent>
          <SummaryPart
            avatar={{uri: other.imageUrl}}
            backgroundColor={MyColors.secondary}
            items={otherGames}
            part={other}
            seeAll={handleSeeAllOther}
          />

          <Divisor>
            <Image
              source={require('../../../Assets/images/trade/change.png')}
              style={styles.image}
            />

            <DivisorText>Trade</DivisorText>

            <Image
              source={require('../../../Assets/images/trade/change.png')}
              style={styles.image}
            />
          </Divisor>

          <SummaryPart
            avatar={{uri: me.imageUrl}}
            backgroundColor={MyColors.primary}
            items={myGames}
            part={me}
            seeAll={handleSeeAllMine}
          />
        </SummaryContent>

        <CustomActivityIndicator isVisible={loading} />
      </SummaryContainer>

      <Modal isVisible={isModalOpened} onBackdropPress={handleClose}>
        <OverlayWrapper>
          <FlatList
            contentContainerStyle={styles.flatList}
            data={activeModalItens}
            keyExtractor={_keyExtractor}
            numColumns={cardWidth < 120 ? 3 : 2}
            renderItem={_renderItem}
          />
        </OverlayWrapper>
      </Modal>
    </SummarySafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 15,
    marginHorizontal: 10,
    width: cardWidth,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  container: {
    padding: 10,
  },
  flatList: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 20,
    height: 20,
  },
});

export default PosTradeSummary;
