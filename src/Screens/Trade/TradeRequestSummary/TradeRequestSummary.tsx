import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Image, View, Avatar} from 'react-native-ui-lib';
import MyButton from 'src/Components/Button';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';

import splitFirstName from '../../../Helpers/splitFirstName';

import {GamerAppReduxStore} from 'src/Store';
import {MyColors} from 'src/Theme/FoundationConfig';
import {tradeIsValid} from 'src/Store/reduxHelpers';
import {
  selectTradeItems,
  selectTradePart,
  setIsModalDeclinedOpened,
} from 'src/Store/Ducks/tradeActive';
import {
  changeTradeRequestStatus,
  getTradeRequestDetails,
  saveTradeRequest,
} from 'src/Store/Ducks/tradeRequestDetails';

import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';
import SummaryPart from './SummaryPart/SummaryPart';

import {
  Confirm,
  ConfirmText,
  ConfirmTrade,
  ConfirmTradeText,
  Divisor,
  DivisorText,
  FullWidth,
  SummaryBottom,
  SummaryContainer,
  SummaryContent,
  SummarySafeAreaView,
} from './TradeRequestSummaryStyles';
import {SaveTradeRequestRequest} from 'src/Models/TradeRequest';

function TradeRequestSummary() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {tradeActive, tradeRequestDetails, user: userRedux} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {hasChanges, isModalDeclineOpened} = tradeActive;

  const loading = tradeActive.loading || tradeRequestDetails.loading;
  const isValid = tradeIsValid(tradeActive);
  const user = userRedux.user;

  const {gamerId} = user;

  const me = selectTradePart({state: tradeActive, gamerId, part: 'me'});
  const myGames = selectTradeItems({state: tradeActive, gamerId, part: 'me'});
  const other = selectTradePart({state: tradeActive, gamerId, part: 'other'});
  const otherGames = selectTradeItems({
    state: tradeActive,
    gamerId,
    part: 'other',
  });

  const [acceptTradeOpened, setAcceptTradeOpened] = useState(false);
  const [confirmTradeOpened, setConfirmTradeOpened] = useState(false);

  const isNewTradeRequest =
    hasChanges || !tradeActive.activeTradeData.tradeRequestId;

  const {
    autoTradeId,
    fromGamerId,
    selectedGamerProductCatalogId,
    toGamerId,
    tradeRequestId,
  } = tradeActive.activeTradeData;

  useEffect(() => {
    dispatch(
      getTradeRequestDetails({
        AutoTradeId: autoTradeId,
        FromGamerId: fromGamerId,
        ToGamerId: toGamerId,
        TradeRequestId: tradeRequestId,
        SelectedGamerProductCatalogId: selectedGamerProductCatalogId,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function sendNewTradeRequest() {
    setConfirmTradeOpened(false);

    const myGamesRequest: string[] = myGames
      .filter(game => game.selected)
      .map(game => game.productCatalogId);
    const otherGamesRequest: string[] = otherGames
      .filter(game => game.selected)
      .map(game => game.productCatalogId);

    const data: SaveTradeRequestRequest = {
      GamerId: me.gamerId,
      GamerParts: [
        {
          GamerId: me.gamerId,
          OfferedPrice: me.offeredPrice,
        },
        {
          GamerId: other.gamerId,
          OfferedPrice: other.offeredPrice,
        },
      ],
      GamerProductCatalogIds: [...myGamesRequest, ...otherGamesRequest],
      TradeRequestId: tradeActive.activeTradeData.tradeRequestId || '',
      RootTradeId: tradeActive.tradeDetails.rootTradeId || '',
      AutoTradeId: tradeActive.activeTradeData.autoTradeId || '',
    };

    dispatch(saveTradeRequest(data));
  }

  function handleAcceptTradeRequest() {
    setAcceptTradeOpened(false);
    dispatch(
      changeTradeRequestStatus({
        gamerId,
        status: 1,
        tradeRequestId: tradeActive.activeTradeData.tradeRequestId || '',
      }),
    );
  }

  function handleDeclineTradeRequest() {
    dispatch(setIsModalDeclinedOpened(false));
    dispatch(
      changeTradeRequestStatus({
        gamerId,
        status: 2,
        tradeRequestId: tradeActive.activeTradeData.tradeRequestId || '',
      }),
    );
  }

  function navigateTradeRequestOtherPart() {
    navigation.navigate('TradeRequestOtherPart');
  }

  function navigateTradeRequestMe() {
    navigation.navigate('TradeRequestMe');
  }

  function handleConfirmOpen() {
    setConfirmTradeOpened(true);
  }

  function handleConfirmClose() {
    setConfirmTradeOpened(false);
  }

  function handleAcceptOpen() {
    setAcceptTradeOpened(true);
  }

  function handleAcceptClose() {
    setAcceptTradeOpened(false);
  }

  function handleModalDeclineClose() {
    dispatch(setIsModalDeclinedOpened(false));
  }

  return (
    <SummarySafeAreaView>
      <SummaryContainer>
        <SummaryContent>
          <SummaryPart
            avatar={{uri: other.imageUrl}}
            backgroundColor={MyColors.secondary || '#ffffff'}
            items={otherGames}
            part={other}
            seeAll={navigateTradeRequestOtherPart}
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
            backgroundColor={MyColors.primary || '#ffffff'}
            items={myGames}
            part={me}
            seeAll={navigateTradeRequestMe}
          />
        </SummaryContent>

        <SummaryBottom>
          {isNewTradeRequest ? (
            <MyButton
              disabled={loading}
              label="Enviar nova proposta"
              onPress={handleConfirmOpen}
              fullWidth
            />
          ) : me.starter ? (
            <MyButton disabled={true} label="Aguardando aceite" fullWidth />
          ) : (
            <MyButton
              disabled={loading}
              label="Aceitar proposta"
              onPress={handleAcceptOpen}
              fullWidth
            />
          )}
        </SummaryBottom>

        <CustomActivityIndicator isVisible={loading} />
      </SummaryContainer>

      <Modal
        isVisible={isModalDeclineOpened}
        onBackdropPress={handleModalDeclineClose}>
        <Confirm>
          <ConfirmText>Recusar proposta!</ConfirmText>

          <ConfirmTrade>
            <View row centerV marginR-10>
              <Avatar
                imageProps={{resizeMode: 'contain', source: {uri: me.imageUrl}}}
                imageSource={{uri: me.imageUrl}}
                size={30}
              />

              <ConfirmTradeText>
                {splitFirstName(me.gamerName)}
              </ConfirmTradeText>
            </View>

            <View>
              <Image
                source={require('../../../Assets/images/trade/confirm.png')}
              />
            </View>

            <View row centerV marginL-10>
              <Avatar
                imageProps={{
                  resizeMode: 'contain',
                  source: {uri: other.imageUrl},
                }}
                imageSource={{uri: other.imageUrl}}
                size={30}
              />

              <ConfirmTradeText>
                {splitFirstName(other.gamerName)}
              </ConfirmTradeText>
            </View>
          </ConfirmTrade>

          <FullWidth>
            <MyButton
              disabled={loading}
              label="Recusar"
              onPress={handleDeclineTradeRequest}
              type="error"
              size="medium"
            />
          </FullWidth>
        </Confirm>
      </Modal>

      <Modal isVisible={acceptTradeOpened} onBackdropPress={handleAcceptClose}>
        <Confirm>
          <ConfirmText>Aceitar proposta!</ConfirmText>

          <ConfirmTrade>
            <View row centerV marginR-10>
              <Avatar
                imageProps={{resizeMode: 'contain', source: {uri: me.imageUrl}}}
                imageSource={{uri: me.imageUrl}}
                size={30}
              />

              <ConfirmTradeText>
                {splitFirstName(me.gamerName)}
              </ConfirmTradeText>
            </View>

            <Image
              source={require('../../../Assets/images/trade/confirm.png')}
            />

            <View row centerV marginL-10>
              <Avatar
                imageProps={{
                  resizeMode: 'contain',
                  source: {uri: other.imageUrl},
                }}
                imageSource={{uri: other.imageUrl}}
                size={30}
              />

              <ConfirmTradeText>
                {splitFirstName(other.gamerName)}
              </ConfirmTradeText>
            </View>
          </ConfirmTrade>

          <FullWidth>
            <MyButton
              disabled={!isValid}
              onPress={handleAcceptTradeRequest}
              label="Aceitar"
            />
          </FullWidth>
        </Confirm>
      </Modal>

      <Modal
        isVisible={confirmTradeOpened}
        onBackdropPress={handleConfirmClose}>
        <Confirm>
          <ConfirmText>Confirme o envio da proposta de troca</ConfirmText>

          <ConfirmTrade>
            <View row centerV marginR-10>
              <Avatar
                imageProps={{resizeMode: 'contain', source: {uri: me.imageUrl}}}
                imageSource={{uri: me.imageUrl}}
                size={30}
              />

              <ConfirmTradeText>
                {splitFirstName(me.gamerName)}
              </ConfirmTradeText>
            </View>

            <Image
              source={require('../../../Assets/images/trade/confirm.png')}
            />

            <View row centerV marginL-15>
              <Avatar
                imageProps={{
                  resizeMode: 'contain',
                  source: {uri: other.imageUrl},
                }}
                imageSource={{uri: other.imageUrl}}
                size={30}
              />

              <ConfirmTradeText>
                {splitFirstName(other.gamerName)}
              </ConfirmTradeText>
            </View>
          </ConfirmTrade>

          <FullWidth>
            <MyButton
              disabled={!isValid}
              onPress={sendNewTradeRequest}
              label="Confirmar"
            />
          </FullWidth>
        </Confirm>
      </Modal>
    </SummarySafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: '35%',
  },
});

export default TradeRequestSummary;
