import React, {useState, useCallback} from 'react';
import {StyleSheet, RefreshControl, Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import StarRating from 'react-native-star-rating';
import {Image, View} from 'react-native-ui-lib';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import formatDate from '../../../Helpers/formatDate';
import splitFirstName from '../../../Helpers/splitFirstName';

import {
  getTradeDetails,
  selectIsTradeCompleted,
  selectPartDelivery,
  selectPartReceive,
  selectPosTradePart,
  selectTradeDeliveryHistory,
  selectTradeRating,
  setTradeDeliveryStatus,
  setTradeDetailsRefreshing,
  setTradeRating,
} from 'src/Store/Ducks/tradeDetails';

import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';
import ModalConfirmDelivered from './ModalConfirmDelivered/ModalConfirmDelivered';
import ModalConfirmReceived from './ModalConfirmReceived/ModalConfirmReceived';
import ModalUhuu from './ModalUhuu/ModalUhuu';

import {
  ActionsSafeAreaView,
  ActionsScrollView,
  CompletedContainer,
  CompletedContent,
  CompletedGamerName,
  CompletedHeader,
  CompletedHeaderText,
  CompletedText,
  EmptySpace,
  GamerName,
  GamerNameContainer,
  Item,
  ItemLeft,
  ItemRight,
  ItemRightSmallText,
  ItemRightText,
  ItemWrapper,
  ItemWrapper2,
  ItemsContainer,
  ItemsContainer2,
  ProblemContainer,
  StarsContainer,
  StarsContainer2,
  Title,
  TitleContainer,
} from './ActionsStyles';
import { GamerAppReduxStore } from 'src/Store';
import { MyColors } from 'src/Theme/FoundationConfig';
import MyButton from 'src/Components/Button';
import { GAMERAPP_WHATSAPP_URL } from 'src/Helpers/consts';

const PosTradeActions = () => {
  const dispatch = useDispatch();

  const [
    modalConfirmDeliveredOpened,
    setModalConfirmDeliveredOpened,
  ] = useState(false);
  const [modalConfirmReceivedOpened, setModalConfirmReceivedOpened] = useState(
    false,
  );

  const {tradeDetails, user: userRedux} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {activeTradeId, loading, pending, refreshing} = tradeDetails;
  const {gamerId} = userRedux.user;

  const otherPart = selectPosTradePart({
    state: tradeDetails,
    gamerId,
    part: 'other',
  });

  function handleHadAProblem() {
    Linking.openURL(GAMERAPP_WHATSAPP_URL);
  }

  function handleSetTradeRating(rating: number) {
    dispatch(
      setTradeRating({
        gamerId: gamerId,
        tradeId: activeTradeId,
        rating: rating,
      }),
    );
  }

  function handleSetDeliveryStatus(status: 'entregue' | 'recebido') {
    setModalConfirmDeliveredOpened(false);
    setModalConfirmReceivedOpened(false);

    dispatch(
      setTradeDeliveryStatus({
        deliveryStatusId: status === 'entregue' ? 1 : 2,
        gamerId: gamerId,
        tradeId: activeTradeId,
      }),
    );
  }

  const isCompleted = selectIsTradeCompleted(
    tradeDetails.tradeDetails.deliveryHistory,
  );
  const myDeliveryHistory = selectTradeDeliveryHistory(
    tradeDetails,
    gamerId,
    'me',
  );
  const myRating = selectTradeRating(tradeDetails, gamerId, 'me');
  const myConfirmDelivery = selectPartDelivery(myDeliveryHistory);
  const myConfirmReceive = selectPartReceive(myDeliveryHistory);

  const otherDeliveryHistory = selectTradeDeliveryHistory(
    tradeDetails,
    gamerId,
    'other',
  );
  const otherConfirmDelivery = selectPartDelivery(otherDeliveryHistory);
  const otherConfirmReceive = selectPartReceive(otherDeliveryHistory);

  const [rating, setRating] = useState(0);

  const onRefresh = useCallback(() => {
    dispatch(setTradeDetailsRefreshing(true));

    dispatch(
      getTradeDetails({
        gamerId,
        tradeId: activeTradeId,
      }),
    );
  }, [refreshing]);

  const showRating = isCompleted && !myRating?.rating;

  function handleModalConfirm() {
    if (!myConfirmReceive) {
      setModalConfirmReceivedOpened(true)
    }
  }

  function handleModalDelivery() {
    if (!myConfirmDelivery) {
      setModalConfirmDeliveredOpened(true)
    }
  }

  return (
    <ActionsSafeAreaView>
      <ActionsScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <TitleContainer>
          <Title>
            Acompanhe e conte quando você recebeu e entregou seus itens
          </Title>
        </TitleContainer>

        <ItemsContainer>
          <TouchableOpacity
            activeOpacity={myConfirmReceive ? 1 : 0.4}
            onPress={handleModalConfirm}>
            <ItemWrapper completed={!!myConfirmReceive}>
              <Item>
                <ItemLeft>
                  <Image
                    source={require('../../../Assets/images/postrade/box.png')}
                    style={styles.image}
                  />
                </ItemLeft>

                <ItemRight>
                  <ItemRightText>
                    {!!myConfirmReceive
                      ? 'Recebido'
                      : 'Recebeu? Conta pra gente'}
                  </ItemRightText>

                  {myConfirmReceive && (
                    <ItemRightSmallText>
                      {formatDate(myConfirmReceive.date)}
                    </ItemRightSmallText>
                  )}
                </ItemRight>
              </Item>
            </ItemWrapper>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={myConfirmDelivery ? 1 : 0.4}
            onPress={handleModalDelivery}>
            <ItemWrapper completed={!!myConfirmDelivery}>
              <Item>
                <ItemLeft>
                  <Image
                    source={require('../../../Assets/images/postrade/gift.png')}
                    style={styles.image2}
                  />
                </ItemLeft>

                <ItemRight>
                  <ItemRightText>Já entreguei o produto!</ItemRightText>

                  {myConfirmDelivery && (
                    <ItemRightSmallText>
                      {formatDate(myConfirmDelivery.date)}
                    </ItemRightSmallText>
                  )}
                </ItemRight>
              </Item>
            </ItemWrapper>
          </TouchableOpacity>
        </ItemsContainer>

        <ProblemContainer>
          <MyButton
            clear
            onPress={handleHadAProblem}
            label="Tive um problema"
            labelStyle={styles.buttonLabelStyle}
            style={styles.buttonStyle}
            type="black"
          >
            <View marginT-3>
              <Icon color="#a3a3a3" name="chevron-right" size={24} />
            </View>
          </MyButton>
        </ProblemContainer>

        <ItemsContainer2>
          <GamerNameContainer>
            <GamerName>{splitFirstName(otherPart.gamerName)}</GamerName>

            <StarsContainer2>
              <StarRating
                buttonStyle={styles.starStyle2}
                disabled={true}
                emptyStarColor="#bcbcbc"
                fullStarColor={MyColors.primary}
                maxStars={5}
                rating={myRating ? myRating.rating : 0}
                starSize={20}
              />
            </StarsContainer2>
          </GamerNameContainer>

          <TouchableOpacity activeOpacity={1}>
            <ItemWrapper2>
              <Item>
                <ItemLeft>
                  {otherConfirmReceive ? (
                    <LottieView
                      source={require('../../../Assets/Animations/check-simple.json')}
                      autoPlay
                      loop={false}
                      style={styles.lottie}
                    />
                  ) : (
                    <LottieView
                      source={require('../../../Assets/Animations/circle.json')}
                      autoPlay
                      loop={false}
                      style={styles.lottie}
                    />
                  )}
                </ItemLeft>

                <ItemRight>
                  <ItemRightText>
                    {otherConfirmReceive
                      ? 'Confirmou o recebimento'
                      : 'Ainda não confirmou o recebimento'}
                  </ItemRightText>

                  {!!otherConfirmReceive && (
                    <ItemRightSmallText>
                      {formatDate(otherConfirmReceive.date)}
                    </ItemRightSmallText>
                  )}
                </ItemRight>
              </Item>
            </ItemWrapper2>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={1}>
            <ItemWrapper2>
              <Item>
                <ItemLeft>
                  {otherConfirmDelivery ? (
                    <LottieView
                      source={require('../../../Assets/Animations/check-simple.json')}
                      autoPlay
                      loop={false}
                      style={styles.lottie}
                    />
                  ) : (
                    <LottieView
                      source={require('../../../Assets/Animations/circle.json')}
                      autoPlay
                      loop={false}
                      style={styles.lottie}
                    />
                  )}
                </ItemLeft>

                <ItemRight>
                  <ItemRightText>
                    {otherConfirmDelivery
                      ? 'Confirmou a entrega'
                      : 'Ainda não confirmou a entrega'}
                  </ItemRightText>

                  {!!otherConfirmDelivery && (
                    <ItemRightSmallText>
                      {formatDate(otherConfirmDelivery.date)}
                    </ItemRightSmallText>
                  )}
                </ItemRight>
              </Item>
            </ItemWrapper2>
          </TouchableOpacity>
        </ItemsContainer2>

        {isCompleted && <EmptySpace />}

        <ModalConfirmReceived
          onConfirm={handleSetDeliveryStatus}
          opened={modalConfirmReceivedOpened}
          setOpened={setModalConfirmReceivedOpened}
        />

        <ModalConfirmDelivered
          onConfirm={handleSetDeliveryStatus}
          opened={modalConfirmDeliveredOpened}
          setOpened={setModalConfirmDeliveredOpened}
        />

        <ModalUhuu opened={!!pending && !isCompleted} pending={pending} />
      </ActionsScrollView>

      {showRating && (
        <CompletedContainer>
          <CompletedHeader>
            <CompletedHeaderText>Troca finalizada</CompletedHeaderText>
          </CompletedHeader>

          <CompletedContent>
            <CompletedText>Avalie a troca com</CompletedText>

            <CompletedGamerName>{otherPart.gamerName}</CompletedGamerName>

            <StarsContainer>
              <StarRating
                buttonStyle={styles.starStyle}
                disabled={false}
                emptyStarColor="#bcbcbc"
                fullStarColor={MyColors.primary}
                maxStars={5}
                rating={rating > 0 ? rating : myRating?.rating}
                selectedStar={stars => {
                  setRating(stars);
                  handleSetTradeRating(stars);
                }}
              />
            </StarsContainer>
          </CompletedContent>
        </CompletedContainer>
      )}

      <CustomActivityIndicator isVisible={loading} />
    </ActionsSafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonLabelStyle: {
    color: '#848484'
  },
  buttonStyle: {
    flexDirection:"row-reverse"
  },
  image: {height: 40, width: 43},
  image2: {height: 40, width: 45},
  container: {
    padding: 10,
  },
  lottie: {
    height: 40
  },
  starStyle: {
    marginHorizontal: 5,
  },
  starStyle2: {
    marginHorizontal: 2,
  },
});

export default PosTradeActions;
